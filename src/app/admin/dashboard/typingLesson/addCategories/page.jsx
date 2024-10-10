"use client";
import { useState, useEffect } from "react";
import { FaCheck, FaHome, FaMoon, FaSun } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  const courses = [
    { name: "Typing Basic", slug: "typing-basic", lessons: 15 },
    { name: "Typing Beginner", slug: "typing-beginner", lessons: 8 },
    { name: "Typing Intermediate", slug: "typing-intermediate", lessons: 10 },
    { name: "Typing Advanced", slug: "typing-advanced", lessons: 9 },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
    }

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", "dark");
      }
    } else {
      document.body.classList.remove("dark");
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", "light");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-900 p-6 border-b-2 border-gray-300 dark:border-gray-600">
        <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-6">
          <span className="text-green-600 dark:text-green-400">
            Lesson Categories
          </span>
          <div
            onClick={() =>
              router.push("/admin/dashboard/typingLesson/addCategories/new")
            }
            className="transition-all duration-300 bg-green-500 text-white py-2 px-6 rounded-lg cursor-pointer hover:bg-green-600 flex items-center gap-2 text-lg font-medium"
          >
            <FaCheck /> Add New
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="flex justify-start items-center bg-white dark:bg-gray-800 p-6 text-sm border-b-2 border-gray-300 dark:border-gray-600">
        <FaHome className="text-gray-600 dark:text-gray-300 text-lg" />
        <span className="ml-2 font-bold text-gray-800 dark:text-gray-200 text-xl">
          Home
        </span>
        <span className="mx-1 text-gray-600 dark:text-gray-400 text-lg">/</span>
        <span className="font-bold text-gray-800 dark:text-gray-200 text-xl">
          Lessons
        </span>
        <span className="mx-1 text-gray-600 dark:text-gray-400 text-lg">/</span>
        <span className="text-gray-600 dark:text-gray-400 text-lg">
          Lesson Categories
        </span>
      </div>

      {/* Table */}
      <div className="p-6">
        <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {[
                "Genre Name",
                "URL Slug",
                "Total Lessons",
                "Position",
                "Action",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-8 py-4 text-left text-lg font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600 dark:text-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-600">
            {courses.map((course, index) => (
              <tr key={index}>
                {/* Genre Name */}
                <td className="px-8 py-4 text-lg font-medium text-gray-900 border-b border-gray-300 dark:border-gray-600 dark:text-gray-200">
                  {course.name}
                </td>

                {/* URL Slug */}
                <td className="px-8 py-4 text-lg text-gray-500 border-b border-gray-300 dark:border-gray-600 dark:text-gray-400">
                  {course.slug}
                </td>

                {/* Total Lessons */}
                <td className="px-8 py-4 text-lg text-gray-500 border-b border-gray-300 dark:border-gray-600 dark:text-gray-400">
                  {course.lessons}
                </td>

                {/* Position */}
                <td className="px-8 py-4 text-lg text-gray-500 border-b border-gray-300 dark:border-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <button className="px-3 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300">
                      ▲
                    </button>
                    <button className="px-3 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300">
                      ▼
                    </button>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-8 py-4 text-lg font-medium border-b border-gray-300 dark:border-gray-600">
                  <div className="flex space-x-6">
                    {/* Edit Button */}
                    <button className="transition-all duration-300 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none text-xl">
                      <RiImageEditFill className="w-6 h-6" />
                    </button>

                    {/* Delete Button */}
                    <button className="transition-all duration-300 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 focus:outline-none text-xl">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
