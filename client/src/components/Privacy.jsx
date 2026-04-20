import React from "react";

const Privacy = () => {
  return (
    <div className="px-6 py-12 md:px-16 text-neoBorder max-w-4xl mx-auto bg-white rounded-xl shadow-neoLg border-4 border-neoBorder mt-16 mb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-neoPink rounded-bl-full -z-10 border-b-4 border-l-4 border-neoBorder hidden md:block"></div>
      
      <h1 className="text-3xl md:text-4xl font-black text-neoBorder mb-8 pb-4 border-b-4 border-neoBorder inline-block">
        🛡️ Privacy Policy
      </h1>
      <p className="mb-6 font-bold text-lg">
        At <span className="bg-neoYellow px-2 py-1 border-2 border-neoBorder rounded-md">Sam's Blogs</span>, your privacy is important. This policy
        outlines how we collect, use, and protect your data.
      </p>

      <h2 className="text-2xl font-black mt-10 mb-4 bg-neoGreen inline-block px-4 py-2 border-2 text-neoBorder border-neoBorder rounded-lg shadow-[4px_4px_0px_#111827]">
        1. What We Collect
      </h2>
      <ul className="list-none space-y-2 font-bold ml-2">
        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neoPink border border-neoBorder rounded-full"></span> Name (if you create an account)</li>
        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neoPink border border-neoBorder rounded-full"></span> Email address (only for account-related use)</li>
        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neoPink border border-neoBorder rounded-full"></span> Posts or comments you choose to submit</li>
      </ul>

      <h2 className="text-2xl font-black mt-10 mb-4 bg-neoBlue inline-block px-4 py-2 border-2 text-neoBorder border-neoBorder rounded-lg shadow-[4px_4px_0px_#111827]">
        2. How We Use Your Data
      </h2>
      <p className="font-bold mb-4">We use your information solely to:</p>
      <ul className="list-none space-y-2 font-bold ml-2">
        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neoYellow border border-neoBorder rounded-full"></span> Display your authored posts and profile info</li>
        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neoYellow border border-neoBorder rounded-full"></span> Allow you to log in and manage your content</li>
        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-neoYellow border border-neoBorder rounded-full"></span> Improve the user experience of this site</li>
      </ul>

      <h2 className="text-2xl font-black mt-10 mb-4 bg-neoPink inline-block px-4 py-2 border-2 text-white border-neoBorder rounded-lg shadow-[4px_4px_0px_#111827]">
        3. No Sharing With Third Parties
      </h2>
      <p className="font-bold mb-4">
        We do not sell, trade, or share your personal information with any third
        parties.
      </p>

      <h2 className="text-2xl font-black mt-10 mb-4 bg-neoYellow inline-block px-4 py-2 border-2 text-neoBorder border-neoBorder rounded-lg shadow-[4px_4px_0px_#111827]">
        4. Data Storage
      </h2>
      <p className="font-bold mb-4">
        All data is stored securely and only accessible to the site
        administrator. You can request deletion of your account anytime.
      </p>

      <h2 className="text-2xl font-black mt-10 mb-4 bg-neoBorder inline-block px-4 py-2 border-2 text-white border-neoBorder rounded-lg shadow-[4px_4px_0px_#fdfbf7]">
        5. Cookies
      </h2>
      <p className="font-bold mb-8">
        This site may use minimal cookies for session authentication and smooth
        navigation. We do not use advertising cookies.
      </p>

      <div className="border-t-4 border-dashed border-neoBorder pt-6 mt-10 text-center">
        <p className="text-md font-extrabold bg-neoBg inline-block px-4 py-2 border-2 border-neoBorder rounded-full">
          Last updated: August 2, 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;
