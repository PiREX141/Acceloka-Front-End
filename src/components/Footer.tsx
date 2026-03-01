import React from "react";
import Button from "./Button";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="grid grid-cols-12 py-14 px-32 items-center bg-secondary">
      <div className="col-start-1 col-span-5 flex flex-col justify-start gap-3">
        <div className="flex flex-row">
          <Image src="/Accelist Logo.svg" alt="Logo" width={50} height={50} />

          <h1 className="text-4xl ml-2 self-center">Acceloka</h1>
        </div>
        <p className="text-lg">
          Acceloka prides itself with multiple ticket booking services such as:
          transports, hotels, cinemas, and concerts. What are you waiting for?
          Try out our services!
        </p>
      </div>

      <div className="col-start-10 col-span-3 flex flex-col self-start gap-3.5">
        <h1 className="text-lg font-bold">Company</h1>
        <div className="flex flex-row gap-2">
          <Image src="/Email.svg" alt="Email Logo" width={30} height={30} />
          <p>acceloka@email.com</p>
        </div>
        <div className="flex flex-row gap-2">
          <Image src="/Phone.svg" alt="Phone Logo" width={30} height={30} />
          <p>+62 123 456 789</p>
        </div>
      </div>
    </div>
  );
}
