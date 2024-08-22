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

function MyOrder() {
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const storedJwt = sessionStorage.getItem("jwt");
    const storedUser = sessionStorage.getItem("user");

    if (storedJwt && storedUser) {
      setJwt(storedJwt);
      setUser(JSON.parse(storedUser));
    } else {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    if (jwt && user) {
      getOrderList();
    }
  }, [jwt, user]);

  const getOrderList = async () => {
    try {
      const orderList_ = await getMyOrder(user.id, jwt);
      setOrderList(orderList_);
    } catch (error) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        My order
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl text-primary font-bold mb-2">Order history</h2>
        <div>
          {orderList.map((item, index) => (
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
                  <MyOrderItem orderItem={order} index={index_} key={index_} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
