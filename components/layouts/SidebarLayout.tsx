"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import {signOut} from "next-auth/react";
import { getSession } from "next-auth/react";
import {
  HiMenu,
  HiChartPie,
  // HiInbox,
  HiShoppingBag,
  HiUser,
  HiX,
  HiUserCircle,
  HiOutlineLogout
} from "react-icons/hi";

// import LenifyLogo from "@/public/images/lenify-logo.webp";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allowMenagerRoutes, setAllowMenagerRoutes] = useState(false);
  const [allowAdminRoutes, setAllowAdminRoutes] = useState(false);
  

  useEffect(() => {
    const checkUserRole = async () => {
      const session = await getSession();
      console.log(session);
      if (session?.user?.role >= 2) {
        setAllowMenagerRoutes(true);
      }
      if (session?.user?.role === 3) {
        setAllowAdminRoutes(true);
      } 
    };

    checkUserRole();
  }, []);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <button
        className="md:hidden p-4 text-gray-500 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <HiX className="w-6 h-6" />
        ) : (
          <HiMenu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-30 transform h-screen md:w-64 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Logo href="#" img="/images/lenify-logo.webp" imgAlt="Lenify logo">
            Lenify
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {/* <Sidebar.Item href="/dashboard/inbox" icon={HiInbox}>
                Inbox
              </Sidebar.Item> */}
              <Sidebar.Item href="/dashboard/" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              {allowMenagerRoutes && (
              <Sidebar.Collapse icon={HiShoppingBag} label="Wharehouse">
                <Sidebar.Item href="/dashboard/new-product">New Product</Sidebar.Item>
                {/* <Sidebar.Item href="/dashboard/new-category">New Category</Sidebar.Item> */}
                <Sidebar.Item href="/dashboard/all-products">All Products</Sidebar.Item>
              </Sidebar.Collapse>
              )}
              {allowAdminRoutes && (
                <Sidebar.Item href="/dashboard/users" icon={HiUser}>
                  Users
                </Sidebar.Item>
              )}
              <Sidebar.Item href="/dashboard/profile" icon={HiUserCircle}>
                Profile
              </Sidebar.Item>
              <Sidebar.Item onClick={() => signOut({ callbackUrl: "/login" })} icon={HiOutlineLogout} className="cursor-pointer">
                Sign Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="sm:ml-64 p-4 md:p-8 z-10">{children}</div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
