"use client"
import React, { useState, useEffect } from "react";
import { FaCheck, FaHome } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [sections, setSections] = useState([
    { title: "", description: "", layout: "BoxLayout" },
  ]);
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState("light");

  // Retrieve theme from local storage and apply it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("theme");
    }
    
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      metaTitle,
      metaDescription,
      difficulty,
      chapters: sections.map((section) => ({
        title: section.title,
        description: section.description,
        layout: section.layout,
      })),
    };

    setLoading(true);
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("accessToken");
      }
      
      const response = await axios.post("https://api.typedojo.com/lesson", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Lesson Added Successfully");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error in submission");
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (index, newTitle) => {
    const updatedSections = [...sections];
    updatedSections[index].title = newTitle;
    setSections(updatedSections);
  };

  const handleDescriptionChange = (index, newDescription) => {
    const updatedSections = [...sections];
    updatedSections[index].description = newDescription;
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      { title: "", description: "", layout: "BoxLayout" },
    ]);
  };

  return (
    <div className={`flex flex-col min-w-[70vw] h-full font-sans tracking-wide leading-relaxed ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header */}
      <div className={`flex justify-between p-5 border-b-2 ${theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-green-500 text-green-500"}`}>
        <div className="font-bold text-3xl">Edit Lesson</div>
        <div className="flex gap-2">
          <button
            className={`transition-all duration-300 ease-in-out border-2 w-[7rem] h-[3rem] flex items-center justify-center gap-2 rounded-md border-green-500 text-green-500 hover:bg-green-500 hover:text-white`}
            onClick={handleSubmit}
          >
            {loading ? <span className="animate-spin inline-block h-5 w-5 border-2 rounded-full border-t-transparent border-current"></span> : <FaCheck />}
            Save
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className={`flex justify-between p-3 border-b-2 text-sm ${theme === "dark" ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-600"}`}>
        <div className="font-medium flex items-center gap-2">
          <FaHome /> Home / Lessons / Edit Lesson
        </div>
      </div>

      {/* Main Content */}
      <div className="flex p-6 space-x-6 md:flex-col">
        {/* Form */}
        <div className="flex-1 space-y-8">
          {/* Lesson Overview */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Lesson Overview</h2>
            <div>
              <label className="block mb-2 text-lg font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-4 mb-6 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium">Lesson Introduction</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full p-4 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
                rows="3"
              />
            </div>
          </div>

          {/* Title and Description */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Title and Description</h2>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className={`w-full p-4 text-lg rounded-md mb-6 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
            />
            <input
              type="text"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className={`w-full p-4 text-lg rounded-md mb-6 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Sections */}
          {sections.map((section, index) => (
            <div key={index} className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
              <h2 className="text-xl font-semibold mb-4 text-green-500">Section {index + 1}</h2>
              <div className="mb-4">
                <label className="block mb-2 text-lg font-medium">Title</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  className={`w-full p-4 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-lg font-medium">Description</label>
                <textarea
                  value={section.description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className={`w-full p-4 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
                  rows="3"
                />
              </div>
            </div>
          ))}

          {/* Add Section */}
          <div className="flex justify-center">
            <button
              onClick={handleAddSection}
              className="transition-all duration-300 ease-in-out w-64 h-[3rem] bg-green-500 text-white rounded-md hover:bg-[#1a74b9] focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Add New Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
