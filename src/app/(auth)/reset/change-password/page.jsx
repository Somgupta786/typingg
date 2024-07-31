"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider } from "@mui/material/styles";
import React, { useState, useMemo, useCallback } from "react";
import { theme } from "@/utils/themeCreate";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "@/app/api/axios";

const Page = () => {
  const router = useRouter();
  const token = cookie.get("accessToken");
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }, []);

  const handleClickShowPassword = useCallback((inputName) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [inputName]: !prevShowPassword[inputName],
    }));
  }, []);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getPasswordInputStyles = (inputName) => {
    return {
      fontSize: showPassword[inputName] ? "16px" : "24px",
      letterSpacing: showPassword[inputName] ? "0.5px" : "3px",
      lineHeight: "24px",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (inputs.password !== inputs.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors);
    } else {
      setErrors({
        password: "",
        confirmPassword: "",
      });
      setLoading(true); // Start loading

      try {
        const response = await axios.post(
          "/api/v1/auth/changePassword",
          { password: inputs.password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("Password Changed Successfully");
          router.push("/login");
        } else {
          toast.error("Failed");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false); // End loading
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form
        className="flex flex-col items-center gap-6 h-fit w-fit mb-20 md1:w-full 1xl:w-[30%]  flex-shrink-[0.3]"
        onSubmit={handleSubmit}
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
        <div className="w-full flex flex-col gap-8">
          <Box
            sx={{
              "& > :not(style)": {  display: "flex" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-password"
              label="Password"
              type={showPassword.password ? "text" : "password"}
              variant="outlined"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              size="medium"
              fullWidth
              required
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                mb: "32px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "56px",
                },
                "& .MuiInputBase-input": getPasswordInputStyles("password"),
                "& .MuiOutlinedInput-root.Mui-error": {
                  borderColor: "red",
                },
                "& .MuiFormHelperText-root": {
                  height: "0px", // Set a fixed height for the helper text
                  visibility: errors.password ? "visible" : "hidden", // Control visibility
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("password")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword.password ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-confirm-password"
              label="Confirm Password"
              type={showPassword.confirmPassword ? "text" : "password"}
              variant="outlined"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleInputChange}
              size="medium"
              fullWidth
              required
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "56px",
                },
                "& .MuiInputBase-input":
                  getPasswordInputStyles("confirmPassword"),
                "& .MuiOutlinedInput-root.Mui-error": {
                  borderColor: "red",
                },
                "& .MuiFormHelperText-root": {
                  height: "0px", // Set a fixed height for the helper text
                  visibility: errors.confirmPassword ? "visible" : "hidden", // Control visibility
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("confirmPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword.confirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </div>

        <div
          className={`px-6 py-3 mt-2 bg-Primary font-bold text-[24px] text-black w-[100%] text-center rounded-lg ${
            inputs.password && inputs.confirmPassword
              ? loading
                ? "brightness-75" // Dim the button while loading
                : "brightness-100"
              : "brightness-50"
          }`}
        >
          <button type="submit" className="border-none bg-transparent " disabled={loading}>
             Continue
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Page;
