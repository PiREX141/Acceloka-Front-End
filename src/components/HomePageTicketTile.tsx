"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HTMLAttributes } from "react";
import { useRouter } from "next/navigation";

type ticketType = "flight" | "train" | "ferry" | "hotel" | "cinema" | "concert";

type HomePageTicketTileProps = {
  ticketType: ticketType;
  toPage?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & HTMLAttributes<HTMLButtonElement>;

const tileContent = {
  flight: {
    image: "/Plane Icon.svg",
    description: "Need a quick flight? Book a flight with us now!",
  },
  train: {
    image: "/Train Icon.svg",
    description:
      "Need a quick train trip somewhere? Book a train ride with us now!",
  },
  ferry: {
    image: "/Ship Icon.svg",
    description: "Need a quick ferry ride? Book a ferry ride with us now!",
  },
  hotel: {
    image: "/Hotel Icon.svg",
    description:
      "Need a place to stay during your travels? Book a hotel with us now!",
  },
  cinema: {
    image: "/Cinema Icon.svg",
    description:
      "Your favorite movie is playing at the cinema? Book a ticket with us now!",
  },
  concert: {
    image: "/Concert Icon.svg",
    description:
      "Your favorite singer is playing soon? Book a concert ticket with us now!",
  },
};

const HomePageTicketTile = ({
  ticketType,
  toPage,
  onClick,
}: HomePageTicketTileProps) => {
  const content = tileContent[ticketType];
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (toPage) {
      router.push(toPage);
    }
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.1 },
      }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-60 items-center py-7 px-5 rounded-2xl bg-secondary"
      onClick={handleClick}
    >
      <Image
        src={content.image}
        alt={`Content ${ticketType}`}
        width={70}
        height={70}
        className="pb-5"
      />
      <p className="w-fit text-xl">{content.description}</p>
    </motion.button>
  );
};

export default HomePageTicketTile;
