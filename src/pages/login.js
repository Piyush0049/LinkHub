"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Image from "next/image";
import image from "../../public/logo.png";

export default function Signuppage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/loginroute", {
        email: user.email,
        password: user.password,
      });

      if (response.status === 201) {
        router.push("/homepage");
      } else {
        console.error("Signup error:", response.data);
        window.alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      window.alert("An error occurred during signup.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-blue-900">
      <Image
        src={image}
        alt="Logo"
        width={190}
        height={130}
        priority
        className="rounded-lg shadow-lg"
      />
      <h1 className="text-white text-xl md:text-3xl font-bold mt-5 mb-8 text-center font-poppins animate-fade-in">
        Welcome back to LinkHub!
      </h1>
      <form
        onSubmit={login}
        className="flex flex-col bg-white rounded-lg shadow-md p-6 md:p-8 w-80 md:w-[450px] animate-slide-in"
      >
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={{marginBottom:"15px"}}
        />
        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          style={{marginBottom:"20px"}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <button
          type="submit"
          className="bg-green-600 text-white text-lg py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 font-poppins animate-pulse"
        >
          Login
        </button>
      </form>
      <h3 className="text-white text-sm md:text-base mt-5 font-poppins animate-fade-in">
        Do not have an account?{" "}
        <Link
          href="/signup"
          className="text-yellow-300 underline hover:text-yellow-400"
        >
          Sign up Now!
        </Link>
      </h3>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-in {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
