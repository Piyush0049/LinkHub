"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Upload from "@/components/upload";
import image from "../../public/invertedlogo1.jpg";

const Settings = () => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="fixed top-0 left-0 w-full bg-black z-50 ">
        <Image src={image} alt="Logo" width={125} height={70} priority className="rounded-lg" />
      </div>

      <div className="pt-32 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <Upload />

          <div className="flex justify-center pt-8">
            <button
              onClick={() => router.push("/homepage")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
            >
              Continue To LinkHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
