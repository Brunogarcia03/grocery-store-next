"use client";

import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function CartItemList({ cartItemList, onDeleteCartItem }) {
  return (
    <div>
      <div className="h-[500px] overflow-auto">
        {cartItemList.map((cart, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 mb-5"
          >
            <div className="flex items-center gap-6">
              <Image
                src={process.env.NEXT_PUBLIC_BASE_BACKEND_URL + cart.image}
                width={70}
                height={70}
                alt={cart.name}
                className="border p-2 w-[70px] h-[70px] object-contain"
              />
              <section>
                <h2 className="font-bold">{cart.name}</h2>
                <h2 className="">Quantity {cart.quantity}</h2>
                <h2 className="text-lg font-bold">$ {cart.amount}</h2>
              </section>
            </div>
            <TrashIcon
              className="cursor-pointer"
              onClick={() => onDeleteCartItem(cart.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItemList;
