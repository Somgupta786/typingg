"use client";
import { useState, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
const Page = () => {
  const [siteTitle, setSiteTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [defaultLanguage, setDefaultLanguage] = useState("English");
  const [defaultTimeZone, setDefaultTimeZone] = useState("UTC");
  const [useSeoFriendlyUrls, setUseSeoFriendlyUrls] = useState(true);
  const [discourageSearchEngines, setDiscourageSearchEngines] = useState(false);
  const [videoThumbnail, setvideoThumbnail] = useState(false);
  const [maintainenceMode, setMaintainenceMode] = useState(false);
  const [maintainenceMessage, setMaintainenceMessage] = useState("");
  const [euCookieNotification, setEuCookieNotification] = useState(false);
  const [htmlCode, setHtmlcode] = useState("");
  const [analyticsTrackingCode, setAnayliticsTrackingCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });
  }, [siteTitle, metaDescription, htmlCode, maintainenceMessage]);

  const handleSaveChanges = async () => {
    const data = {
      siteTitle,
      metaDescription,
      logoImage,
      defaultLanguage,
      defaultTimeZone,
      useSEOFriendlyUrls: useSeoFriendlyUrls,
      discourageSearchEngines,

      maintainenceMode,
      maintainenceMessage,
      euCookieNotification,
      analyticsTrackingCode,
    };

    // console.log(data)
    const token = localStorage.getItem("accessToken");
    //  console.log("Access Token:", token);

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
      console.log(response);
      if (response.status === 200) {
        toast.success("Settings saved successfully!");
        setTimeout(() => {
          window.location.href = "/admin/dashboard/settings";
        }, 1000);
      } else {
        toast.error("Failed to save settings.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while saving settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-gray-500 w-full h-full bg-white font-normal">
      {/* Header */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between bg-green-50 p-3 text-black border-y-[1px] border-gray-400">
        <div className="font-medium">Update Settings</div>
        <div
          className="border-2 border-green-400 mr-11 text-green-400 px-1 w-[10rem] h-[2rem] flex justify-center items-center cursor-pointer"
          onClick={handleSaveChanges}
        >
          {loading ? (
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.1em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <p>Save Changes</p>
            </div>
          )}
        </div>
      </div>

      {/* General Settings */}
      <div className="text-black p-3 font-medium">General Settings</div>
      <div className="p-3 flex items-center border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Site title</div>
        <textarea
          className="rounded-sm border-gray-400 w-full ml-[220px] border-[1px] text-[14px] p-1 text-black overflow-hidden resize-none"
          value={siteTitle}
          onChange={(e) => setSiteTitle(e.target.value)}
          rows={1}
        ></textarea>
      </div>

      <div className="p-3 flex items-center border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Meta Description</div>
        <textarea
          className="rounded-sm border-gray-400 w-full border-[1px] ml-[150px] text-[14px] p-1 text-black overflow-hidden resize-none"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={1}
        ></textarea>
      </div>

      <div className="p-3 flex items-center border-y-[1px] border-gray-400">
        <div className="whitespace-nowrap">Logo Image</div>
        <div className="p-1 ml-[195px] rounded-sm bg-green-500 text-white flex items-center justify-between">
          <MdOutlineFileUpload className="text-black" /> Upload
        </div>
      </div>

      <div className="p-3 flex items-center border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Default language</div>
        <select
          className="bg-white ml-[150px] text-black border-[1px] border-gray-300"
          value={defaultLanguage}
          onChange={(e) => setDefaultLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          {/* Add other languages here */}
        </select>
      </div>

      <div className="p-3 flex items-center border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Default time zone</div>
        <select
          className="bg-white ml-[150px] text-black border-[1px] border-gray-300"
          value={defaultTimeZone}
          onChange={(e) => setDefaultTimeZone(e.target.value)}
        >
          <option value="UTC">UTC</option>
          <option value="IST">IST</option>
          {/* Add other time zones here */}
        </select>
      </div>

      {/* Other Settings */}
      <div className="p-3 flex items-center border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Use SEO friendly URL</div>
        <div className="flex gap-4 ml-[120px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="useSeoFriendlyUrls"
              value="yes"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls}
              onChange={() => setUseSeoFriendlyUrls(true)}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="useSeoFriendlyUrls"
              value="no"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={!useSeoFriendlyUrls}
              onChange={() => setUseSeoFriendlyUrls(false)}
            />
            No
          </label>
        </div>
      </div>

      <div className="p-3 flex items-center border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Discourage search engines</div>
        <div className="flex gap-4 ml-[81px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="discourageSearchEngines"
              value="yes"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={discourageSearchEngines}
              onChange={() => setDiscourageSearchEngines(true)}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="discourageSearchEngines"
              value="no"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={!discourageSearchEngines}
              onChange={() => setDiscourageSearchEngines(false)}
            />
            No
          </label>
        </div>
      </div>

      <div className="p-3 flex items-center border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">show video thumbnail from</div>
        <div className="flex gap-4 ml-[100px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="maintainenceMode"
              value="enabled"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={videoThumbnail}
              onChange={() => setvideoThumbnail(true)}
            />
            Enabled
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="maintainenceMode"
              value="disabled"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={!videoThumbnail}
              onChange={() => setvideoThumbnail(false)}
            />
            Disabled
          </label>
        </div>
      </div>

      <div className="p-3 flex items-center border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Use Maintenance mode</div>
        <div className="flex gap-4 ml-[100px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="maintainenceMode"
              value="enabled"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={maintainenceMode}
              onChange={() => setMaintainenceMode(true)}
            />
            Enabled
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="maintainenceMode"
              value="disabled"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={!maintainenceMode}
              onChange={() => setMaintainenceMode(false)}
            />
            Disabled
          </label>
        </div>
      </div>

      <div className="p-3 flex items-center border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">EU Cookie notification</div>
        <div className="flex gap-4 ml-[55px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="euCookieNotification"
              value="yes"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={euCookieNotification}
              onChange={() => setEuCookieNotification(true)}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="euCookieNotification"
              value="no"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={!euCookieNotification}
              onChange={() => setEuCookieNotification(false)}
            />
            No
          </label>
        </div>
      </div>

      {/* Analytics Tracking */}
      <div className="p-3 flex items-center border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap text-black">
          Analytics tracking code
        </div>
        <textarea
          className="rounded-sm border-gray-400 w-full ml-[65px] border-[1px] text-[14px] p-1 text-black overflow-hidden resize-none"
          value={analyticsTrackingCode}
          onChange={(e) => setAnayliticsTrackingCode(e.target.value)}
          rows={1}
        ></textarea>
      </div>

      <div className="p-3 flex items-center  border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">HTML Code</div>
        <div className=" flex flex-col w-full ml-[215px]">
          <textarea
            className="rounded-sm border-gray-400 w-full border-[1px] text-[14px] p-1 text-black resize-none"
            value={htmlCode}
            onChange={(e) => setHtmlcode(e.target.value)}
            rows={1}
          ></textarea>
          <div className=" text-[12px]">
            This tracking code is placed in Footer
          </div>
        </div>
      </div>
      <div className="flex justify-between h-full p-3 text-black border-y-[1px] border-gray-400">
        <div className="font-medium"></div>
        <div
          className="border-2 border-green-400 mr-11 text-green-400 px-1 w-[10rem] h-[2rem] flex justify-center items-center cursor-pointer"
          onClick={handleSaveChanges}
        >
          {loading ? (
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.1em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <p>Save Changes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
