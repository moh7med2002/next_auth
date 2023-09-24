"use client";

import Button from "@elements/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const HomePage = () => {
  return <div>
    <h1>Home Page</h1>
    <Link href={"/secure"}>secure page</Link>
  </div>;
};

export default HomePage;
