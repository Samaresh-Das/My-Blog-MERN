import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaCameraRetro,
  FaMusic,
  FaCarAlt,
  FaGamepad,
} from "react-icons/fa";

const hobbies = [
  { icon: <FaLaptopCode />, label: "Coding things for fun" },
  { icon: <FaCameraRetro />, label: "Photography and editing" },
  { icon: <FaMusic />, label: "Lo-fi music addict 🎧" },
  { icon: <FaCarAlt />, label: "Driving" },
  { icon: <FaGamepad />, label: "Gaming (Battle Royale)" },
];

const imageStack = [
  { src: "/Assets/Me.jpg", z: "z-30", offset: "top-0 left-0" },
  { src: "/Assets/Me2.jpg", z: "z-20", offset: "top-4 left-4" },
  { src: "/Assets/Me3.jpg", z: "z-10", offset: "top-8 left-8" },
];

const AboutMe = () => {
  return (
    <section className="relative z-10 px-6 py-16 max-w-6xl mx-auto mt-20 text-white">
      {/* Background animated blobs */}
      <motion.div
        className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none -z-10"
        animate={{ x: [0, 20, -10, 0], y: [0, -25, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        animate={{ x: [0, -20, 15, 0], y: [0, 15, -10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="backdrop-blur-xl bg-white/5 border border-purple-800/20 shadow-xl rounded-2xl p-10 flex flex-col md:flex-row gap-10 items-center justify-between">
        {/* Left: Text content */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center md:text-left">
            👋 About Me
          </h1>
          <p className="text-white/70 text-center md:text-left mb-6">
            Hey there! I’m{" "}
            <span className="text-purple-300 font-semibold">Samaresh</span>, a
            web developer who finds beauty in pixel-perfect UIs and the chaos of
            backend logic. When I'm not coding, I’m likely listening to music,
            gaming, experimenting with animations, or dreaming up wild app ideas
            that may or may not see the light of day.
          </p>

          <h2 className="text-xl font-semibold mb-3 text-purple-300">
            ✨ Hobbies & Fun Facts
          </h2>
          <ul className="space-y-3 text-white/80 text-base">
            {hobbies.map(({ icon, label }, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-lg text-purple-400">{icon}</span>
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center md:text-left text-white/60 text-sm">
            Always curious. Always caffeinated. ☕️
          </div>
        </div>

        {/* Right: Image stack with floating motion */}
        {/* <div className="relative w-[300px] h-[300px] flex-shrink-0 hidden md:block">
          {imageStack.map(({ src, z, offset }, idx) => (
            <motion.img
              key={idx}
              src={src}
              alt={`Samaresh ${idx}`}
              className={`absolute ${offset} ${z} w-[240px] h-[240px] object-cover rounded-xl shadow-2xl border border-violet-500/30`}
              initial={{
                opacity: 0.8,
                scale: 0.95,
              }}
              animate={{
                x: [30, -20, 30],
                y: [-30, 20, -30],
                rotate: [-5 + idx * 5, 0, -5 + idx * 5],
              }}
              transition={{
                type: "tween", // changed to tween for smooth multi-keyframe
                ease: "easeInOut",
                duration: 6,
                repeat: Infinity,
                delay: idx * 1.5,
              }}
            />
          ))}
        </div> */}
        <motion.div
          className="flex-1 max-w-xs mx-auto hidden md:block "
          initial={{
            opacity: 0,
            scale: 0.8,
            x: 100,
            y: -100,
            rotate: 10,
          }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 12,
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1.5,
          }}
        >
          <img
            src="/Assets/Me2.jpg"
            alt="Samaresh"
            className="rounded-2xl shadow-2xl border border-violet-500/40 w-[300px] h-[300px] object-cover"
          />
        </motion.div>

        {/* Mobile version - From bottom horizontally */}
        <motion.div
          className="flex justify-center md:hidden mt-10"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 10,
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1.5,
          }}
        >
          <img
            src="/Assets/Me2.jpg"
            alt="Samaresh"
            className="rounded-xl shadow-xl border border-violet-500/30 w-[250px] h-[250px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
