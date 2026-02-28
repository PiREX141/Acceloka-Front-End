"use client";

import Button from "@/src/components/Button";
import Navbar from "@/src/components/Navbar";
import Image from "next/image";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-top-right grid grid-rows-12 overflow-y-auto"
      style={{ backgroundImage: "url('Hero Pattern.svg')" }}
    >
      <Navbar className="row-start-1 row-span-1" />

      <div className="row-start-2 row-span-1"></div>
    </div>
  );
}
