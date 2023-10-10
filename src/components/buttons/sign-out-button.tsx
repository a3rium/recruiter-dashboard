"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return <Button onClick={() => signOut()}>Log Out</Button>;
};

export default SignOutButton;
