import React from "react";
import Button from "./Button";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-12 p-8 justify-items-center">
      <div className="col-start-1 col-span-2 flex flex-row justify-center ">
        <Button variant="image" toPage="/home">
          <Image
            src="/Accelist Logo.svg"
            alt="Logo"
            width={50}
            height={50}
            className=""
          />
        </Button>
        <Button
          variant="navbar"
          fontSize="title"
          toPage="/home"
          className="mt-2 ml-2"
        >
          Acceloka
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
