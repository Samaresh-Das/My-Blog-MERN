// import React from "react";
// import { motion } from "framer-motion";
// import { IoClose } from "react-icons/io5";

// const ComingSoonModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 px-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.7 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.8 }}
//         transition={{ duration: 0.3 }}
//         className="relative bg-gradient-to-br from-purple-800/30 via-violet-600/20 to-pink-400/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-8 text-white"
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-white/80 hover:text-white transition"
//         >
//           <IoClose size={24} />
//         </button>

//         <h2 className="text-3xl font-bold text-center text-purple-300 mb-4 animate-pulse">
//           🚧 Coming Soon!
//         </h2>

//         <p className="text-center text-white/80 text-base">
//           We're working hard to bring this feature to life. Stay tuned for
//           something amazing! 🎉
//         </p>

//         <div className="mt-6 text-center text-sm text-white/60">
//           🚀 Built with love by{" "}
//           <span className="text-purple-400 font-semibold">Samaresh</span>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ComingSoonModal;

import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const ComingSoonModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 p-8 rounded-2xl bg-white/10 backdrop-blur-2xl border border-purple-600/30 shadow-lg text-white max-w-md w-[90%] text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/80 hover:text-white transition"
        >
          <IoMdClose size={22} />
        </button>

        {/* Content */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#c084fc] animate-pulse">
          🚧 Coming Soon!
        </h2>
        <p className="mt-4 text-white/80 text-sm md:text-base">
          This section is under construction. Stay tuned for exciting updates!
          🚀✨
        </p>
        <div className="mt-6 animate-bounce text-xl">💡🔧🎉</div>
      </motion.div>
    </div>
  );
};

export default ComingSoonModal;
