"use client";

import Navbar from "@/components/navbar";
import { useSelector,useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { theme2 } from "@/utils/themeCreate";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
import { checkTokenExpiration } from "@/utils/authUtils";
import cookie from "js-cookie";

// Define a regex pattern for validating the email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Page = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({
    email: "",
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if user not authenticated
  useEffect(() => {
    if (!auth.token) {
      router.push("/login");
    }
  }, [auth.token, router]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setFormErrors({ email: "Please enter a valid email address." });
      return;
    }

    // Reset errors if the email is valid
    setFormErrors({ email: "" });

    setLoading(true);

    try {
        console.log("ff")
        const { CHANGEEMAIL_API } = endpoints;
        await checkTokenExpiration(dispatch, auth);
        const response = await apiConnector(
          "PATCH",
          `${CHANGEEMAIL_API}`,
          {
            "email":email
          }, // Construct the query string correctly
          {
            Authorization: `Bearer ${auth.token}`, // Add token to the headers
          }
        );
  
        if (response.data.success) {
            cookie.set("new-email", email);
          router.push("/settings/otp-verify")
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
      finally{
        setLoading(false)
      }
  };

  return (
    <ThemeProvider theme={theme2}>
      <div
        className="flex h-screen w-full pt-10 px-10 mx-auto"
        style={{
          backgroundImage: 'url("/back.svg")', // Add the path to your image here
          backgroundSize: "cover", // This ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
        }}
      >
        <div className="font-bold text-white text-4xl">TypingSpeedtest</div>

        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className="max-w-[400px] p-8 flex flex-col gap-4"
            style={{
              background: "#0000004D", // Semi-transparent black background
              backdropFilter: "blur(10px)", // Apply blur effect to the background
              borderRadius: "12px", // Optional: Add some border radius to make it look nicer
            }}
          >
            <div className="flex flex-col gap-2 text-3xl text-white">
              <div>Change email</div>
              <div className="text-xl text-[#B0B0B0]">
                This will change your registered email on typingspeedtest
              </div>
        
            </div>

            <div className="text-white">
              <TextField
                id="outlined-email"
                variant="outlined"
                size="medium"
                name="email"
                label="Enter new email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                error={!!formErrors.email}
                helperText={formErrors.email}
                sx={{
                 
                  minWidth: "320px",
                  maxWidth: "320px",
                  height:"88px",
                  "& .MuiInputBase-input": {
                    fontSize: "16px",
                    lineHeight: "24px",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    height: "56px",
                  },
                }}
              />
            </div>

            <div
              onClick={handleSubmit}
              className=
            {`px-[24px] py-[12px] w-full rounded-lg border-[1px] bg-[#D5E94E] border-[#4F4F4F] whitespace-nowrap text-sm text-black font-bold cursor-pointer text-center  ${
              loading ? "opacity-50" : ""
            }`}
            >
             Next
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Page;
