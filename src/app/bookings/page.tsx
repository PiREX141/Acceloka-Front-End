"use client";

import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import Button from "@/src/components/Button";
import { useState } from "react";
import GetBookedTicketView from "@/src/components/GetBookedTicketView";
import RevokeTicketView from "@/src/components/RevokeTicketView";
import EditBookingView from "@/src/components/EditBookingView";

export default function Bookings() {
  const [activeView, setActiveView] = useState<
    "check" | "edit" | "revoke" | null
  >(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="px-15 pt-10 pb-10 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">What would you like to do?</h1>

        <p className="pt-2.5 text-lg">
          Please select an action to manage your bookings.
        </p>

        <div className="flex flex-row gap-5">
          <Button
            fontSize="sm"
            hoverBehavior="glow"
            onClick={() => setActiveView("check")}
            className="w-fit"
          >
            Check Booking
          </Button>
          <Button
            fontSize="sm"
            hoverBehavior="glow"
            onClick={() => setActiveView("revoke")}
            className="w-fit"
          >
            Revoke Booking
          </Button>
          <Button
            fontSize="sm"
            hoverBehavior="glow"
            onClick={() => setActiveView("edit")}
            className="w-fit"
          >
            Edit Booking
          </Button>
        </div>
      </div>

      <div className="px-15 pb-32">
        {activeView === null && <GetBookedTicketView />}
        {activeView === "check" && <GetBookedTicketView />}
        {activeView === "revoke" && <RevokeTicketView />}
        {activeView === "edit" && <EditBookingView />}
      </div>
      <Footer />
    </div>
  );
}
