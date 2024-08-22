import Image from "next/image";
import React from "react";

function MyOrderItem({ orderItem, index }) {
  return (
    <div key={index} className="w-[60%] shadow-md px-4">
      <div className="grid grid-cols-5 mt-3 items-center">
        <Image
          src={
            process.env.NEXT_PUBLIC_BASE_BACKEND_URL +
            orderItem.product.data.attributes.images.data[0].attributes.url
          }
          width={80}
          height={80}
          alt={"image"}
          className="bg-gray-100 p-5 rounded-md border"
        />
        <div className="col-span-2">
          <h2>{orderItem.product.data.attributes.name}</h2>
          <h2>Item price: {orderItem.product.data.attributes.sellingPrice}</h2>
        </div>
        <h2 className="col">Quantity: {orderItem.quantity}</h2>
        <h2>Price: {orderItem.amount}</h2>
      </div>
      <hr className="mt-3" />
    </div>
  );
}

export default MyOrderItem;
