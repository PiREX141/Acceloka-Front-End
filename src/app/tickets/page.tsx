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
import CartModal from "@/src/components/CartModal";
import { getAvailableTickets, bookTicket } from "@/lib/api/apiServices";

type CartItem = {
  ticketCode: string;
  ticketName: string;
  price: number;
  quantity: number;
};

export default function Tickets() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [searchText, setSearchText] = useState("");
  const [appliedSearchText, setAppliedSearchText] = useState("");

  const [searchBy, setSearchBy] = useState<
    "CategoryName" | "TicketCode" | "TicketName" | "MaxPrice"
  >("TicketName");

  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSearch = () => {
    setAppliedSearchText(searchText.trim());
    setCurrentPage(1);
  };

  const fetchTickets = async (page: number) => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        PageNumber: page.toString(),
        PageSize: itemsPerPage.toString(),
        OrderBy: "TicketCode",
        OrderDirection: "ASC",
      });

      if (appliedSearchText) {
        params.append(searchBy, appliedSearchText);
      }

      if (dateRange?.from) {
        params.append("EventDateFrom", format(dateRange.from, "yyyy-MM-dd"));
      }

      if (dateRange?.to) {
        params.append("EventDateTo", format(dateRange.to, "yyyy-MM-dd"));
      }

      const data = await getAvailableTickets(params.toString());

      setTickets(data.tickets);
      setTotalTickets(data.totalTickets);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage, appliedSearchText, searchBy, dateRange]);

  const handleBookClick = (ticket: TicketData) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.ticketCode === ticket.ticketCode,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.ticketCode === ticket.ticketCode
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          ticketCode: ticket.ticketCode,
          ticketName: ticket.ticketName,
          price: ticket.price,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (cart.length === 0) return;

    try {
      setIsSubmitting(true);

      const payload = {
        tickets: cart.map((item) => ({
          ticketCode: item.ticketCode,
          quantity: item.quantity,
        })),
      };

      await bookTicket(payload);

      alert("Booking Successful!");
      setCart([]);
      setIsCartOpen(false);
    } catch (error) {
      alert("Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPages = Math.ceil(totalTickets / itemsPerPage);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="px-15 pt-10 pb-3 flex flex-col gap-3">
        <h1 className="text-3xl">Find your tickets!</h1>

        <div className="flex items-center gap-3 w-full">
          <div className="flex items-center w-full max-w-md rounded-md border bg-secondary px-3">
            <Image src="/Search Icon.svg" alt="Search" width={18} height={18} />

            <Input
              placeholder={`Search by ${searchBy}`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="border-0 bg-transparent focus-visible:ring-0"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Image
                    src="/Filter Icon.svg"
                    alt="Filter"
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
                onSelect={(range) => {
                  setDateRange(range);
                  setCurrentPage(1);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            className="ml-auto"
            onClick={() => setIsCartOpen(true)}
          >
            <Image
              src="/Shopping Cart Icon.svg"
              alt="Cart"
              width={40}
              height={40}
            />
          </Button>
        </div>
      </div>

      {loading && <p className="px-15">Loading...</p>}
      {!loading && tickets.length === 0 && (
        <p className="px-15">No tickets found.</p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
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
      </motion.div>

      <CartModal
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        totalPrice={totalPrice}
        onIncrease={(ticketCode) =>
          setCart((prev) =>
            prev.map((item) =>
              item.ticketCode === ticketCode
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          )
        }
        onDecrease={(ticketCode) =>
          setCart((prev) =>
            prev.map((item) =>
              item.ticketCode === ticketCode
                ? {
                    ...item,
                    quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                  }
                : item,
            ),
          )
        }
        onRemove={(ticketCode) =>
          setCart((prev) =>
            prev.filter((item) => item.ticketCode !== ticketCode),
          )
        }
        onConfirm={handleConfirmBooking}
        isSubmitting={isSubmitting}
      />

      <Footer />
    </div>
  );
}
