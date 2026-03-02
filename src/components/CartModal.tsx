"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type CartItem = {
  ticketCode: string;
  ticketName: string;
  price: number;
  quantity: number;
};

type CartModalProps = {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onIncrease: (ticketCode: string) => void;
  onDecrease: (ticketCode: string) => void;
  onRemove: (ticketCode: string) => void;
  totalPrice: number;
  onConfirm: () => Promise<void>;
  isSubmitting: boolean;
};

const CartModal = ({
  cart,
  isOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  totalPrice,
  onConfirm,
  isSubmitting,
}: CartModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-125 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} disabled={isSubmitting}>
            ✕
          </button>
        </div>

        {cart.length === 0 && (
          <p className="text-center text-gray-500">Cart is empty</p>
        )}

        {cart.map((item) => (
          <div
            key={item.ticketCode}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-semibold">{item.ticketCode}</p>
              <p className="text-sm text-gray-500">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onDecrease(item.ticketCode)}
                  className="px-2 py-1 bg-gray-200 rounded"
                  disabled={isSubmitting}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => onIncrease(item.ticketCode)}
                  className="px-2 py-1 bg-gray-200 rounded"
                  disabled={isSubmitting}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onRemove(item.ticketCode)}
                className="px-2 py-1 bg-red-500 text-white rounded"
                disabled={isSubmitting}
              >
                <Image
                  src="/Delete Icon.svg"
                  alt="Delete"
                  width={18}
                  height={18}
                />
              </button>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <div className="mt-4 text-right font-bold text-lg flex flex-col items-end">
            Total: Rp {totalPrice.toLocaleString("id-ID")}
            <Button
              className="mt-3 text-lg w-full"
              onClick={onConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
