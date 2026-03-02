"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type Ticket = {
  ticketCode: string;
  ticketName: string;
  eventDate: string;
};

type BookedTicketGroup = {
  qtyPerCategory: number;
  categoryName: string;
  tickets: Ticket[];
};

const GetBookedTicketView = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [data, setData] = useState<BookedTicketGroup[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText]);

  // Fetch API when debounced value changes
  useEffect(() => {
    if (!debouncedSearchText) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://localhost:7055/api/v1/get-booked-ticket/${debouncedSearchText}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching booked tickets:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearchText]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Check your Tickets!</h1>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md rounded-md border bg-secondary px-3">
        <Image src="/Search Icon.svg" alt="Search" width={18} height={18} />
        <Input
          placeholder="Search for BookedTicketId"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border-0 bg-transparent focus-visible:ring-0"
        />
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* No Data */}
      {!loading && debouncedSearchText && data.length === 0 && (
        <p>No tickets found.</p>
      )}

      {/* Display Data */}
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
