import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const ComingSoonModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neoBorder/60"
        onClick={onClose}
      />

      {/* Modal Box */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, type: "spring", stiffness: 200 }}
        className="relative z-10 p-8 rounded-xl bg-white border-4 border-neoBorder shadow-neoLg max-w-md w-[90%] text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neoBorder hover:bg-neoPink border-2 border-neoBorder rounded-lg p-1 transition-all"
        >
          <IoMdClose size={20} />
        </button>

        {/* Content */}
        <h2 className="text-3xl md:text-4xl font-black text-neoBorder mb-4">
          🚧 Coming Soon!
        </h2>
        <p className="text-neoBorder font-medium text-sm md:text-base border-l-4 border-neoBorder pl-4 text-left mt-4">
          This section is under construction. Stay tuned for exciting updates!
          🚀✨
        </p>
        <div className="mt-6 text-xl">💡🔧🎉</div>

        <button
          onClick={onClose}
          className="mt-6 px-6 py-2.5 rounded-lg border-2 border-neoBorder bg-neoYellow text-neoBorder font-bold shadow-neo hover:shadow-neoHover hover:-translate-y-1 transition-all"
        >
          Got it!
        </button>
      </motion.div>
    </div>
  );
};

export default ComingSoonModal;

