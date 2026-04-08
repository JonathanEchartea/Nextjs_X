import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";

type TopBarProps = {
  showBack?: boolean;
};

export default function TopBar({ showBack = false }: TopBarProps) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-bold text-lg">
          Team-X (Jonathan Montoya)
        </Link>

        {showBack && (
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Regresar al inicio
          </Link>
        )}
      </div>

      <SignOutButton />
    </header>
  );
}