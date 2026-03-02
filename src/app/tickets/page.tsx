"use client";

import { useEffect, useState } from "react";
import Navbar from "@/src/components/Navbar";
import TicketPageTicketTile, {
  TicketData,
} from "@/src/components/TicketPageTicketTile";
import Footer from "@/src/components/Footer";
import { motion } from "motion/react";

export default function Tickets() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://localhost:7055/api/v1/get-available-ticket",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        const ticketsData = Array.isArray(data) ? data : data.tickets || [];
        setTickets(ticketsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    console.log("Fetched tickets:", tickets);
  }, [tickets]);

  const handleBookClick = (ticket: TicketData) => {
    console.log("Booking ticket:", ticket);
    // Handle booking logic here
  };

  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-8"
      >
        {loading && (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl text-subPrimary">Loading tickets...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl text-red-500">Error: {error}</p>
          </div>
        )}

        {!loading && !error && tickets.length > 0 && (
          <div className="grid grid-cols-4 gap-6 justify-items-center">
            {tickets.map((ticket) => (
              <TicketPageTicketTile
                key={ticket.ticketCode}
                ticket={ticket}
                onClick={handleBookClick}
              />
            ))}
          </div>
        )}

        {!loading && !error && tickets.length === 0 && (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl text-subPrimary">No tickets available</p>
          </div>
        )}
      </motion.div>

      <Footer />
    </div>
  );
}
