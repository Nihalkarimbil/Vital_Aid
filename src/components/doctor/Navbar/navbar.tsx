
"use client";

import React from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import { AiOutlineLogout } from "react-icons/ai";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";

interface NavbarProps {
  toggleSidebar: () => void;
}



const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const logOut = async () => {
    try {
        await axiosInstance.delete('/auth/logout')
        router.push('/')
    } catch (error) {
        console.error("Logout failed", error)
        axiosErrorManager(error)
    }
  };
  return (
    <nav className=" border-b bg-white border-gray-200 dark:bg-gray-900 w-full shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          {/* Show sidebar toggle button ONLY on mobile screens */}
          {isSmallScreen && (
            <button
              onClick={toggleSidebar}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              <FaBars size={20} />
            </button>
          )}
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            Vital Aid
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/doctor/message")}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            <IoChatbubblesOutline size={20} />
          </button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
            <FaUser size={20} />
          </button>
          <button
            onClick={() => logOut()}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
            title="logout"
          >
            <AiOutlineLogout size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
