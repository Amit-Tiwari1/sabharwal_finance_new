"use client";
import Link from "next/link";
import { useDisclosure } from "@heroui/react";
import AuthModal from "./AuthModel";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, loginStatus } = useAuthContext();
  
  return (
    <>
      <nav className="bg-teal-600 p-1.5 flex justify-between">
        <Link href="/" className="font-bold text-white text-2xl">
          Sabharwal Finance
        </Link>
        <div>
          <div className="flex">
            <button
              className="bg-white text-teal-700 font-extrabold border p-1.5 px-4 rounded mr-3"
              onClick={() => (data ? router.push("/dashboard") : onOpen())} // ✅ Fixed Syntax
            >
              {data ? "Go To Dashboard" : "Login"}
            </button>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
