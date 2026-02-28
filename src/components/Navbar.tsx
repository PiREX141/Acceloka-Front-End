import React from "react";
import Button from "./Button";
import Image from "next/image";

type NavbarProps = {
  className?: string;
};

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <nav className="grid grid-cols-12 pt-14 px-15 items-center bg-transparent">
      <div className="col-start-1 col-span-3 flex justify-start">
        <Button variant="image" toPage="/home">
          <Image src="/Accelist Logo.svg" alt="Logo" width={50} height={50} />
        </Button>

        <Button
          variant="title"
          fontSize="title"
          toPage="/home"
          className="ml-2"
        >
          Acceloka
        </Button>
      </div>

      <div className="col-start-5 col-span-4 flex justify-between">
        <Button
          variant="navbar"
          fontSize="md"
          toPage="/home"
          hoverBehavior="bolded"
          activeBold
          className="ml-32"
        >
          Home
        </Button>

        <Button
          variant="navbar"
          fontSize="md"
          toPage="/tickets"
          hoverBehavior="bolded"
          activeBold
        >
          Ticket
        </Button>

        <Button
          variant="navbar"
          fontSize="md"
          toPage="/bookings"
          hoverBehavior="bolded"
          activeBold
        >
          Bookings
        </Button>
      </div>

      <Button
        variant="image"
        className="col-start-12 col-span-1 flex justify-end"
      >
        <Image src="/Profile Icon.svg" alt="Logo" width={50} height={50} />
      </Button>
    </nav>
  );
};

export default Navbar;
