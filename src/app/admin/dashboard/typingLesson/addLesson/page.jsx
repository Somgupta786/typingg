"use client";
import React, { useState, useEffect } from "react";
import { FaCheck, FaHome, FaTrash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleAndDescription, setTitleAndDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sections, setSections] = useState([{ title: "", embedCode: "" }]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [categories, setCategories] = useState([]);

  // Retrieve categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://typing.varankit.tech/api/v1/categories");
        if (response.data.success) {
          setCategories(response.data.data.categories);
          setCategoryName(response.data.data.categories[0].name); // Default to the first category
          setCategoryId(response.data.data.categories[0].id); // Set the default category ID
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // Retrieve theme from local storage and apply it
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
      }
    }
  }, []);

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      titleAndDescription: `${title} - ${description}`,
      metaTitle,
      categoryId, // Use the selected category ID
      metaDescription,
      categoryName,
      chapters: sections.map((section) => ({
        title: section.title,
        embedCode: section.embedCode,
        layout: "BoxLayout", // You can change this as needed
      })),
    };

    setLoading(true);
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post("https://typing.varankit.tech/api/v1/admin/practice-test", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Lesson Added Successfully");
        setTimeout(() => {
          window.location.href = "/admin/dashboard/typingLesson/addLesson";
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error in submission");
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { title: "", embedCode: "" }]);
  };

  const handleDeleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(category => category.name === e.target.value);
    setCategoryName(selectedCategory.name);
    setCategoryId(selectedCategory.id);
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
          {/* Title and Description Block */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Lesson Overview</h2>
            <div>
              <label className="block mb-2 text-lg font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-4 mb-2 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
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
            <div>
              <label className="block mb-2 text-lg font-medium">Title and Description</label>
              <input
                type="text"
                value={titleAndDescription}
                onChange={(e) => setTitleAndDescription(e.target.value)}
                className={`w-full p-4 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          {/* Metadata Block */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Meta Data</h2>
            <div>
              <label className="block mb-2 text-lg font-medium">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className={`w-full p-4 mb-6 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium">Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className={`w-full p-4 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
                rows="3"
              />
            </div>
          </div>

          {/* Category Selection */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Select Category</h2>
            <select
              value={categoryName}
              onChange={handleCategoryChange}
              className={`w-full p-4 mb-2 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sections Block */}
          {/* Sections */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Sections</h2>
            {sections.map((section, index) => (
              <div key={index} className={`border p-4 mb-4 rounded-md ${theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-800"}`}>
                <div className="flex justify-between">
                  <div className="flex-1">
                    <label className="block mb-2 text-lg font-medium">Section Title</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                      className={`w-full p-2 text-lg rounded-md ${theme === "dark" ? "bg-gray-600 border-gray-500 text-gray-200" : "bg-white border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <button onClick={() => handleDeleteSection(index)} className="ml-2 p-2 text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
                <div>
                  <label className="block mb-2 text-lg font-medium">Embed Code</label>
                  <textarea
                    value={section.embedCode}
                    onChange={(e) => handleSectionChange(index, "embedCode", e.target.value)}
                    className={`w-full p-2 text-lg rounded-md ${theme === "dark" ? "bg-gray-600 border-gray-500 text-gray-200" : "bg-white border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
                    rows="4"
                  />
                </div>
              </div>
            ))}
            <button
              className={`mt-4 p-2 text-lg font-semibold rounded-md bg-green-500 text-white hover:bg-green-600 transition-all duration-300`}
              onClick={handleAddSection}
            >
              Add Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
