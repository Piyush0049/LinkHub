"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';
import image from "../../public/logo.png";

export default function Home() {

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(-20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `, styleSheet.cssRules.length);

    const cards = document.querySelectorAll('[data-card]');
    cards.forEach(card => {
      card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
      });
      card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      });
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseover', () => {
          card.style.transform = 'scale(1.05)';
          card.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        });
        card.removeEventListener('mouseout', () => {
          card.style.transform = 'scale(1)';
          card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
      });
    };
  }, []);

  return (
    <main className="flex justify-center items-center min-h-screen font-sans overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url(https://t3.ftcdn.net/jpg/06/06/59/32/360_F_606593218_xx4pzBfrDqFEYVXJ6u9a9cGG6dpqYNXB.jpg)" }}>
      <div className="text-center max-w-4xl p-6 rounded-2xl bg-white bg-opacity-80 backdrop-blur-lg shadow-xl animate-fadeIn">
        <Image
          src={image}
          alt="Logo"
          width={160}
          height={110}
          priority
          className="rounded-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 my-4">Welcome To LinkHub</h1>
        <p className="text-xl text-gray-600 mb-8">Connect, Share, Thrive</p>
        
        <div className="flex justify-around flex-wrap">
          <div className="flex-1 min-w-[200px] m-2 p-5 rounded-xl bg-blue-100 transform transition-all cursor-pointer shadow-md hover:scale-105 hover:shadow-lg" data-card>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Connect</h2>
            <p className="text-gray-600">Share your thoughts, stories and experiences</p>
          </div>
          <div className="flex-1 min-w-[200px] m-2 p-5 rounded-xl bg-blue-100 transform transition-all cursor-pointer shadow-md hover:scale-105 hover:shadow-lg" data-card>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Share</h2>
            <p className="text-gray-600">Proudly share success stories</p>
          </div>
          <div className="flex-1 min-w-[200px] m-2 p-5 rounded-xl bg-blue-100 transform transition-all cursor-pointer shadow-md hover:scale-105 hover:shadow-lg" data-card>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thrive</h2>
            <p className="text-gray-600">Empower, Grow, Succeed, Thrive Together</p>
          </div>
        </div>
        
        <Link href="/signup" className="mt-8 inline-block px-6 py-3 text-xl font-mono text-black bg-transparent border-2 border-black rounded-md transition-all hover:bg-black hover:text-white animate-pulse">
        
            Start Your Journey Now...
        </Link>
      </div>
    </main>
  );
}
