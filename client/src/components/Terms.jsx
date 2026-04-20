import React from "react";

const Terms = () => {
  return (
    <div className="px-6 py-12 md:px-16 text-neoBorder max-w-4xl mx-auto bg-white rounded-xl shadow-neoLg border-4 border-neoBorder mt-16 mb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-neoPink rounded-bl-full -z-10 border-b-4 border-l-4 border-neoBorder hidden md:block"></div>
      
      <h1 className="text-3xl md:text-4xl font-black text-neoBorder mb-8 pb-4 border-b-4 border-neoBorder inline-block">
        📜 Terms & Conditions
      </h1>
      <p className="mb-6 font-bold text-lg">
        By accessing and using <span className="bg-neoYellow px-2 py-1 border-2 border-neoBorder rounded-md">Sam's Blogs</span>, you agree to the
        following terms and conditions.
      </p>

      <h2 className="text-2xl font-black mt-10 mb-4 bg-neoGreen inline-block px-4 py-2 border-2 text-neoBorder border-neoBorder rounded-lg shadow-[4px_4px_0px_#111827]">
        1. Content Ownership
      </h2>
      <p className="font-bold mb-4">
        All blog content and posts are owned by their respective creators. You
        retain full rights over your submitted content.
      </p>

      <h2 className="text-2xl font-black mt-10 mb-4 bg-neoBlue inline-block px-4 py-2 border-2 text-neoBorder border-neoBorder rounded-lg shadow-[4px_4px_0px_#111827]">
        2. Acceptable Use
      </h2>
      <ul className="list-none space-y-2 font-bold ml-2">
        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neoYellow border border-neoBorder rounded-full"></span> Do not post spam, hate speech, or harmful content</li>
        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neoYellow border border-neoBorder rounded-full"></span> Respect the community and engage constructively</li>
        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neoYellow border border-neoBorder rounded-full"></span> Refrain from copying content without permission</li>
      </ul>

      <h2 className="text-2xl font-black mt-10 mb-4 bg-neoPink inline-block px-4 py-2 border-2 text-white border-neoBorder rounded-lg shadow-[4px_4px_0px_#111827]">
        3. User Accounts
      </h2>
      <p className="font-bold mb-4">
        You are responsible for the security of your login credentials. Misuse
        may result in account suspension.
      </p>

      <h2 className="text-2xl font-black mt-10 mb-4 bg-neoYellow inline-block px-4 py-2 border-2 text-neoBorder border-neoBorder rounded-lg shadow-[4px_4px_0px_#111827]">
        4. No Warranties
      </h2>
      <p className="font-bold mb-4">
        This blog is provided "as is". We make no guarantees regarding uptime,
        accuracy, or continued availability.
      </p>

      <h2 className="text-2xl font-black mt-10 mb-4 bg-neoBorder inline-block px-4 py-2 border-2 text-white border-neoBorder rounded-lg shadow-[4px_4px_0px_#fdfbf7]">
        5. Changes to Terms
      </h2>
      <p className="font-bold mb-8">
        These terms may be updated occasionally. Continued use of the site
        implies acceptance of the latest version.
      </p>

      <div className="border-t-4 border-dashed border-neoBorder pt-6 mt-10 text-center">
        <p className="text-md font-extrabold bg-neoBg inline-block px-4 py-2 border-2 border-neoBorder rounded-full">
          Last updated: August 2, 2025
        </p>
      </div>
    </div>
  );
};

export default Terms;
