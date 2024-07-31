"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import { theme } from "@/utils/themeCreate";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import cookie from 'js-cookie'

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleClickShowPassword = useCallback((inputName) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [inputName]: !prevShowPassword[inputName],
    }));
  }, []);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const isFormValid = useMemo(() => {
    return inputs.email && inputs.password && inputs.confirmPassword && rememberMe;
  }, [inputs, rememberMe]);

  const getPasswordInputStyles = (inputName) => {
    return {
      fontSize: showPassword[inputName] ? "16px" : "24px",
      letterSpacing: showPassword[inputName] ? "0.5px" : "3px",
      lineHeight: "24px",
    };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!validateEmail(inputs.email)) {
      newErrors.email = "Invalid email format";
    }

    if (inputs.password !== inputs.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors);
    } else {
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
      });
      cookie.set("email",inputs.email);
      cookie.set("password",inputs.password);
      router.push(`/signup/username`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-6 h-fit w-fit mb-20 md1:w-full 1xl:w-[30%]  flex-shrink-[0.3]"
      >
        <div className="flex flex-col gap-2 leading-9">
          <div className="self-center">
            <img src="/icon.svg" alt="icon" />
          </div>
          <div className="self-center text-[25px]">Welcome back!</div>
          <div className="text-[#B0B0B0] leading-5 text-[15px] text-center">
            Already a user?{" "}
            <span onClick={() => router.push("/login")} className="text-Primary underline cursor-pointer">Login</span>
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
              id="outlined-email"
              label="Email"
              variant="outlined"
              size="medium"
              value={inputs.email}
              onChange={handleInputChange}
              name="email"
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
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
                "& .MuiOutlinedInput-root.Mui-error": {
                  borderColor: "red",
                },
                "& .MuiFormHelperText-root": {
                  height: "0px",
                  visibility: errors.email ? "visible" : "hidden",
                },
              }}
            />
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
                  height: "0px",
                  visibility: errors.password ? "visible" : "hidden",
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
                "& .MuiInputBase-input": getPasswordInputStyles("confirmPassword"),
                "& .MuiOutlinedInput-root.Mui-error": {
                  borderColor: "red",
                },
                "& .MuiFormHelperText-root": {
                  height: "0px",
                  visibility: errors.confirmPassword ? "visible" : "hidden",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ pr: 0 }}>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        handleClickShowPassword("confirmPassword")
                      }
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
          <div className="flex justify-between items-center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                    "& .MuiCheckbox-root": {
                      borderColor: "white",
                    },
                  }}
                />
              }
              label="Remember me?"
              componentsProps={{
                typography: {
                  sx: {
                    "& .MuiFormControlLabel-asterisk": {
                      display: "none",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div
          className={`px-6 py-3 bg-Primary font-bold text-[24px] text-black w-[100%]  text-center rounded-lg ${
            isFormValid ? "brightness-100" : "brightness-50"
          }`}
        >
          <button
            type="submit"
            className={`border-none bg-transparent ${
              !isFormValid ? "opacity-50" : ""
            }`}
            disabled={!isFormValid}
          >
            Next
          </button>
        </div>
        <div className="flex items-center gap-4">
          <hr className="w-[64px] border border-[#4F4F4F]" />
          <div>or</div>
          <hr className="w-[64px] border border-[#4F4F4F]" />
        </div>
        <div className="w-[100%] flex justify-evenly">
          <div>
            <img src="/face.svg" alt="Facebook" />
          </div>
          <div className="cursor-pointer">
            <img src="/goo.svg" alt="Google" />
          </div>
          <div>
            <img src="/link.svg" alt="LinkedIn" />
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Page;
