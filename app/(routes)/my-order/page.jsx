"use client";

import { getMyOrder } from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "@/app/(routes)/my-order/_componente/MyOrderItem";
import { getCookie } from "cookies-next";

function MyOrder() {
  const jwt = getCookie("jwt") ? getCookie("jwt") : null;
  const user = getCookie("user") ? getCookie("user") : null;
  const [orderList, setOrderList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
      router.replace("/");
      return;
    }
  }, [jwt, router]);

  useEffect(() => {
    const fetchOrders = () => {
      const userJson = JSON.parse(user);
      try {
        const orders = getMyOrder(userJson.id, jwt);
        setOrderList(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [jwt, user]);

  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        My order
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl text-primary font-bold mb-2">Order history</h2>
        <div>
          {orderList.length > 0 ? (
            orderList.map((item, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger>
                  <div className="border shadow-md p-2 rounded-md bg-slate-100 flex justify-evenly gap-14">
                    <h2>
                      <span className="font-bold mr-2">Order date:</span>{" "}
                      {moment(item?.createdAt).format("DD/MMM/yyyy")}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Total amount:</span>{" "}
                      {item?.totalOrderAmount}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Status:</span>{" "}
                      {item?.status}
                    </h2>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {item.orderItemList.map((order, index_) => (
                    <MyOrderItem
                      orderItem={order}
                      index={index_}
                      key={index_}
                    />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <div>No orders found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
