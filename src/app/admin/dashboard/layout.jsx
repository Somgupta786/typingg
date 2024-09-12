"use client";
import * as React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBars } from 'react-icons/fa'; // Example using react-icons
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const router = useRouter();

  const handleAddLessonClick = () => {
    router.push('/admin/dashboard/typingLesson/addLesson');
  };


  return (
    <div className="flex">
      {isSidebarOpen && (
        <Sidebar className=" min-h-[100vh] text-black">
          <div className="flex items-center justify-around p-4">
          <FaBars onClick={toggleSidebar} className="cursor-pointer" />
            <h1 className="text-lg font-bold">TypingWebsite</h1>
            
          </div>
          <Menu className="h-[]">
            <SubMenu label="Settings">
              <MenuItem onClick={()=>router.push('/admin/dashboard/settings')}>General Setting </MenuItem>
              <MenuItem>Email</MenuItem>
            </SubMenu>
            <SubMenu label="Typing Lessons">
             <MenuItem onClick={handleAddLessonClick}>
      Add Lessons
    </MenuItem>
              <MenuItem>Manage Lessons</MenuItem>
              <MenuItem onClick={()=>router.push('/admin/dashboard/typingLesson/addCategories')}>Lesson Categories</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
      )}
      {!isSidebarOpen && (
        <div className="p-4 bg-[#F9F9F9B3]">
          <FaBars onClick={toggleSidebar} className="cursor-pointer" />
        </div>
      )}
      <div className=" w-full " >
        {children}
      </div>
    </div>
  );
}
