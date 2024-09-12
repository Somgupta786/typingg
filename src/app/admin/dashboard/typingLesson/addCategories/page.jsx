"use client";
import { useState } from "react";
import { FaCheck, FaCross, FaHome, FaCode } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
const Page = () => {
    const router = useRouter();

  const [loading, setLoading] = useState(false);
  const courses = [
    { name: "Typing Basic", slug: "typing-basic", lessons: 15 },
    { name: "Typing Beginner", slug: "typing-begineer", lessons: 8 },
    { name: "Typing Intermediate", slug: "typing-intermediate", lessons: 10 },
    { name: "Typing Advanced", slug: "typing-advanced", lessons: 9 },
  ];
  return (
    <div className=" h-full w-full bg-white">
      <div className="flex justify-between  bg-green-50 p-3 text-black border-y-[1px] border-gray-400">
        <div className="font-medium flex items-center gap-4">
          <div>Lesson Categories</div>

          <div onClick={()=>router.push('/admin/dashboard/typingLesson/addCategories/new')} className="space-x-2 border-2 flex items-center justify-center w-[5rem] h-[2rem] flex-nowrap gap-1 border-green-400 text-green-400 px-1 cursor-pointer whitespace-nowrap">
            Add new
          </div>
        </div>
      </div>

      <div className="flex justify-between p-3 text-black border-y-[1px] border-gray-400 text-sm bg-white">
        <div className="font-medium flex flex-nowrap items-center justify-center gap-2">
          <FaHome /> <p className=" font-bold">Home</p> <span>/</span>{" "}
          <p className="font-bold">Lessons</p> <span>/</span>{" "}
          <p className=" flex flex-nowrap">Lesson Categories</p>
        </div>
      </div>
      <div>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Genre Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                URL Slug
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Total Lessons
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {course.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.lessons}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <button className="px-2 text-gray-500 hover:text-gray-900">
                      ▲
                    </button>
                    <button className="px-2 text-gray-500 hover:text-gray-900">
                      ▼
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <RiImageEditFill />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <svg
                        className="w-5 h-5"
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
