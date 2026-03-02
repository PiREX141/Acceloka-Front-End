"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type UpdatedTicket = {
  ticketCode: string;
  ticketName: string;
  categoryName: string;
  quantity: number;
};

const RevokeTicketView = () => {
  const [bookedTicketId, setBookedTicketId] = useState<number | "">("");
  const [ticketCode, setTicketCode] = useState("");
  const [qty, setQty] = useState<number | "">("");

  const [updatedTicket, setUpdatedTicket] = useState<UpdatedTicket | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isFormValid =
    bookedTicketId !== "" && ticketCode.trim() !== "" && qty !== "";

  const handleDelete = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://localhost:7055/api/v1/revoke-ticket/${bookedTicketId}/${encodeURIComponent(
          ticketCode,
        )}/${qty}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to revoke ticket");
      }

      const data: UpdatedTicket = await res.json();

      setUpdatedTicket(data);
      setShowConfirm(false);

      setBookedTicketId("");
      setTicketCode("");
      setQty("");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row gap-6 max-w-2xl">
      <div className="flex flex-col gap-2 w-md">
        <h1 className="text-2xl font-semibold">Revoke your Ticket</h1>

        <div className="flex flex-col gap-3">
          <div className="flex items-center rounded-md border bg-secondary px-3">
            <Image src="/Search Icon.svg" alt="Search" width={18} height={18} />
            <Input
              type="number"
              placeholder="BookedTicketId"
              value={bookedTicketId}
              onChange={(e) =>
                setBookedTicketId(
                  e.target.value === "" ? "" : parseInt(e.target.value),
                )
              }
              className="border-0 bg-transparent focus-visible:ring-0"
            />
          </div>

          <div className="flex items-center rounded-md border bg-secondary px-3">
            <Image src="/Search Icon.svg" alt="Search" width={18} height={18} />
            <Input
              placeholder="TicketCode"
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0"
            />
          </div>

          <div className="flex items-center rounded-md border bg-secondary px-3">
            <Image src="/Search Icon.svg" alt="Search" width={18} height={18} />
            <Input
              type="number"
              placeholder="Qty"
              value={qty}
              onChange={(e) =>
                setQty(e.target.value === "" ? "" : parseInt(e.target.value))
              }
              className="border-0 bg-transparent focus-visible:ring-0"
            />
          </div>

          <Button
            onClick={() => setShowConfirm(true)}
            disabled={!isFormValid || loading}
            className="bg-subPrimary"
          >
            {loading ? "Processing..." : "Revoke Ticket"}
          </Button>
        </div>
      </div>

      {updatedTicket && (
        <div className="mt-10 p-4 bg-green-100 text-green-800 rounded-md space-y-1 w-md h-fit">
          <p className="font-semibold text-lg">Ticket Revoked Successfully</p>
          <p>
            <strong>Ticket Code:</strong> {updatedTicket.ticketCode}
          </p>
          <p>
            <strong>Ticket Name:</strong> {updatedTicket.ticketName}
          </p>
          <p>
            <strong>Category:</strong> {updatedTicket.categoryName}
          </p>
          <p>
            <strong>Updated Quantity:</strong>{" "}
            <span className="font-bold">{updatedTicket.quantity}</span>
          </p>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">
              Confirm Ticket Revocation
            </h2>

            <div className="text-sm space-y-2">
              <p>
                <strong>BookedTicketId:</strong> {bookedTicketId}
              </p>
              <p>
                <strong>TicketCode:</strong> {ticketCode}
              </p>
              <p>
                <strong>Qty:</strong> {qty}
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevokeTicketView;
