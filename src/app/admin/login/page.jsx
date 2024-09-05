"use client";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail(email.trim());
    setPassword(password.trim());
  
    const validate = () => {
      let emailError = "";
      let passwordError = "";
  
      if (!email) {
        emailError = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError = "Email address is invalid";
      }
  
      if (!password) {
        passwordError = "Password is required";
      } else if (password.length < 6) {
        passwordError = "Password must be at least 6 characters";
      }
  
      setErrors({ email: emailError, password: passwordError });
  
      return !emailError && !passwordError;
    };
  
    if (validate()) {
      try {
        const requestBody = { email, password };
        console.log("Request Body:", requestBody);
  
        const response = await fetch("https://typing.varankit.tech/api/v1/auth/admin/signIn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });
  
        const result = await response.json();
        if (!response.ok) {
          console.error("Server Response:", result);
          throw new Error(result.message || "Something went wrong");
        }
  
        console.log("Sign-in successful:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  

  

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center text-black"
      style={{ backgroundImage: "url('https://wordscramble.me/bemusic/build/assets/auth-bg-8529ec0e.svg')" }}
    >
      <div className="absolute top-[5vh] text-center text-3xl font-bold text-white">
        TypingSpeedtest
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg w-[30vw] max-h-[70vh]   flex flex-col justify-center md:w-[95vw] md:h-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Password</label>
              <a href="/forgot-password" className="text-sm text-[#D5E94E] hover:underline brightness-50">
                Forgot your password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={staySignedIn}
              onChange={() => setStaySignedIn(!staySignedIn)}
              className="mr-2"
            />
            <label className="text-sm font-medium">
              Stay signed in for a month
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#626b22] text-white py-2 rounded-md mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
