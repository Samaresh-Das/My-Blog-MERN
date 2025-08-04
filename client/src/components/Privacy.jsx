import React from "react";

const Privacy = () => {
  return (
    <div className="px-6 py-12 md:px-32 text-white max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl shadow-xl border border-white/10 mt-16">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">
        🛡️ Privacy Policy
      </h1>
      <p className="mb-4 text-white/80">
        At <strong>Sam's Blogs</strong>, your privacy is important. This policy
        outlines how we collect, use, and protect your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
        1. What We Collect
      </h2>
      <ul className="list-disc list-inside text-white/70 space-y-1">
        <li>Name (if you create an account)</li>
        <li>Email address (only for account-related use)</li>
        <li>Posts or comments you choose to submit</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
        2. How We Use Your Data
      </h2>
      <p className="text-white/70 mb-4">We use your information solely to:</p>
      <ul className="list-disc list-inside text-white/70 space-y-1">
        <li>Display your authored posts and profile info</li>
        <li>Allow you to log in and manage your content</li>
        <li>Improve the user experience of this site</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
        3. No Sharing With Third Parties
      </h2>
      <p className="text-white/70 mb-4">
        We do not sell, trade, or share your personal information with any third
        parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
        4. Data Storage
      </h2>
      <p className="text-white/70 mb-4">
        All data is stored securely and only accessible to the site
        administrator. You can request deletion of your account anytime.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">5. Cookies</h2>
      <p className="text-white/70 mb-4">
        This site may use minimal cookies for session authentication and smooth
        navigation. We do not use advertising cookies.
      </p>

      <p className="text-sm text-white/50 mt-10 italic">
        Last updated: August 2, 2025
      </p>
    </div>
  );
};

export default Privacy;
