"use client";
import Navbar from "@/components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
import { checkTokenExpiration } from "@/utils/authUtils";
import { setPractiseTestId } from "@/features/practise/practiseSlice";


const Page = () => {
  // localStorage.removeItem("token");
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [practiseTest, setPractiseTest] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Track the selected category

  // Redirect if user not authenticated
  useEffect(() => {
   
    if (!auth.token) {
      router.push("/login");
    }
  }, [auth.token, router]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const { ALLCATEGORY_API } = endpoints;
      try {
        setLoading(true);
        await checkTokenExpiration(dispatch, auth)
      
      
        const response = await apiConnector("GET", ALLCATEGORY_API);
        if (response.data.success) {
          setCategoryList(response.data.data.categories);
          setSelectedCategory(response.data.data.categories[0]?.name); // Set the first category as default
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPractiseTest = async (categoryName) => {
      if (categoryName && auth.token) {
        // Ensure token and category are available
        const { PRACTISEBYNAME_API } = endpoints;
        try {
          setLoading(true);
          const response = await apiConnector(
            "GET",
            `${PRACTISEBYNAME_API}?category=${categoryName}`,
            null, // No body data for GET
            {
              Authorization: `Bearer ${auth.token}`, // Add token to the headers
            }
          );
          if (response.data.success) {
            const practiceTests = response.data.data.practiceTests || []; // Ensure array fallback

            setPractiseTest(practiceTests); // Set an empty array if no practice tests are found
          }
        } catch (error) {
          console.error(
            `Error fetching practice tests for ${categoryName}:`,
            error
          );
        } finally {
          setLoading(false);
        }
      }
    };

    if (selectedCategory) {
      fetchPractiseTest(selectedCategory); // Fetch practise test for selected category (initially first category)
    }
  }, [selectedCategory]);

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName); // Update selected category
  };

  return (
    <div className="flex flex-col w-11/12 mx-auto whitespace-nowrap">
      <Navbar />

      {/* Custom linear loader with dimming and brightening effect */}
      {loading ? (
        <div className="flex flex-col gap-3 select-none">
          <div className="w-full mt-4 flex justify-center items-center">
            <div className="linear-loader"></div> {/* Loader animation */}
          </div>
        </div>
      ) : (
        <div className="flex justify-between relative gap-[93px]">
          {/* Category List */}
          <div className=" min-w-[210px] h-fit flex flex-col gap-4 text-white relative cursor-pointer select-none">
            {categoryList.map((category, id) => (
              <div
                key={id}
                onClick={() => handleCategoryClick(category.name)} // Fetch test when category is clicked
                className={`px-6 py-3 text-[16px] leading-6 ${
                  selectedCategory === category.name
                    ? "bg-[#1A1A1A] rounded-2xl mr-[48px]"
                    : ""
                }`} // Highlight selected category
              >
                {category.name}
              </div>
            ))}

            <div className="absolute right-0 top-0 h-full w-[1px] bg-gray-400"></div>
          </div>

          {/* Practice Test List */}
          <div className="w-full grid grid-cols-3 gap-10">
            {practiseTest.length > 0 ? (
              practiseTest.map((item, id) => (
                <div
                  key={id}
                  className="flex flex-col justify-between p-6 gap-6 bg-[#1A1A1A] rounded-xl"
                >
                  <div className="flex flex-col gap-4">
                    <div className="text-[25px] leading-9">{item.title}</div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <div>{item.description}</div>
                        <div>{item.progress}%</div>
                      </div>
                      <div className="h-2 w-full rounded-3xl bg-[#3D3D3D] relative">
                        {/* Progress Bar */}
                        <div
                          className="absolute top-0 left-0 h-full rounded-3xl bg-[#D5E94E]"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-[13px]">
                    <div
                      className="px-[47px] py-[10px] rounded-lg border-[1px] border-[#4F4F4F] cursor-pointer"
                      onClick={() => {
                        dispatch(setPractiseTestId(item.id));
                        router.push("/practise-site/chapters");
                      }}
                    >
                      Start
                    </div>
                    <div className="px-[47px] py-[10px] text-gray-600">
                      View Stats
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white">No practice tests available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
