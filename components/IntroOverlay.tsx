"use client";

import { useState } from "react";
import { FullLogo } from "@/components/FullLogo";

export function IntroOverlay() {
  const [isDismissing, setIsDismissing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-[#1E1E1E] transition-opacity duration-700 ease-out ${
        isDismissing ? "opacity-0" : "opacity-100"
      }`}
      onTransitionEnd={() => {
        if (isDismissing) setIsVisible(false);
      }}
    >
      <FullLogo className="w-48 h-auto sm:w-64" />

      <button
        type="button"
        onClick={() => setIsDismissing(true)}
        className="font-unbounded font-black text-lg text-dark-text bg-[#EEE4FD] px-8 py-3 rounded-full transition-transform hover:scale-105"
      >
        Try Atlas
      </button>
    </div>
  );
}
