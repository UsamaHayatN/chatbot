"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-white">
      <div className="mb-4 flex items-center">
        <Image
          src="/images/solvars-logo.png"
          alt="Solvars Logo"
          width={250}
          height={250}
          className="cursor-pointer"
        />
      </div>

      {/* Grey line separator */}
      <hr className="w-full border-t-2 border-gray-500 my-4" />
    </div>
  );
};

export default HeroSection;
