"use client";

import { Button } from "@/components/ui/button";
import {
  CircleUserRoundIcon,
  LayoutGrid,
  Search,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  deleteCartItems,
  getCartItems,
  getCategoryList,
} from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { updateCartContext } from "../_context/UpdateCartContext";
import CartItemList from "./CartItemList";
import { toast } from "sonner";

function Header() {
  const [categories, setCategories] = useState([]);
  const isLogin = sessionStorage.getItem("jwt") ? true : false;
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [totalCartItem, setTotalCartItem] = useState(0);
  const { updateCart, setUpdateCart } = useContext(updateCartContext);
  const [cartItemList, setCartItemsList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const data = await getCategoryList();
      setCategories(data);
    };

    getData();
  }, []);

  const getCartList = async () => {
    const data = await getCartItems(user?.id, jwt);
    setTotalCartItem(data?.length);
    setCartItemsList(data);
  };

  useEffect(() => {
    const getCartList = async () => {
      const data = await getCartItems(user?.id, jwt);
      setTotalCartItem(data?.length);
      setCartItemsList(data);
    };

    if (jwt) {
      getCartList();
    }
  }, [updateCart]);

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const onDeleteCartItem = (id) => {
    deleteCartItems(id, jwt).then(async (resp) => {
      toast("Item removed!");
      await getCartList();
    });
  };

  const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });

    setSubtotal(total.toFixed(2));
  }, [cartItemList]);

  return (
    <header className="p-5 shadow-md flex justify-between">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            width={150}
            height={100}
            priority={true}
            className="w-[150px] h-auto"
            alt="Logo"
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="md:flex hidden gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
              <LayoutGrid className="w-5 h-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((cat, index) => (
              <Link key={index} href={"/category/" + cat?.attributes?.name}>
                <DropdownMenuItem
                  key={index}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BASE_BACKEND_URL +
                      cat?.attributes?.icon?.data?.attributes?.url
                    }
                    unoptimized={true}
                    alt="icon"
                    width={27}
                    height={27}
                  />
                  <h2>{cat?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search />
          <input className="outline-none" type="text" placeholder="Search" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBasket className="h-7 w-7" />{" "}
              <span className="bg-primary text-white px-2 rounded-full">
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2">
                My cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteCartItem={onDeleteCartItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-6 flex flex-col">
                <h2 className="text-lg font-bold flex justify-between mb-2">
                  Subtotal <span>${subTotal}</span>
                </h2>
                <Button
                  onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRoundIcon className="w-10 h-10 bg-green-100 text-primary p-2 rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/my-order"}>
                <DropdownMenuItem>My order</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => onSignOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

export default Header;
