"use client";
import { useState, useEffect } from "react";
import { FaCheck, FaHome } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

// CSS for Loader (Add this style globally or in your component)
const loaderStyles = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #4CAF50;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
`;

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        setTheme("light");
      }
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

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://typing.varankit.tech/api/v1/categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
      <style>{loaderStyles}</style> {/* Inline CSS for loader */}

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

      {/* Table or Loader */}
      <div className="p-6">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                {[
                  "Genre Name",
                  "Description",
                  "Total Practice Tests",
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
              {categories.map((category, index) => (
                <tr key={index}>
                  {/* Genre Name */}
                  <td className="px-8 py-4 text-lg font-medium text-gray-900 border-b border-gray-300 dark:border-gray-600 dark:text-gray-200">
                    {category.name}
                  </td>

                  {/* Description */}
                  <td className="px-8 py-4 text-lg text-gray-500 border-b border-gray-300 dark:border-gray-600 dark:text-gray-400">
                    {category.description}
                  </td>

                  {/* Total Practice Tests */}
                  <td className="px-8 py-4 text-lg text-gray-500 border-b border-gray-300 dark:border-gray-600 dark:text-gray-400">
                    {category.totalPracticeTests}
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
        )}
      </div>
    </div>
  );
};

export default Page;
