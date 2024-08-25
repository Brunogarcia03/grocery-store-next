"use client";

import React, { useState, useEffect } from "react";
import {
  createOrder,
  deleteCartItems,
  getCartItems,
} from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight, Currency } from "lucide-react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Checkout() {
  const [totalCart, setTotalCart] = useState(0);
  const [cartItemsList, setCartItemsList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState();
  const jwt = getCookie("jwt") ? getCookie("jwt") : null;
  const user = getCookie("user") ? getCookie("user") : null;

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
      return;
    }
    const userJson = JSON.parse(user);
    const getDataCartItems = async (userJson, jwt) => {
      const cartItemList = await getCartItems(userJson.id, jwt);
      setTotalCart(cartItemList?.length);
      setCartItemsList(cartItemList);
    };

    getDataCartItems(userJson, jwt);
  }, []);

  useEffect(() => {
    let total = 0;
    cartItemsList.forEach((element) => {
      total = total + element.amount;
    });
    setTotalAmount((total + total * 0.9 + 15).toFixed(2));
    setSubTotal(total.toFixed(2));
  }, [cartItemsList]);

  const onApprove = (data) => {
    const payLoad = {
      data: {
        paymentId: data.paymentId.toString(),
        totalAmount: totalAmount,
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        OrderItemList: cartItemsList,
        userId: user.id,
      },
    };

    createOrder(payLoad, jwt).then((resp) => {
      toast("Order placed successfully!");
      cartItemsList.forEach(async (item, index) => {
        await deleteCartItems(item.id);
      });
      router.replace("/order-confirmation");
    });
  };

  return (
    <div className="">
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-3 py-8">
        <div className="lg:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 lg:mt-0 mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCart})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>${subTotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>$15.00</span>
            </h2>

            <h2 className="flex justify-between">
              Tax (9%): <span>${(subTotal * 0.9).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>${totalAmount}</span>
            </h2>
            {totalAmount > 15 && (
              <PayPalButtons
                disabled={!(username && email && phone && address && zip)}
                style={{ layout: "horizontal" }}
                onApprove={onApprove}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount,
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
