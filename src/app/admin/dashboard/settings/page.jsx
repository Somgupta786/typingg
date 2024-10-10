"use client";
import { useState, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";
import { FaMoon,FaSun } from "react-icons/fa6";


const Page = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("theme");
  
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
      }
    }
  }, []);
  

  const [siteTitle, setSiteTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [defaultLanguage, setDefaultLanguage] = useState("English");
  const [defaultTimeZone, setDefaultTimeZone] = useState("UTC");
  const [useSeoFriendlyUrls, setUseSeoFriendlyUrls] = useState(true);
  const [discourageSearchEngines, setDiscourageSearchEngines] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(false);
  const [maintainenceMode, setMaintainenceMode] = useState(false);
  const [maintainenceMessage, setMaintainenceMessage] = useState("");
  const [euCookieNotification, setEuCookieNotification] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const [analyticsTrackingCode, setAnalyticsTrackingCode] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    return (
      siteTitle.trim() !== "" &&
      metaDescription.trim() !== "" &&
      logoImage.trim() !== "" &&
      defaultLanguage.trim() !== "" &&
      analyticsTrackingCode.trim() !== ""
    );
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();

      reader.onloadend = () => {
        setLogoImage(reader.result);
        toast.success("Image uploaded successfully!");
      };
      reader.onerror = () => {
        toast.error("Failed to upload image.");
      };

      reader.readAsDataURL(compressedFile);
    } catch (error) {
      toast.error("Failed to compress image.");
    }
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields before submitting.");
      return;
    }
  
    const data = {
      siteTitle,
      metaDescription,
      logoImage,
      defaultLanguage,
      defaultTimeZone,
      useSeoFriendlyUrls,
      discourageSearchEngines,
      videoThumbnail,
      maintainenceMode,
      maintainenceMessage,
      euCookieNotification,
      htmlCode,
      analyticsTrackingCode,
    };
  
    // Moved token initialization outside of the if block
    let token = "";
    if (typeof window !== 'undefined') {
      token = localStorage.getItem("accessToken");
    }
  
    try {
      setLoading(true);
      const response = await axios.put(
        "https://typing.varankit.tech/api/v1/admin/settings",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        toast.success("Settings saved successfully!");
        setTimeout(() => {
          window.location.href = "/admin/dashboard/settings";
        }, 1000);
      } else {
        toast.error("Failed to save settings.");
      }
    } catch (error) {
      toast.error("An error occurred while saving settings.");
    } finally {
      setLoading(false);
    }
  };
  

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    if (typeof window !== 'undefined') {
       
    localStorage.setItem("theme", newTheme);
    }
  
  };

  return (
    <div className={`flex flex-col min-w-[70vw] h-full font-sans tracking-wide leading-relaxed ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header */}
      <div className={`flex justify-between p-5 border-b-2 ${theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-green-500 text-green-500"}`}>
        <div className="font-bold text-3xl">Update Settings</div>
        <div className="flex gap-2">
            {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="transition-all duration-300 p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? (
            <FaMoon className="text-yellow-500 dark:text-gray-400 text-2xl" />
          ) : (
            <FaSun className="text-gray-600 dark:text-gray-400 text-2xl" />
          )}
        </button>
        <button
            className={`transition-all duration-300 ease-in-out border-2 w-[7rem] h-[3rem] flex items-center justify-center gap-2 rounded-md border-green-500 text-green-500 hover:bg-green-500 hover:text-white`}
            onClick={handleSaveChanges}
          >
            {loading ? <span className="animate-spin inline-block h-5 w-5 border-2 rounded-full border-t-transparent border-current"></span> : <FaCheck />}
            Save
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className={`flex justify-between p-3 border-b-2 text-sm ${theme === "dark" ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-600"}`}>
        <div className="font-medium flex items-center gap-2">
          <span className="material-icons"></span> Home / Settings / Update Settings
        </div>
      </div>

      {/* Main Content */}
      <div className="flex p-6 space-x-6 md:flex-col">
        {/* Form */}
        <div className="flex-1 space-y-8">
          {/* General Settings */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">General Settings</h2>
            <div>
              <label className="block mb-2 text-lg font-medium">Site Title</label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
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
            <div>
              <label className="block mb-2 text-lg font-medium">Logo Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className={`p-4 mb-6 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-50 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
              />
              {logoImage && (
                <img
                  src={logoImage}
                  alt="Logo Preview"
                  className="mt-4 max-w-xs rounded-lg shadow-md"
                />
              )}
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium">Default Language</label>
              <select
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value)}
                className={`w-full p-4 mb-6 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium">Default Time Zone</label>
              <select
                value={defaultTimeZone}
                onChange={(e) => setDefaultTimeZone(e.target.value)}
                className={`w-full p-4 mb-6 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
              >
                <option>UTC</option>
                <option>GMT</option>
                <option>EST</option>
              </select>
            </div>
          </div>

          {/* SEO Settings */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">SEO Settings</h2>
            <div className="flex items-center mb-6 border-b-2 border-gray-200 pb-4">
              <input
                type="checkbox"
                id="seoFriendlyUrls"
                checked={useSeoFriendlyUrls}
                onChange={(e) => setUseSeoFriendlyUrls(e.target.checked)}
                className="mr-4 text-green-600 transition-all duration-300 ease-in-out transform scale-110"
              />
              <label htmlFor="seoFriendlyUrls" className="text-lg font-medium text-gray-700 hover:text-green-600">SEO Friendly URLs</label>
            </div>

            <div className="flex items-center mb-6 border-b-2 border-gray-200 pb-4">
              <input
                type="checkbox"
                id="discourageSearchEngines"
                checked={discourageSearchEngines}
                onChange={(e) => setDiscourageSearchEngines(e.target.checked)}
                className="mr-4 text-red-600 transition-all duration-300 ease-in-out transform scale-110"
              />
              <label htmlFor="discourageSearchEngines" className="text-lg font-medium text-gray-700 hover:text-red-600">Discourage Search Engines</label>
            </div>

            {/* Video Thumbnail */}
            <div className="flex items-center mb-6 border-b-2 border-gray-200 pb-4">
              <input
                type="checkbox"
                id="videoThumbnail"
                checked={videoThumbnail}
                onChange={(e) => setVideoThumbnail(e.target.checked)}
                className="mr-4 text-yellow-600 transition-all duration-300 ease-in-out transform scale-110"
              />
              <label htmlFor="videoThumbnail" className="text-lg font-medium text-gray-700 hover:text-yellow-600">Enable Video Thumbnail</label>
            </div>
          </div>

          {/* Maintenance Mode */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Maintenance Mode</h2>
            <div className="flex items-center mb-6 border-b-2 border-gray-200 pb-4">
              <input
                type="checkbox"
                id="maintenanceMode"
                checked={maintainenceMode}
                onChange={(e) => setMaintainenceMode(e.target.checked)}
                className="mr-4 text-yellow-600 transition-all duration-300 ease-in-out transform scale-110"
              />
              <label htmlFor="maintenanceMode" className="text-lg font-medium text-gray-700 hover:text-yellow-600">Enable Maintenance Mode</label>
            </div>
            {maintainenceMode && (
              <div>
                <label className="block mb-2 text-lg font-medium">Maintenance Message</label>
                <textarea
                  value={maintainenceMessage}
                  onChange={(e) => setMaintainenceMessage(e.target.value)}
                  className={`w-full p-4 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
                  rows="3"
                />
              </div>
            )}
          </div>

          {/* EU Cookie Notification */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">EU Cookie Notification</h2>
            <div className="flex items-center mb-6 border-b-2 border-gray-200 pb-4">
              <input
                type="checkbox"
                id="euCookieNotification"
                checked={euCookieNotification}
                onChange={(e) => setEuCookieNotification(e.target.checked)}
                className="mr-4 text-blue-600 transition-all duration-300 ease-in-out transform scale-110"
              />
              <label htmlFor="euCookieNotification" className="text-lg font-medium text-gray-700 hover:text-blue-600">Enable Cookie Notification</label>
            </div>
          </div>

          {/* HTML Code */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-red-600">HTML Code</h2>
            <div>
              <label className="block mb-2 text-lg">HTML Code</label>
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className={`w-full p-4 mb-6 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
                rows="4"
              />
            </div>
          </div>

          {/* Analytics Tracking Code */}
          <div className={`p-6 shadow-md rounded-md ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} transition-all duration-300 ease-in-out hover:shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Analytics Tracking</h2>
            <div>
              <label className="block mb-2 text-lg">Analytics Tracking Code</label>
              <input
                type="text"
                value={analyticsTrackingCode}
                onChange={(e) => setAnalyticsTrackingCode(e.target.value)}
                className={`w-full p-4 mb-6 text-lg rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"} transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
