"use client";

import { signOutAction } from "@/actions/signout";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </form>
  );
}