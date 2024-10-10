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
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/auth/authSlice";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  // localStorage.removeItem("token");

  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // Track API call status

  // Redirect if already logged in
  useEffect(() => {
    if (auth.token) {
      router.push("/practise-site");
    }
  }, [auth.token, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    const action = await dispatch(
      login({ email: inputs.email, password: inputs.password })
    );
    setLoading(false); // Reset loading after API call finishes

    if (login.fulfilled.match(action)) {
      router.push("/practise-site"); // Redirect to the desired route
    }
  };

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

  return (
    <ThemeProvider theme={theme}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 h-fit w-fit mb-40 md1:w-full 1xl:w-[30%]  flex-shrink-[0.3]"
      >
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
            isFormValid && !loading ? "brightness-100" : "brightness-50"
          }`}
        >
          <button
            type="submit"
            className="border-none bg-transparent"
            disabled={!isFormValid || loading} // Disable button during loading or if form is invalid
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Page;
