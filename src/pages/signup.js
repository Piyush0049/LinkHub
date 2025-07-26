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
    name: "",
    email: "",
    password: "",
    cpassword: "",
    username: "",
  });

  const [windowWidth, setWindowWidth] = useState("");
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    if (user.password !== user.cpassword) {
      window.alert("Please fill your passwords correctly");
      return;
    }

    try {
      const response = await axios.post("/api/signuproute", {
        name: user.name,
        email: user.email,
        password: user.password,
        username: user.username,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        router.push("/personalinfo");
      } else {
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert("An error occurred during signup.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-black via-gray-800 to-teal-700">
      <Image
        src={image}
        alt="Logo"
        width={190}
        height={130}
        priority
        className="rounded-lg shadow-lg"
      />
      <h1
        className={`${
          windowWidth > 611 ? "text-2xl" : "text-lg"
        } text-white font-bold my-5 shadow-md font-poppins`}
      >
        Welcome to LinkHub!
      </h1>
      <form
        onSubmit={signup}
        className={`flex flex-col border-2 border-white p-8 rounded-lg bg-white/80 shadow-lg ${
          windowWidth > 465 ? "w-96" : "w-80"
        }`}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          style={{marginBottom:"15px"}}
        />
        <TextField
          label="Username"
          variant="outlined"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          style={{marginBottom:"15px"}}
        />
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
        <TextField
          label="Confirm Password"
          variant="outlined"
          type={showcPassword ? "text" : "password"}
          value={user.cpassword}
          onChange={(e) => setUser({ ...user, cpassword: e.target.value })}
          style={{marginBottom:"20px"}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowcPassword(!showcPassword)}
                  edge="end"
                >
                  {showcPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <button
          type="submit"
          className="bg-green-600 text-white text-lg py-2 rounded-md hover:bg-green-500 transition-all shadow-md font-poppins"
        >
          Signup
        </button>
      </form>
      <h3
        className={`mt-5 text-white ${
          windowWidth > 611 ? "text-sm" : "text-xs"
        } font-poppins`}
      >
        Already have an account?
        <Link href="/login" className="text-yellow-400 underline ml-1">
          Login Now!
        </Link>
      </h3>
    </div>
  );
}
