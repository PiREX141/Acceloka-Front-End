"use client";

import Button from "@/src/components/Button";
import Navbar from "@/src/components/Navbar";
import Image from "next/image";
import { motion } from "motion/react";
import Footer from "@/src/components/Footer";
import HomePageTicketTile from "@/src/components/HomePageTicketTile";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-top-right flex flex-col overflow-y-auto"
      style={{
        backgroundImage: "url('Hero Pattern.svg')",
        backgroundSize: "45%",
      }}
    >
      <Navbar />

      <div className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-fit p-15 pr-0 grid grid-cols-12 items-start"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="col-start-1 col-span-6 flex flex-col"
          >
            <h1 className="text-5xl pb-2">Welcome to Acceloka</h1>
            <h1 className="text-6xl leading-16 pb-2">
              Your one stop destination for all kinds of tickets!
            </h1>
            <p className="text-2xl">
              Acceloka prides itself with multiple ticket booking services such
              as: transports, hotels, cinemas, and concerts. What are you
              waiting for? Try out our services!
            </p>

            <Button
              variant="general"
              hoverBehavior="glow"
              toPage="/tickets"
              className="w-fit mt-6"
            >
              View Tickets
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="col-start-7 col-span-6 justify-self-end"
          >
            <Image
              src="/Transport.png"
              alt="Transports Photo"
              width={1030}
              height={1000}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="pt-1.5 col-start-1 col-span-12 flex flex-col">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl self-center"
        >
          Booking Services
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-3 pb-40 px-15"
        >
          <div className="flex flex-row justify-evenly pt-7 px-6">
            <HomePageTicketTile ticketType="flight" toPage="/tickets" />
            <HomePageTicketTile ticketType="train" toPage="/tickets" />
            <HomePageTicketTile ticketType="ferry" toPage="/tickets" />
          </div>
          <div className="flex flex-row justify-evenly pt-5 px-6">
            <HomePageTicketTile ticketType="hotel" toPage="/tickets" />
            <HomePageTicketTile ticketType="cinema" toPage="/tickets" />
            <HomePageTicketTile ticketType="concert" toPage="/tickets" />
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
