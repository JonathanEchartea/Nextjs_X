"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Credenciales inválidas");
      return;
    }

    window.location.href = "/";
  }

  return (
    <div className="flex flex-col flex-1 w-full p-10">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h1 className="mb-2 font-semibold text-gray-800">Sign In</h1>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => signIn("google")}>
            Sign in with Google
          </button>

          <button type="button" onClick={() => signIn("github")}>
            Sign in with GitHub
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" required />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <p className="text-sm mt-4">
          Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}