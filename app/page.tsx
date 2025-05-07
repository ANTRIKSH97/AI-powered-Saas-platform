"use client";
import Link from "next/link";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-animated text-white flex items-center justify-center overflow-hidden px-4">
      
      {/* Glowing blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* Glassmorphic content card */}
      <div className="relative z-10 p-10 md:p-14 rounded-3xl border border-white/10 backdrop-blur-md bg-white/5 max-w-3xl w-full shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6 text-center md:text-left">
         AI powered SaaS platform
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center md:text-left">
          Create and schedule powerful content with AI, all in one platform.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <Link href="/signup">
            <button className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 transition px-6 py-3 rounded-full text-white text-lg shadow-md hover:shadow-purple-700/50">
              <FaUserPlus />
              Sign Up
            </button>
          </Link>
          <Link href="/login">
            <button className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 transition px-6 py-3 rounded-full text-white text-lg shadow-md hover:shadow-emerald-700/50">
              <FaSignInAlt />
              Log In
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
