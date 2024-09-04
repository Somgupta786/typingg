"use client";
import { useState, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

const Page = () => {
  const [siteTitle, setSiteTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [htmlCode, setHtmlcode] = useState("");
  const [useSeoFriendlyUrls, setUseSeoFriendlyUrls] = useState("yes");

  useEffect(() => {
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = textarea.scrollHeight + "px"; // Set height based on scrollHeight
    });
  }, [siteTitle, metaDescription, htmlCode]);

  return (
    <div className="flex flex-col text-gray-500 w-full h-full bg-white font-normal">
      <div className="flex justify-between bg-green-50 p-3 text-black border-y-[1px] border-gray-400">
        <div className="font-medium">Update Settings</div>
        <div className="border-2 border-green-400 text-green-400 px-1 cursor-pointer">
          Save Changes
        </div>
      </div>
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
      <div className="p-3 flex items-center  border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Meta Description</div>
        <textarea
          className="rounded-sm border-gray-400 w-full border-[1px] ml-[150px] text-[14px] p-1 text-black overflow-hidden resize-none"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={1}
        ></textarea>
      </div>
      <div className="p-3 flex items-center  border-y-[1px] border-gray-400">
        <div className="whitespace-nowrap">Logo Image</div>
        <div className="p-1 ml-[195px] rounded-sm bg-green-500 text-white flex items-center justify-between">
          <MdOutlineFileUpload className="text-black" /> Upload
        </div>
      </div>
      <div className="p-3 flex items-center  border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Default language</div>
        <select className="bg-white ml-[150px] text-black border-[1px] border-gray-300">
          <option>English</option>
          <option>Hindi</option>
        </select>
      </div>
      <div className="p-3 flex items-center  border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Default time zone</div>
        <select className="bg-white ml-[150px] text-black border-[1px] border-gray-300">
          <option>UTC</option>
          <option>IST</option>
        </select>
      </div>
      <div className="p-3 flex items-center  border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Use SEO friendly URL's</div>
        <div className="flex gap-4 ml-[120px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="seoFriendly"
              value="yes"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls === "yes"}
              onChange={() => setUseSeoFriendlyUrls("yes")}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="seoFriendly"
              value="no"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls === "no"}
              onChange={() => setUseSeoFriendlyUrls("no")}
            />
            No
          </label>
        </div>
      </div>
      <div className="p-3 flex items-center  border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Discourage search Engine</div>
        <div className="flex gap-4 ml-[81px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="seoFriendly"
              value="yes"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls === "yes"}
              onChange={() => setUseSeoFriendlyUrls("yes")}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="seoFriendly"
              value="no"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls === "no"}
              onChange={() => setUseSeoFriendlyUrls("no")}
            />
            No
          </label>
        </div>
      </div>
      <div className="p-3 flex items-center  border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Show video thumbnail from</div>
        <div className="flex gap-4 ml-[70px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="seoFriendly"
              value="yes"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls === "yes"}
              onChange={() => setUseSeoFriendlyUrls("yes")}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="seoFriendly"
              value="no"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls === "no"}
              onChange={() => setUseSeoFriendlyUrls("no")}
            />
            No
          </label>
        </div>
      </div>
      <div className="p-3 flex items-center  border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Use Maintanence mode</div>
        <div className="flex gap-4 ml-[100px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="seoFriendly"
              value="yes"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls === "yes"}
              onChange={() => setUseSeoFriendlyUrls("yes")}
            />
            Enabled
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="seoFriendly"
              value="no"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls === "no"}
              onChange={() => setUseSeoFriendlyUrls("no")}
            />
            Disabled
          </label>
        </div>
      </div>
      <div className="p-3 flex items-center  border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">Maintenance mode message</div>
        <select className="bg-white p-1 text-black border-[1px] border-gray-300 w-full ml-[55px]">
          <option>Medium (320*180 pixel)</option>
          <option>Large (320*180 pixel)</option>
        </select>
      </div>
      <div className="p-3 flex items-center  border-t-[1px] border-gray-400">
        <div className="whitespace-nowrap">EU cookie notification</div>
        <div className="flex gap-4 ml-[125px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="seoFriendly"
              value="yes"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls === "yes"}
              onChange={() => setUseSeoFriendlyUrls("yes")}
            />
            Enabled
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="seoFriendly"
              value="no"
              className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-black checked:border-transparent cursor-pointer"
              checked={useSeoFriendlyUrls === "no"}
              onChange={() => setUseSeoFriendlyUrls("no")}
            />
            Disabled
          </label>
        </div>
      </div>
      <div className="text-black p-3 font-medium border-t-[1px] border-gray-400">
        Analytics/Tracking Code
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
          <div className=" text-[12px]">This tracking code is placed in Footer</div>
        </div>

      </div>
      <div className="flex justify-between h-full p-3 text-black border-y-[1px] border-gray-400">
        <div className="font-medium"></div>
        <div className="border-2 h-fit border-green-400 text-green-400 px-1 cursor-pointer">
          Save Changes
        </div>
      </div>
    </div>
  );
};

export default Page;
