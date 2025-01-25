"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-white">
      <div className="mb-4">
        <Image
          src="/images/solvars-icon.png"
          alt="Solvars Logo"
          width={75}
          height={75}
          className="rounded-full cursor-pointer"
        />
      </div>

      <h2 className="text-3xl font-bold cursor-pointer">Solvars</h2>

      {/* Grey line separator */}
      <hr className="w-full border-t-2 border-gray-500 my-4" />
    </div>
  );
};

export default HeroSection;
