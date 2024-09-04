"use client";
import * as React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBars } from 'react-icons/fa'; // Example using react-icons

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {isSidebarOpen && (
        <Sidebar className="h-[100vh] text-black">
          <div className="flex items-center justify-around p-4">
          <FaBars onClick={toggleSidebar} className="cursor-pointer" />
            <h1 className="text-lg font-bold">TypingWebsite</h1>
            
          </div>
          <Menu className="h-[]">
            <SubMenu label="Settings">
              <MenuItem>General Setting </MenuItem>
              <MenuItem>Email</MenuItem>
            </SubMenu>
            <SubMenu label="Typing Lessons">
              <MenuItem>Add Lessons </MenuItem>
              <MenuItem>Manage Lessons</MenuItem>
              <MenuItem>Edit Lessons</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
      )}
      {!isSidebarOpen && (
        <div className="p-4">
          <FaBars onClick={toggleSidebar} className="cursor-pointer" />
        </div>
      )}
      <div className=" w-full" >
        {children}
      </div>
    </div>
  );
}
