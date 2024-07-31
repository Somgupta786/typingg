"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { theme } from "@/utils/themeCreate";
import { useState, useMemo, Suspense } from "react";
import cookie from "js-cookie";
import axios from "@/app/api/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const email = cookie.get("email");
  const password = cookie.get("password");
  const [inputs, setInputs] = useState({
    username: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  // Check if all fields are filled
  const isFormValid = useMemo(() => {
    return inputs.username;
  }, [inputs]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if the form is valid
    if (!isFormValid) {
      return; // or show an error message
    }

    setLoading(true); // Set loading to true when starting API call

    try {
      const response = await axios.post("api/v1/auth/signUp", {
        username: inputs.username,
        email: email,
        password: password,
      });
      console.log("Success:", response.data);
      if (response.data.success) {
        cookie.set("username", inputs.username);
        toast.success("OTP sent. Please check your inbox and spam folder", {
          icon: "👏",
          style: {
            background: "#3D3D3D",
            color: "#fff",
          },
        });
        router.push("/signup/otp");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  return (
    <ThemeProvider theme={theme}>
        <form
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-6 h-fit  mb-20 md1:w-full 1xl:w-[30%] min-w-[370px] sm:min-w-0   flex-shrink-[0.3]"
      >
      
        <div className="flex flex-col gap-2 leading-9">
          <div className="self-center">
            <Image src="/icon.svg" alt="icon" width={50} height={50} />
          </div>
          <div className="self-center text-center text-[25px]">
            Almost there! Just one <br /> more step to go.
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <Box
            sx={{
              "& > :not(style)": { width: "100%", display: "flex" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-email"
              label="Enter Username"
              variant="outlined"
              size="medium"
              value={inputs.username}
              onChange={handleInputChange}
              name="username"
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
          className={`px-6 py-3 cursor-pointer bg-Primary font-bold text-[24px] text-black w-[100%]  text-center rounded-lg ${
            isFormValid
              ? loading
                ? "brightness-50"
                : "brightness-100"
              : "brightness-50"
          }`}
        >
          <button
            type="submit"
            className={`border-none bg-transparent ${
              !isFormValid || loading ? "opacity-50" : ""
            }`}
            disabled={!isFormValid || loading} // Disable button if form is invalid or loading
          >
            SignUp
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Page;
