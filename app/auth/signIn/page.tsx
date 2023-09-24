"use client";
import Button from "@elements/Button";
import TextBox from "@elements/TextBox";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const LoginPage = () => {
  const userName = useRef("");
  const pass = useRef("");

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: false,
      callbackUrl: "/",
    });
    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      router.push("/");
    }    
  };
  return (
    <div
      className={
        "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"
      }
    >
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <TextBox
          labelText="User Name"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <TextBox
          labelText="Password"
          type={"password"}
          onChange={(e) => (pass.current = e.target.value)}
        />
        <Button onClick={onSubmit}>Login</Button>
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
