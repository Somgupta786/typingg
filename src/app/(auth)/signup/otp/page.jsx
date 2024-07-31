"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { theme } from "@/utils/themeCreate";
import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import axios from "@/app/api/axios";
import cookie from "js-cookie";
import toast from 'react-hot-toast';

const Page = () => {
  const email = cookie.get("email");
  const password = cookie.get("password");
  const username = cookie.get("username");

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isOtpFilled, setIsOtpFilled] = useState(false);
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    setIsOtpFilled(otp.length === 6);
    setIsOtpEntered(otp.length > 0);
  }, [otp]);

  const handleInputChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when API call starts
    try {
      const response = await axios.post("/api/v1/auth/verifyEmail", { email, otp });

      if (response.data.success) {
        toast.success("Successfully registered");
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading to false after API call finishes
    }
  };

  const handleResendOtp = async () => {
    
    setIsResendDisabled(true);
    setCountdown(10);
  
    try {
      const response = await axios.post("api/v1/auth/signUp", {
        username: username,
        email: email,
        password: password,
      });
      if (response.data.success) {
        toast.success("OTP has been resent");
        
       
      } else {
        toast.error("Failed to resend OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while resending OTP");
    } 
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  const otpInputStyle = {
    width: "50px",
    height: "50px",
    margin: "0 16px 0 0",
    fontSize: "20px",
    borderRadius: "13px",
    border: "2px solid #B0B0B0",
    background: "transparent",
    textAlign: "center",
  };

  return (
    <ThemeProvider theme={theme}>
      <form
        className="flex flex-col items-center gap-8 h-fit w-fit mb-20 md1:w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 leading-9">
          <div className="self-center">
            <img src="/icon.svg" alt="icon" />
          </div>
          <div className="self-center text-center text-[25px]">
            Verify OTP
          </div>
          <div className="text-[#B0B0B0] leading-6 text-[16px] text-center">
            Please enter the 6-digit code sent to you at <br />
            <span className=" font-bold text-white">
              {email}.
              <span className=" text-Primary font-bold"> Change Email?</span>
            </span>
          </div>
        </div>
        <div className="w-fit flex flex-col gap-8">
          <OtpInput
            value={otp}
            onChange={handleInputChange}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} style={otpInputStyle} />}
          />
        </div>
        <div className="w-full  cursor-pointer self-start md1:text-center mt-2 mb-2">
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-[#B0B0B0] cursor-pointer"
            disabled={isResendDisabled}
          >
            Resend OTP {isResendDisabled ? `in ${countdown} seconds` : ""}
          </button>
        </div>
        <div
          className={`px-6 py-3 bg-Primary font-bold text-[18px] text-black w-[100%] max-w-[400px] text-center rounded-lg ${
            isOtpFilled && !loading ? "brightness-100" : "brightness-50"
          }`}
        >
          <button
            type="submit"
            className={`border-none bg-transparent ${!isOtpFilled || loading ? "opacity-50" : ""}`}
            disabled={!isOtpFilled || loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
        <div
          className={`px-6 py-3 mt-2 bg-[#0A0A0A] font-bold text-[18px] text-black w-[100%] max-w-[400px] border-[0.5px] border-white text-center rounded-lg ${
            isOtpEntered ? "brightness-100" : "brightness-50"
          }`}
        >
          <button
            type="button"
            className="border-none bg-[#0A0A0A] text-[#F6F6F6]"
            disabled={!isOtpEntered}
            onClick={() => setOtp("")}
          >
            Clear OTP
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Page;
