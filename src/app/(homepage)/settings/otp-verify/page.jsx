"use client";
import Navbar from "@/components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { theme } from "@/utils/themeCreate";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
import { checkTokenExpiration } from "@/utils/authUtils";
import OtpInput from "react-otp-input";
import cookie from "js-cookie";
import axios from "@/app/api/axios";

// Define a regex pattern for validating the email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Page = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isOtpFilled, setIsOtpFilled] = useState(false);
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [otpError, setOtpError] = useState(false); // State for handling OTP error (incorrect OTP)
  const email = cookie.get("new-email");
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setIsOtpFilled(otp.length === 6);
    setIsOtpEntered(otp.length > 0);
  }, [otp]);

  const handleInputChange = (value) => {
    // Ensure only numbers are entered in OTP field
    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const { CHANGEEMAIL_API } = endpoints;
      await checkTokenExpiration(dispatch, auth);
      const response = await apiConnector(
        "PATCH",
        `${CHANGEEMAIL_API}`,
        { email: email }, // Construct the query string correctly
        {
          Authorization: `Bearer ${auth.token}`, // Add token to the headers
        }
      );

      if (response.data.success) {
        toast.success("OTP has been resent");
      } else {
        toast.error("Failed to resend OTP");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while resending OTP"
      );
    } finally {
      setLoading(false);
      setIsResendDisabled((prev) => !prev);
      setCountdown(10);
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

  const handleSubmit = async (e) => {
    setLoading(true); // Set loading to true when API call starts
    setOtpError(false); // Reset OTP error state

    try {
      const response = await axios.post(
        "/api/v1/user/verify-email",
        { email, otp },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Include token in Authorization header
          },
        }
      );

      if (response.data.success) {
        toast.success("Successfully Email Changed");
        setChanged(true)
       
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      // Check if status code is 400, which indicates incorrect OTP
      if (error.response?.status === 400) {
        setOtpError(true); // Mark OTP error as true, which will trigger red border
      }
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading to false after API call finishes
    }
  };

  const otpInputStyle = {
    width: "50px",
    height: "50px",
    margin: "0 16px 0 0",
    fontSize: "20px",
    borderRadius: "13px",
    border: `2px solid ${otpError ? "red" : "#B0B0B0"}`, // Apply red border if OTP is incorrect
    background: "transparent",
    textAlign: "center",
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="flex h-screen w-full pt-10 px-10 mx-auto"
        style={{
          backgroundImage: 'url("/back.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="font-bold text-white text-4xl">TypingSpeedtest</div>

        <div className="absolute inset-0 flex justify-center items-center">
          {!changed ? (
            <div
              className="max-w-[450px] p-8 flex flex-col gap-4"
              style={{
                background: "#0000004D",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
              }}
            >
              <div className="flex flex-col gap-2 text-3xl text-white">
                <div>Verify OTP</div>
                <div className="text-xl text-[#B0B0B0]">
                  Please enter the 6-digit code sent to your email.
                </div>
                <div
                  className=" text-base font-bold text-[#D5E94E] cursor-pointer"
                  onClick={() => router.push("/settings/change-email")}
                >
                  Change Email?
                </div>
              </div>

              <div className="w-fit flex flex-col gap-8">
                <OtpInput
                  value={otp}
                  onChange={handleInputChange}
                  numInputs={6}
                  renderSeparator={<span></span>}
                  renderInput={(props) => (
                    <input {...props} style={otpInputStyle} />
                  )}
                />
              </div>
              <div className="w-full cursor-pointer self-start md1:text-center mt-2 mb-2">
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
                onClick={handleSubmit}
                className={`px-[24px] py-[12px] w-full rounded-lg border-[1px] bg-[#D5E94E] border-[#4F4F4F] whitespace-nowrap text-sm text-black font-bold cursor-pointer text-center  ${
                  loading ? "opacity-50" : ""
                }`}
              >
                Next
              </div>
            </div>
          ) : (
            <div
            className="min-w-[400px] h-[355px] p-8 flex flex-col gap-6 text-3xl text-white items-center"
            style={{
              background: "#0000004D",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
            }}
          >
           <div className=" self-center"><img src="/done.svg"/></div>
           <div>Email changed!</div>

            

            <div
              onClick={()=>router.push("/practise-site")}
              className={`px-[24px] py-[12px] w-full rounded-lg border-[1px] bg-[#D5E94E] border-[#4F4F4F] whitespace-nowrap text-sm text-black font-bold cursor-pointer text-center  ${
                loading ? "opacity-50" : ""
              }`}
            >
              Back to website
            </div>
          </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Page;
