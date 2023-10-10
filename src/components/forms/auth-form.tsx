"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (type === "login") {
          signIn("email", {
            redirect: false,
            email: e.currentTarget.email.value,
          }).then(async (res) => {
            if (res?.error) {
              console.log(res);
            } else {
              router.refresh();
              router.push("/overview");
            }
          });
        }
        // else {
        //   fetch("/api/auth/register", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       email: e.currentTarget.email.value,
        //       password: e.currentTarget.password.value,
        //     }),
        //   }).then(async (res) => {
        //     if (res.status === 200) {
        //       setTimeout(() => {
        //         router.push("/login");
        //       }, 2000);
        //     } else {
        //       const { error } = await res.json();
        //     }
        //   });
        // }
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs uppercase text-gray-600"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="panic@thedis.co"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      {/* <div>
        <label
          htmlFor="password"
          className="block text-xs uppercase text-gray-600"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div> */}
      <button
        className={`flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
      </button>
      {/* {type === "login" ? (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-gray-800">
            Sign up
          </Link>{" "}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>{" "}
          instead.
        </p>
      )} */}
    </form>
  );
}
