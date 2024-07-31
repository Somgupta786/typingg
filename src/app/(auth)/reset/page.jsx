"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { theme } from "@/utils/themeCreate";
import { useState, useMemo } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "@/app/api/axios";

const Page = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false); // State to track loading

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  // Check if all fields are filled
  const isFormValid = useMemo(() => {
    return inputs.email;
  }, [inputs]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post("api/v1/auth/forgetPassword", {
        email: inputs.email,
      });

      if (response.data.success) {
        cookie.set("email", inputs.email);
        toast.success("OTP sent. Please check your inbox and spam folder", {
          icon: "👏",
          style: {
            background: "#3D3D3D",
            color: "#fff",
          },
        });
        router.push("/reset/otp");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Error:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-6 h-fit w-fit mb-20"
      >
        <div className="flex flex-col gap-2 leading-9">
          <div className="self-center">
            <img src="/icon.svg" alt="icon" />
          </div>
          <div className="self-center text-center text-[25px]">
            Reset Password
          </div>
          <div className="text-[#B0B0B0] leading-6 text-[16px] text-center">
            Enter your email address to reset <br /> your password.
          </div>
        </div>
        <div className="w-fit flex flex-col gap-8">
          <Box
            sx={{
              "& > :not(style)": { width: "400px", display: "flex" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-email"
              label="Enter email"
              variant="outlined"
              size="medium"
              value={inputs.email}
              onChange={handleInputChange}
              name="email"
              fullWidth
              required
              sx={{
                mb: "32px",
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
          </Box>
        </div>
        <div
          className={`px-6 py-3 bg-Primary font-bold text-[24px] text-black w-[100%] text-center rounded-lg ${
            isFormValid && !loading ? "brightness-100" : "brightness-50"
          }`}
        >
          <button
            type="submit"
            className="border-none bg-transparent"
            disabled={!isFormValid || loading} // Disable button if form is not valid or loading
          >
            Continue {/* Show loading text */}
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Page;
