"use client";

import Navbar from "@/components/navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { theme2 } from "@/utils/themeCreate";

const Page = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.user);

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const categoryList = [
    { name: "Profile Picture" },
    { name: "Account Settings" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    categoryList[0]?.name
  );

  // Redirect if user not authenticated
  useEffect(() => {
    if (!auth.token) {
      router.push("/login");
    }
  }, [auth.token, router]);

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle Change Email and Password
  const handleChangeEmail = () => {
    router.push("/settings/change-email"); // Redirect to change email page
  };

  const handleChangePassword = () => {
    router.push("/settings/change-password"); // Redirect to change password page
  };

  return (
    <div className="flex flex-col w-11/12 mx-auto whitespace-nowrap">
      <Navbar />

      <div className="flex relative gap-[93px]">
        {/* Category List */}
        <div className="min-w-[210px] h-fit flex flex-col gap-4 text-white relative cursor-pointer select-none">
          {categoryList.map((category, id) => (
            <div
              key={id}
              onClick={() => handleCategoryClick(category.name)}
              className={`px-6 py-3 text-[16px] leading-6 text-center ${
                selectedCategory === category.name
                  ? "bg-[#1A1A1A] rounded-2xl mr-[25px]"
                  : ""
              }`}
            >
              {category.name}
            </div>
          ))}
          <div className="absolute right-0 top-0 h-full w-[1px] bg-gray-400"></div>
        </div>

        <ThemeProvider theme={theme2}>
          <div className="flex flex-col gap-12 w-full">
            {/* Input Box Container */}
            <div className="flex flex-col text-2xl text-white gap-6">
              <div>Display name</div>
              <div className="w-full flex gap-[20px]">
                {/* First Name Input */}
                <TextField
                  id="outlined-first-name"
                  label=""
                  readOnly
                  variant="outlined"
                  size="medium"
                  name="firstName"
                  value={userData.user.username.split(" ")[0] || ""}
                  fullWidth
                  sx={{
                    mb: "32px",
                    minWidth: "320px",
                    maxWidth: "320px",
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

                {/* Last Name Input */}
                <TextField
                  id="outlined-last-name"
                  label=""
                  variant="outlined"
                  readOnly
                  size="medium"
                  name="lastName"
                  value={userData.user.username.split(" ")[1] || " "}
                  fullWidth
                  sx={{
                    mb: "32px",
                    minWidth: "320px",
                    maxWidth: "320px",
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
            </div>

            <div className="flex flex-col text-2xl text-white gap-6">
              <div>Registered email</div>
              <div className="w-full flex gap-[16px]">
                {/* Email Input */}
                <TextField
                  id="outlined-email"
                  variant="outlined"
                  size="medium"
                  name="email"
                  readOnly
                  value={userData.user.email}
                  fullWidth
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  sx={{
                    mb: "32px",
                    minWidth: "320px",
                    maxWidth: "320px",
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
                <div
                  onClick={handleChangeEmail}
                  className="px-[24px] py-[10px] w-[170px] h-10  rounded-lg border-[1px] bg-[#D5E94E] border-[#4F4F4F] whitespace-nowrap text-sm text-black font-bold cursor-pointer text-center"
                >
                  Change Email
                </div>
              </div>
            </div>

            <div className="flex flex-col text-2xl text-white gap-6">
              <div>Password</div>
              <div className="w-full flex gap-[16px]">
                {/* Password Input */}
                <TextField
                  id="outlined-password"
                  label="Password"
                  variant="outlined"
                  readOnly
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.user?.password || "Som@7866"}
                  fullWidth
                  required
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  size="medium"
                  sx={{
                    minWidth: "320px",
                    maxWidth: "320px",
                    mb: "32px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      height: "56px",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ color: "white" }} />
                          ) : (
                            <Visibility sx={{ color: "white" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div
                  onClick={handleChangePassword}
                  className=" py-[10px] w-[170px] h-10  rounded-lg border-[1px] bg-[#D5E94E] border-[#4F4F4F] whitespace-nowrap text-sm text-black font-bold cursor-pointer text-center"
                >
                  Change Password
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Page;
