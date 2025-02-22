"use client";
import Link from "next/link";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";

import useNotifications from "@/hooks/useNotifications";
export default function Navbar() {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
const {singout} = useAuth()
const {data,loading,loginStatus,logoutStatus,setAuthState} = useAuthContext()
const{notifyError,notifySuccess,notifyWarning} = useNotifications()

const handleLogout = () => {
  console.log("Logout button clicked");

  singout();

  setTimeout(() => {
    notifySuccess("Logout successfully");
    router.push("/");
  }, 500);
};

  return (
    <>
      {/* <!-- navbar start --> */}
      <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        {/* Sidebar Toggle Button */}
        <button type="button" className="text-lg text-gray-900 font-semibold">
          ☰
        </button>

        {/* Right Side Navigation */}
        <ul className="ml-auto flex items-center">
          {/* 🔍 Search Dropdown */}
          <li className="relative">
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
            >
              🔍
            </button>
            {isSearchOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md p-4 border">
                <input
                  type="text"
                  className="w-full py-2 px-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
              </div>
            )}
          </li>

          {/* 🔔 Notification Dropdown */}
          <li className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
            >
              🔔
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md border">
                <div className="p-4 border-b">
                  <h3 className="text-sm font-medium">Notifications</h3>
                </div>
                <ul className="max-h-40 overflow-y-auto">
                  <li className="p-3 text-sm hover:bg-gray-50">New Order from User</li>
                  <li className="p-3 text-sm hover:bg-gray-50">Message from Admin</li>
                </ul>
              </div>
            )}
          </li>

          {/* 👤 Profile Dropdown */}
          <li className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2"
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                alt="User"
              />
              <span className="hidden md:block text-sm font-semibold text-gray-800">
                {data?.fullName}
              </span>
            </button>
            {isProfileOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border">
                <li>
                  <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Profile
                  </Link>
                </li>
             
                <li>
                  <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-50 text-red-600" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      {/* <!-- navbar end --> */}
    </>
  );
}
