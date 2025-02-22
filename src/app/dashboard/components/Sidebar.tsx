"use client";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import Link from "next/link";

const fetchMenuDetails = async () => {
  try {
    const jwt = getCookie("jwt");
    if (!jwt) {
      return [];
    }
    const response = await axios.get("/api/auth/getmenus", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    return response.data.userMenus;
  } catch (error: any) {
    console.error("Error fetching menus:", error);
    return [];
  }
};

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userMenus, setUserMenus] = useState<any[]>([]);

  useEffect(() => {
    const getMenus = async () => {
      const menus = await fetchMenuDetails();
      setUserMenus(menus);
    };

    getMenus();
  }, []);

  const renderSubmenus = (submenus: any[]) => {
    return submenus.map((submenu) => (
      <li key={submenu.MenuId} className="mb-4">
        {submenu.permissions.canRead && (
          <Link
            href={submenu.MenuUrl}
            className="text-gray-900 text-sm flex items-center hover:text-[#f84525]"
          >
            • {submenu.MenuName}
          </Link>
        )}
      </li>
    ));
  };

  const renderMenu = (menu: any) => {
    return (
      <li key={menu.MenuId} className="mb-1">
        {menu.permissions.canRead && (
          <>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === menu.MenuId.toString() ? null : menu.MenuId.toString())
              }
              className="flex font-semibold items-center py-2 px-4 w-full text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md"
            >
              {menu.icon ? <span>{menu.icon}</span> : null}
              <span className="text-sm ml-3">{menu.MenuName}</span>
              {menu.submenus.length > 0 && (
                <span className={`ml-auto transition-transform ${openDropdown === menu.MenuId.toString() ? "rotate-90" : ""}`}>
                  ▶
                </span>
              )}
            </button>
            {openDropdown === menu.MenuId.toString() && (
              <ul className="pl-7 mt-2">{renderSubmenus(menu.submenus)}</ul>
            )}
          </>
        )}
      </li>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 text-lg text-gray-900 font-semibold fixed top-2 left-2 z-50 bg-white rounded-md shadow-md md:hidden"
      >
        ☰
      </button>

      <div
        className={`fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform md:translate-x-0`}
      >
        <Link href="#" className="flex items-center pb-4 border-b border-gray-800">
          <h2 className="font-bold text-2xl">
            Sabharwal <span className="bg-[#f84525] text-white px-2 rounded-md">Finance</span>
          </h2>
        </Link>

        <ul className="mt-4">
          {userMenus.length > 0 ? (
            userMenus.map((menu) => renderMenu(menu))
          ) : (
            <li>No menus available</li>
          )}
        </ul>
      </div>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden"
        ></div>
      )}
    </>
  );
}
