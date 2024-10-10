"use client";
import * as React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBars } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [theme, setTheme] = useState("light"); // Set default theme here
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const router = useRouter();

  const handleAddLessonClick = () => {
    router.push('/admin/dashboard/typingLesson/addLesson');
  };

  useEffect(() => {
    // Check if window is defined (only runs in the browser)
    if (typeof window !== 'undefined') {
      // Fetch the theme from local storage or default to light correction 
      const storedTheme = window.localStorage.getItem("theme") || "light";
      setTheme(storedTheme);

      // Apply the theme class to the body
      document.body.className = storedTheme;
      
      // Save the theme in localStorage
      window.localStorage.setItem("theme", storedTheme);
    }
  }, []); // Run only once on mount

  useEffect(() => {
    // Apply the theme class to the body whenever it changes
    document.body.className = theme;

    // Save the theme in localStorage
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <div className="flex bg-black">
      {isSidebarOpen && (
        <Sidebar backgroundColor={theme === "dark" ? "rgb(31, 41, 55)" : "rgb(229, 231, 235)"} className={`min-h-[100vh] ${theme === "dark" ? "text-gray-100" : "text-black"}`}>
          <div className="flex items-center justify-around p-4">
            <FaBars onClick={toggleSidebar} className="cursor-pointer" />
            <h1 className="text-lg font-bold">TypingWebsite</h1>
          </div>
          <Menu className="h-[]">
            <SubMenu label="Settings">
              <MenuItem onClick={() => router.push('/admin/dashboard/settings')}>General Setting </MenuItem>
              <MenuItem>Email</MenuItem>
            </SubMenu>
            <SubMenu label="Typing Lessons">
              <MenuItem onClick={handleAddLessonClick}>Add Lessons</MenuItem>
              <MenuItem>Manage Lessons</MenuItem>
              <MenuItem onClick={() => router.push('/admin/dashboard/typingLesson/addCategories')}>Lesson Categories</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
      )}
      {!isSidebarOpen && (
        <div className="min-h-[100vh] dark:bg-gray-800 bg-gray-100 p-4">
          <FaBars onClick={toggleSidebar} className="cursor-pointer text-black" />
        </div>
      )}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
