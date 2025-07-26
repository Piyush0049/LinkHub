"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import image from "../../public/invertedlogo1.jpg";

export async function getServerSideProps(context) {
  try {
    const cookies = parseCookies(context);

    const res = await axios.post("http://localhost:3000/api/userroute", { token: cookies.token });
    return {
      props: {
        data: res.data.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
      },
    };
  }
}

const Settings = ({ data }) => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState("");
  const [bio, setBio] = useState(data?.bio || "");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const save = async () => {
    const res = await axios.put("/api/addbio", { bio });
    console.log(res);
    router.push("/addimage");
    localStorage.removeItem("image");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="fixed top-0 left-0 w-full bg-black z-50">
        <Image src={image} alt="Logo" width={125} height={70} priority className="rounded-lg" />
      </div>
      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 rounded-lg shadow-lg hover:shadow-2xl">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={data?.profileImage || "/placeholder.jpg"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className={`font-bold ${windowWidth > 582 ? "text-2xl" : "text-xl"}`}>{data?.name}</h1>
                <p className={`text-gray-400 ${windowWidth > 582 ? "text-base" : "text-sm"}`}>{data?.username}</p>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={data?.name}
                  disabled
                  className="w-full bg-gray-800 text-gray-400 p-2 rounded-lg border border-gray-700 focus:outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={data?.username}
                  disabled
                  className="w-full bg-gray-800 text-gray-400 p-2 rounded-lg border border-gray-700 focus:outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={data?.email}
                  disabled
                  className="w-full bg-gray-800 text-gray-400 p-2 rounded-lg border border-gray-700 focus:outline-none cursor-not-allowed"
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700 focus:ring focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={save}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;





