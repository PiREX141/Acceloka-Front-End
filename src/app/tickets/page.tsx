"use client";

import { useEffect, useState } from "react";
import Navbar from "@/src/components/Navbar";
import TicketPageTicketTile, {
  TicketData,
} from "@/src/components/TicketPageTicketTile";
import Footer from "@/src/components/Footer";
import { motion } from "motion/react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationContent,
} from "@/components/ui/pagination";

export default function Tickets() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchTickets = async (page: number) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://localhost:7055/api/v1/get-available-ticket?PageNumber=${page}&PageSize=${itemsPerPage}&OrderBy=TicketCode&OrderDirection=ASC`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await response.json();

      setTickets(data.tickets);
      setTotalTickets(data.totalTickets);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalTickets / itemsPerPage);

  const handleBookClick = (ticket: TicketData) => {
    console.log("Booking ticket:", ticket);
  };

  return (
    <div className="flex flex-col">
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
          <>
            <div className="grid grid-cols-4 gap-6 justify-items-center">
              {tickets.map((ticket) => (
                <TicketPageTicketTile
                  key={ticket.ticketCode}
                  ticket={ticket}
                  onClick={handleBookClick}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  />

                  <PaginationContent>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </PaginationContent>

                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                  />
                </Pagination>
              </div>
            )}
          </>
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
