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
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "@/app/api/axios";
import toast from "react-hot-toast";
import { useLinkedIn } from "react-linkedin-login-oauth2";


const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Check if all fields are filled and checkbox is checked
  const isFormValid = useMemo(() => {
    return inputs.email && inputs.password && rememberMe;
  }, [inputs, rememberMe]);

  // Define password input styles based on the showPassword state
  const passwordInputStyles = useMemo(
    () => ({
      fontSize: showPassword ? "16px" : "24px",
      letterSpacing: showPassword ? "0.5px" : "3px",
      lineHeight: "24px",
    }),
    [showPassword]
  );

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const response = await axios.post("api/v1/auth/exchange", {
            access_token: user.access_token,
          });

          if (response.data.success) {
            toast.success("Successfully Logged In");
            router.push("/signup");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Login failed");
          console.log(error);
        }
      }
    };

    fetchProfile();
  }, [user, router]);

  const { linkedInLogin } = useLinkedIn({
    clientId: "866y2apj5u4rx5",
    redirectUri: "http://localhost:3000/login",
    onSuccess: (code) => {
      // Change from `data.code` to `code`
      console.log(code);
    },
    // Change from `onFailure` to `onError`
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <form className="flex flex-col items-center gap-6 h-fit w-fit mb-40 md1:w-full 1xl:w-[30%]  flex-shrink-[0.3]">
        <div className="flex flex-col gap-2 leading-9">
          <div className="self-center">
            <img src="/icon.svg" alt="icon" />
          </div>
          <div className="self-center text-[25px]">Welcome back!</div>
          <div className="text-[#B0B0B0] leading-5 text-[15px] text-center">
            Don’t have an account yet?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-Primary cursor-pointer underline"
            >
              Sign up now
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <Box
            sx={{
              "& > :not(style)": { display: "flex" },
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
            <TextField
              id="outlined-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              size="medium"
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "56px",
                },
                "& .MuiInputBase-input": passwordInputStyles,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
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
            <div
              className="text-Primary underline text-[13px] cursor-pointer"
              onClick={() => router.push("/reset")}
            >
              Forgot password?
            </div>
          </div>
        </div>
        <div
          className={`px-6 py-3 bg-Primary font-bold text-[24px] text-black w-[100%] text-center rounded-lg ${
            isFormValid ? "brightness-100" : "brightness-50"
          }`}
        >
          <button type="submit" className="border-none bg-transparent">
            Log in
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
          <div className=" cursor-pointer" onClick={login}>
            <img src="/goo.svg" alt="Google" />
          </div>
          <div className=" cursor-pointer" >
            <img
              src="/link.svg"
              alt="Linked In"
              onClick={linkedInLogin}
            />
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Page;
