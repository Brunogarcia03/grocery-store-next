"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { registerUser } from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCookie, setCookie } from "cookies-next";

function CreateAccount() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loader, setLoader] = useState();

  const router = useRouter();

  useEffect(() => {
    const jwt = getCookie("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onCreateAccount = () => {
    setLoader(true);
    registerUser(username, email, password).then(
      (resp) => {
        setCookie("user", JSON.stringify(resp.data.user));
        setCookie("jwt", resp.data.jwt);
        toast("Account created succesfully");
        setLoader(false);
        router.push("/");
      },
      (e) => {
        toast(
          "Error while creating account " + e?.response?.data?.error?.message
        );
        setLoader(false);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200 rounded-lg">
        <Image src="/logo.png" width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Create account</h2>
        <h2 className="text-gray-500">
          Enter your Email and Password to create an account
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => onCreateAccount()}
            disabled={!(username && email && password)}
          >
            {loader ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </Button>
          <p>
            Already have an account{" "}
            <Link href={"/sign-in"} className="text-blue-500">
              Click here to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
