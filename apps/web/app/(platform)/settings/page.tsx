"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

type Props = {};

const SettingsPage = (props: Props) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(
    user?.emailAddresses?.[0]?.emailAddress || ""
  );

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-64">
        Please sign in to view your settings.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-dark-gray dark:text-[#ECECEC]">
        Settings
      </h1>
      {/* Full Name Box */}
      <div className="bg-white/50 dark:bg-[#111113] rounded-lg shadow p-5 mb-6 border border-gray-200 dark:border-gray-800">
        <div className="font-semibold text-lg mb-2 text-dark-gray dark:text-[#ECECEC]">
          Full Name
        </div>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-800 bg-white/50 dark:bg-[#111113] rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary text-dark-gray dark:text-[#ECECEC]"
        />
      </div>
      {/* Email Box */}
      <div className="bg-white/50 dark:bg-[#111113] rounded-lg shadow p-5 mb-6 border border-gray-200 dark:border-gray-800">
        <div className="font-semibold text-lg mb-2 text-dark-gray dark:text-[#ECECEC]">
          Email
        </div>
        <input
          type="email"
          value={email}
          disabled
          className="w-full border border-gray-300 dark:border-gray-800 rounded px-3 py-2 mt-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        />
      </div>
      {/* User ID Box */}
      <div className="bg-white/50 dark:bg-[#111113] rounded-lg shadow p-5 mb-6 border border-gray-200 dark:border-gray-800">
        <div className="font-semibold text-lg mb-2 text-dark-gray dark:text-[#ECECEC]">
          User ID
        </div>
        <div className="text-neutral-gray dark:text-gray-400">{user?.id}</div>
      </div>
      {/* <button
                type="button"
                className="w-full bg-primary dark:bg-primary/80 text-white py-2 rounded hover:bg-primary/90 dark:hover:bg-primary/70 transition"
            >
                Save Changes
            </button> */}
    </div>
  );
};

export default SettingsPage;
