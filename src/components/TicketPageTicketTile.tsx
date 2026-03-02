"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Button from "./Button";

export type TicketData = {
  categoryName: string;
  ticketCode: string;
  ticketName: string;
  eventDate: string;
  price: number;
  quota: number;
};

type TicketPageTicketTileProps = {
  ticket: TicketData;
  onClick?: (ticket: TicketData) => void;
};

const iconMap: Record<TicketData["categoryName"], string> = {
  "Transportasi Udara": "/Plane Icon.svg",
  "Transportasi Darat": "/Train Icon.svg",
  "Transportasi Laut": "/Ship Icon.svg",
  Hotel: "/Hotel Icon.svg",
  Cinema: "/Cinema Icon.svg",
  Konser: "/Concert Icon.svg",
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year}, ${hours}:${minutes}`;
};

const TicketPageTicketTile = ({
  ticket,
  onClick,
}: TicketPageTicketTileProps) => {
  const handleBookClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick?.(ticket);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center py-7 px-8 rounded-2xl bg-secondary w-70 shadow-lg"
    >
      {/* Icon */}
      <Image
        src={iconMap[ticket.categoryName]}
        alt={`${ticket.categoryName} icon`}
        width={70}
        height={70}
        className="pb-4"
      />

      <h3 className="text-2xl font-bold text-primary pb-2">
        {ticket.ticketCode}
      </h3>

      <div className="h-16 flex items-center justify-center pb-2">
        <p className="text-2xl font-bold text-primary text-center">
          {ticket.ticketName}
        </p>
      </div>

      <p className="text-xl text-primary pb-2">{formatPrice(ticket.price)}</p>

      <p className="text-base text-center text-subPrimary pb-3">
        {formatDate(ticket.eventDate)}
      </p>

      <p className="text-lg font-semibold text-primary pb-6">
        Available: {ticket.quota}
      </p>

      <Button
        variant="general"
        hoverBehavior="glow"
        onClick={handleBookClick}
        className="p-2 mt-auto"
      >
        Book
      </Button>
    </motion.div>
  );
};

export default TicketPageTicketTile;
