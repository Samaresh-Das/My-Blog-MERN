import React from "react";

const Terms = () => {
  return (
    <div className="px-6 py-12 md:px-32 text-white max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl shadow-xl border border-white/10 mt-16">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">
        📜 Terms & Conditions
      </h1>
      <p className="mb-4 text-white/80">
        By accessing and using <strong>Sam's Blogs</strong>, you agree to the
        following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
        1. Content Ownership
      </h2>
      <p className="text-white/70 mb-4">
        All blog content and posts are owned by their respective creators. You
        retain full rights over your submitted content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
        2. Acceptable Use
      </h2>
      <ul className="list-disc list-inside text-white/70 space-y-1">
        <li>Do not post spam, hate speech, or harmful content</li>
        <li>Respect the community and engage constructively</li>
        <li>Refrain from copying content without permission</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
        3. User Accounts
      </h2>
      <p className="text-white/70 mb-4">
        You are responsible for the security of your login credentials. Misuse
        may result in account suspension.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
        4. No Warranties
      </h2>
      <p className="text-white/70 mb-4">
        This blog is provided "as is". We make no guarantees regarding uptime,
        accuracy, or continued availability.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
        5. Changes to Terms
      </h2>
      <p className="text-white/70 mb-4">
        These terms may be updated occasionally. Continued use of the site
        implies acceptance of the latest version.
      </p>

      <p className="text-sm text-white/50 mt-10 italic">
        Last updated: August 2, 2025
      </p>
    </div>
  );
};

export default Terms;
