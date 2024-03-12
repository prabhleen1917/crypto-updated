"use client"
import React, { useRef, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from 'next/image';

export default function Register() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null); // Ensure this is set up for use
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current || !passwordConfirmRef.current || !usernameRef.current) return;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);
      // Now includes username in the registration call
      await register(usernameRef.current.value, emailRef.current.value, passwordRef.current.value);
      // Here you might want to navigate the user or close the modal, etc.
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-wrap bg-black justify-center md:justify-between items-center max-w-4xl mx-auto p-4 rounded-lg shadow-xl">
        <div className="w-full md:w-1/2 px-6 py-8">
          <h2 className="text-2xl uppercase font-bold mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            {/* Username Field */}
            <div className="mb-4">
              <label htmlFor="username" className="block font-bold mb-2">Username</label>
              <input
                className="text-indigo-500 px-4 py-2 rounded-md w-full border"
                type="text"
                id="username"
                ref={usernameRef}
                required
              />
            </div>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2">Email</label>
              <input
                className="text-indigo-500 px-4 py-2 rounded-md w-full border"
                type="email"
                id="email"
                ref={emailRef}
                required
              />
            </div>
            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-2">Password</label>
              <input
                className="text-indigo-500 px-4 py-2 rounded-md w-full border"
                type="password"
                id="password"
                ref={passwordRef}
                required
              />
            </div>
            {/* Password Confirm Field */}
            <div className="mb-6">
              <label htmlFor="password-confirm" className="block font-bold mb-2">Confirm Password</label>
              <input
                className="text-indigo-500 px-4 py-2 rounded-md w-full border"
                type="password"
                id="password-confirm"
                ref={passwordConfirmRef}
                required
              />
            </div>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <button
              className="px-4 py-2 bg-indigo-500 rounded-md font-bold text-white hover:bg-indigo-600 transition-all w-full mb-4"
              disabled={loading}
              type="submit"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-4">
            Already have an account?{' '}
            <a
              className="cursor-pointer text-indigo-500 underline"
              onClick={() => window.location.href = '/login'}
            >
              Login
            </a>
          </div>
        </div>
        {/* Right side (image) */}
        <div className="w-full md:w-1/2 hidden md:block">
          <Image src="/register-illustration.svg" alt="Register Illustration" width={400} height={400} />
        </div>
      </div>
    </div>
  );
}
