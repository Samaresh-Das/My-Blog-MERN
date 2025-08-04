// function BackgroundBlobs() {
//   return (
//     <div className="absolute inset-0 -z-10 overflow-hidden">
//       {/* Magenta blob top-left */}
//       <div className="absolute top-[120px] left-[-80px] w-[300px] h-[300px] bg-[#c71585] rounded-full mix-blend-screen opacity-20 blur-3xl animate-blob animation-delay-2000" />

//       {/* Blue glow bottom-right */}
//       <div className="absolute bottom-[120px] right-[-80px] w-[350px] h-[350px] bg-[#5c1eae] rounded-full mix-blend-screen opacity-25 blur-3xl animate-blob" />

//       {/* Faint pinkish center glow */}
//       <div className="absolute top-[45%] left-[15%] w-[280px] h-[280px] bg-[#6a40bf] rounded-full mix-blend-screen opacity-15 blur-3xl animate-blob animation-delay-4000" />
//       {/* Faint bluish center rigth glow */}
//       <div className="absolute top-[55%] right-[15%] w-[180px] h-[180px] bg-[#4075bf] rounded-full mix-blend-screen opacity-15 blur-3xl animate-blob animation-delay-4000" />
//     </div>
//   );
// }
// export default BackgroundBlobs;

import { motion } from "framer-motion";

function BackgroundBlobs() {
  const baseAnimation = {
    scale: [1, 1.1, 1],
    x: [0, 20, -20, 0],
    y: [0, -20, 20, 0],
  };

  const baseTransition = {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden blob">
      {/* Magenta blob top-left */}
      <motion.div
        animate={baseAnimation}
        transition={baseTransition}
        className="gpu-fix absolute top-[120px] left-[-80px] w-[300px] h-[300px] bg-[#c71585] rounded-full mix-blend-screen opacity-20 blur-3xl"
      />

      {/* Blue glow bottom-right */}
      {/* <motion.div
        animate={baseAnimation}
        transition={baseTransition}
        className="gpu-fix absolute bottom-[120px] right-[-80px] w-[350px] h-[350px] bg-[#5c1eae] rounded-full mix-blend-screen opacity-25 blur-3xl"
      /> */}

      {/* Faint pinkish center glow */}
      <motion.div
        animate={baseAnimation}
        transition={baseTransition}
        className="gpu-fix absolute top-[45%] left-[15%] w-[280px] h-[280px] bg-[#6a40bf] rounded-full mix-blend-screen opacity-15 blur-3xl"
      />

      {/* Faint bluish center right glow */}
      <motion.div
        animate={baseAnimation}
        transition={baseTransition}
        className="gpu-fix absolute top-[55%] right-[10%] w-[350px] h-[300px] bg-[#5594ec] rounded-full mix-blend-screen opacity-50 blur-3xl"
      />
    </div>
  );
}

export default BackgroundBlobs;
