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

type Props = {
  ticket: TicketData;
  onClick?: (ticket: TicketData) => void;
};

const iconMap: Record<string, string> = {
  "Transportasi Udara": "/Plane Icon.svg",
  "Transportasi Darat": "/Train Icon.svg",
  "Transportasi Laut": "/Ship Icon.svg",
  Hotel: "/Hotel Icon.svg",
  Cinema: "/Cinema Icon.svg",
  Konser: "/Concert Icon.svg",
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleString("id-ID");
};

export default function TicketPageTicketTile({ ticket, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col items-center py-7 px-8 rounded-2xl bg-secondary w-70 shadow-lg"
    >
      <Image
        src={iconMap[ticket.categoryName]}
        alt="icon"
        width={70}
        height={70}
        className="pb-4"
      />

      <h3 className="text-2xl font-bold text-primary pb-2 text-center">
        {ticket.ticketCode}
      </h3>

      <p className="text-lg font-semibold text-center pb-2">
        {ticket.ticketName}
      </p>

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
        className="p-2 mt-auto"
        onClick={() => onClick?.(ticket)}
      >
        Book
      </Button>
    </motion.div>
  );
}
