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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

export default function Tickets() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const [searchBy, setSearchBy] = useState<
    "CategoryName" | "TicketCode" | "TicketName" | "MaxPrice"
  >("CategoryName");

  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const fetchTickets = async (page: number) => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        PageNumber: page.toString(),
        PageSize: itemsPerPage.toString(),
        OrderBy: "TicketCode",
        OrderDirection: "ASC",
      });

      if (debouncedSearchText) {
        if (searchBy === "CategoryName") {
          params.append("CategoryName", debouncedSearchText);
        }

        if (searchBy === "TicketCode") {
          params.append("TicketCode", debouncedSearchText);
        }

        if (searchBy === "TicketName") {
          params.append("TicketName", debouncedSearchText);
        }

        if (searchBy === "MaxPrice") {
          params.append("MaxPrice", debouncedSearchText);
        }
      }

      if (dateRange?.from) {
        params.append("EventDateFrom", format(dateRange.from, "yyyy-MM-dd"));
      }

      if (dateRange?.to) {
        params.append("EventDateTo", format(dateRange.to, "yyyy-MM-dd"));
      }

      const response = await fetch(
        `https://localhost:7055/api/v1/get-available-ticket?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await response.json();

      setTickets(data.tickets);
      setTotalTickets(data.totalTickets);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage, debouncedSearchText, searchBy, dateRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchText, searchBy, dateRange]);

  const totalPages = Math.ceil(totalTickets / itemsPerPage);

  const handleBookClick = (ticket: TicketData) => {
    console.log("Booking ticket:", ticket);
  };

  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="px-15 pt-10 pb-3 flex flex-col items-start gap-3">
        <h1 className="text-3xl">Find your tickets!</h1>

        <div className="flex flex-row items-center gap-3 w-full">
          <div className="flex items-center w-full max-w-md rounded-md border bg-secondary px-3">
            <Image
              src="/Search Icon.svg"
              alt="Search Icon"
              width={18}
              height={18}
              className="opacity-60"
            />

            <Input
              placeholder={`Search by ${searchBy}`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Image
                    src="/Filter Icon.svg"
                    alt="Filter Icon"
                    width={18}
                    height={18}
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Search By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setSearchBy("CategoryName")}>
                    Category Name
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setSearchBy("TicketCode")}>
                    Ticket Code
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setSearchBy("TicketName")}>
                    Ticket Name
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setSearchBy("MaxPrice")}>
                    Max Price
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="w-fit p-0">
                <Image
                  src="/Calendar Icon.svg"
                  alt="Calendar Icon"
                  width={40}
                  height={40}
                />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button variant="ghost" className="w-fit justify-end ml-auto">
            <Image
              src="/Shopping Cart Icon.svg"
              alt="Shopping Cart Icon"
              width={40}
              height={40}
            />
          </Button>
        </div>
      </div>

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
