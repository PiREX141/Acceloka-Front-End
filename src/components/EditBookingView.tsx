"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Ticket,
  BookedTicketGroup,
  EditResponse,
  getBookedTickets,
  editBookedTickets,
} from "@/lib/api/apiServices";

const EditBookingView = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<BookedTicketGroup[]>([]);
  const [updatedData, setUpdatedData] = useState<EditResponse[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchData = async () => {
    if (!searchText.trim() || loading) return;

    setHasSearched(true);

    try {
      setLoading(true);

      const result = await getBookedTickets(searchText.trim());

      setData(result);
      setUpdatedData([]);

      const initialQuantities: Record<string, number> = {};

      result.forEach((group) => {
        group.tickets.forEach((ticket) => {
          initialQuantities[ticket.ticketCode] = ticket.quantity;
        });
      });

      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching booked tickets:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (ticketCode: string, value: number) => {
    if (value < 1) return;

    setQuantities((prev) => ({
      ...prev,
      [ticketCode]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!searchText.trim()) return;

    try {
      setUpdating(true);

      const payload = {
        tickets: Object.entries(quantities).map(([ticketCode, qty]) => ({
          ticketCode,
          newQuantity: qty,
        })),
      };

      const result = await editBookedTickets(searchText.trim(), payload);

      setUpdatedData(result);

      alert("Tickets successfully updated!");
    } catch (error) {
      console.error("Error updating tickets:", error);
      alert("Failed to update tickets.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Edit your Bookings!</h1>

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
                if (e.key === "Enter" && searchText.trim()) {
                  fetchData();
                }
              }}
              className="border-0 bg-transparent focus-visible:ring-0"
            />
          </div>

          <Button
            onClick={fetchData}
            disabled={loading || !searchText.trim()}
            className="bg-subPrimary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {!loading && hasSearched && data.length === 0 && <p>No tickets found.</p>}

      {updatedData.length === 0 && (
        <div className="flex flex-col gap-6">
          {data.map((group, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">{group.categoryName}</h2>

              <div className="mt-2 flex flex-col gap-3">
                {group.tickets.map((ticket, i) => (
                  <div
                    key={i}
                    className="border rounded-md p-3 bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{ticket.ticketCode}</p>
                      <p>{ticket.ticketName}</p>
                      {ticket.eventDate && (
                        <p className="text-sm text-gray-500">
                          {new Date(ticket.eventDate).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <Input
                      type="number"
                      min={1}
                      className="w-24"
                      value={quantities[ticket.ticketCode] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          ticket.ticketCode,
                          Number(e.target.value),
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {data.length > 0 && (
            <Button
              onClick={handleUpdate}
              disabled={updating}
              className="bg-subPrimary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Confirm Update"}
            </Button>
          )}
        </div>
      )}

      {updatedData.length > 0 && (
        <div className="flex flex-col gap-6 mt-6">
          <h2 className="text-xl font-bold text-green-700">Updated Result</h2>

          {updatedData.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-green-50 shadow-sm"
            >
              <p className="font-semibold">{item.categoryName}</p>
              <p className="mt-1 font-medium">{item.ticketCode}</p>
              <p>{item.ticketName}</p>
              <p className="text-green-700 font-semibold">
                Quantity: {item.quantity}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditBookingView;
