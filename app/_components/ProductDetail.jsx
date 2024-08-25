"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { addToCardApi } from "../_utils/GlobalApi";
import { toast } from "sonner";
import { updateCartContext } from "../_context/UpdateCartContext";
import { getCookie } from "cookies-next";

function ProductDetail({ product }) {
  const jwt = getCookie("jwt") ? getCookie("jwt") : null;
  const user = getCookie("user") ? getCookie("user") : null;
  const { updateCart, setUpdateCart } = useContext(updateCartContext);
  const [totalPrice, setTotalPrice] = useState(
    product?.attributes?.sellingPrice
  );
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addToCard = () => {
    setLoading(true);

    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }

    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * totalPrice).toFixed(2),
        products: product?.id,
        users_permissions_users: JSON.parse(getCookie("user")).id,
        userId: JSON.parse(getCookie("user")).id,
      },
    };

    addToCardApi(data, jwt).then(
      (resp) => {
        console.log(resp);
        toast("Added to cart");
        setUpdateCart(!updateCart);
        setLoading(false);
      },
      (e) => {
        toast("Error while adding into cart");
        setLoading(false);
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={
          process.env.NEXT_PUBLIC_BASE_BACKEND_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        width={300}
        height={300}
        alt="Product Image"
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product?.attributes?.name}</h2>
        <h2 className="text-sm font-bold text-gray-500">
          {product?.attributes?.description}
        </h2>
        <div className="flex gap-3 text-3xl">
          <h2 className="font-bold">{product.attributes.sellingPrice}</h2>
          {product.attributes.mrp && (
            <h2 className="font-bold text-gray-500 line-through">
              {product.attributes.mrp}
            </h2>
          )}
        </div>
        <h2 className="font-medium text-lg">
          Quantity ({product.attributes.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-10 items-center px-3">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="text-2xl font-bold">
              {" "}
              = {(quantity * totalPrice).toFixed(2)}
            </h2>
          </div>

          <Button
            className="flex gap-3 items-center"
            onClick={() => addToCard()}
            disabled={loading}
          >
            <ShoppingBasket />
            {loading ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Add to cart"
            )}
          </Button>
        </div>

        <h2>
          <span className="font-bold">Category: </span>{" "}
          {product?.attributes.categories.data[0].attributes.name}
        </h2>
      </div>
    </div>
  );
}

export default ProductDetail;
