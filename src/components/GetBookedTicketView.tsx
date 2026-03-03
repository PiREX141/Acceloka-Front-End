"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BookedTicketGroup, getBookedTickets } from "@/lib/api/apiServices";

// type Ticket = {
//   ticketCode: string;
//   ticketName: string;
//   eventDate: string;
// };

// type BookedTicketGroup = {
//   qtyPerCategory: number;
//   categoryName: string;
//   tickets: Ticket[];
// };

const GetBookedTicketView = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<BookedTicketGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchData = async () => {
    if (!searchText.trim() || loading) return;

    setHasSearched(true);

    try {
      setLoading(true);

      const result = await getBookedTickets(searchText.trim());
      setData(result);
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl">Check your tickets!</h1>

        <div className="flex items-center w-full max-w-md gap-2">
          <div className="flex items-center w-full rounded-md border bg-secondary px-3">
            <Image src="/Search Icon.svg" alt="Search" width={18} height={18} />

            <Input
              placeholder="Search for BookedTicketId"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setHasSearched(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchData();
                }
              }}
              className="border-0 bg-transparent focus-visible:ring-0"
            />
          </div>

          <Button
            onClick={fetchData}
            disabled={loading || !searchText.trim()}
            className="bg-subPrimary"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {!loading && hasSearched && data.length === 0 && <p>No tickets found.</p>}

      <div className="flex flex-col gap-6">
        {data.map((group, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
            <h2 className="text-lg font-semibold">
              {group.categoryName} ({group.qtyPerCategory})
            </h2>

            <div className="mt-2 flex flex-col gap-3">
              {group.tickets.map((ticket, i) => (
                <div key={i} className="border rounded-md p-3 bg-gray-50">
                  <p className="font-medium">{ticket.ticketCode}</p>
                  <p>{ticket.ticketName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(ticket.eventDate).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetBookedTicketView;
