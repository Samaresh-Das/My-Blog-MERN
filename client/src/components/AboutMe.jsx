import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaCameraRetro,
  FaMusic,
  FaCarAlt,
  FaGamepad,
} from "react-icons/fa";
import SEOHead from "./shared/SEOHead";
import { SEO } from "./seoConfig";

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
    <>
      <SEOHead
        title="About Me"
        description="Hey there! I'm Samaresh, a web developer who finds beauty in pixel-perfect UIs and the chaos of backend logic. Learn more about me and my hobbies."
        url="/about"
        type="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: SEO.author.name,
          url: SEO.author.url,
          jobTitle: "Web Developer",
          sameAs: [
            "https://github.com/Samaresh-Das",
            "https://www.linkedin.com/in/samaresh-d-ab9621212/",
            "https://www.instagram.com/samaresh.d/",
          ],
        }}
      />
      <section className="relative z-10 px-6 py-16 max-w-6xl mx-auto text-neoBorder flex items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="bg-white border-4 border-neoBorder shadow-neoLg rounded-xl p-10 flex flex-col md:flex-row gap-10 items-center justify-between relative mt-10">
        
        {/* Background Decorative Blocks */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-neoPink border-b-4 border-l-4 border-neoBorder rounded-bl-[40px] z-0 hidden md:block"></div>
        <div className="absolute bottom-0 left-0 w-32 h-16 bg-neoGreen border-t-4 border-r-4 border-neoBorder rounded-tr-[30px] z-0"></div>

        {/* Left: Text content */}
        <div className="flex-1 relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-6 text-center md:text-left inline-block pb-2 border-b-4 border-neoBorder decoration-neoPink">
            👋 About Me
          </h1>
          <p className="font-bold text-lg text-center md:text-left mb-8">
            Hey there! I’m{" "}
            <span className="bg-neoYellow px-2 border-2 border-neoBorder rounded shadow-[2px_2px_0px_#111827] mx-1">
              <a
                href="https://portfolio-2-tau-sable.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black hover:text-neoPink transition-colors"
              >
                Samaresh
              </a>
            </span>
            , a web developer who finds beauty in pixel-perfect UIs and the
            chaos of backend logic. When I'm not coding, I’m likely listening to
            music, gaming, experimenting with other technologies, or dreaming up
            wild app ideas that may or may not see the light of day.
          </p>

          <h2 className="text-2xl font-black mb-4 bg-neoBlue inline-block px-4 py-2 border-2 border-neoBorder rounded-lg shadow-[4px_4px_0px_#111827]">
            ✨ Hobbies & Fun Facts
          </h2>
          <ul className="space-y-4 font-bold text-lg my-6">
            {hobbies.map(({ icon, label }, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-4 bg-neoBg p-3 border-2 border-neoBorder rounded-lg shadow-neo w-full max-w-sm"
                animate={{
                  y: [0, -4, 0, 3, 0],
                  rotate: [0, 1.5, -1.5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: i * 0.3, // stagger
                }}
              >
                <span className="p-2 bg-white border-2 border-neoBorder rounded-lg shadow-[2px_2px_0px_#111827] text-neoBorder text-xl">
                  {icon}
                </span>
                <span>{label}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 text-center md:text-left font-black text-sm bg-neoPink p-3 border-2 border-neoBorder rounded-lg shadow-neo inline-block text-white">
            Always curious. Always energetic. <span className="animate-pulse">🔥</span>
          </div>
        </div>

        {/* Right: Floating motion image for desktop */}
        <div className="flex-1 max-w-sm mx-auto hidden md:block relative z-10 w-full h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100, y: -100, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 12, duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-neoYellow border-4 border-neoBorder rounded-2xl transform translate-x-4 translate-y-4 shadow-[8px_8px_0px_#111827]"></div>
            <img
              src="/Assets/Me2.jpg"
              alt="Samaresh"
              className="relative w-full h-full object-cover rounded-2xl border-4 border-neoBorder bg-white"
            />
          </motion.div>
        </div>

        {/* Mobile version */}
        <div className="flex justify-center md:hidden mt-10 relative z-10 w-full max-w-xs">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 10, duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1.5 }}
            className="relative w-full aspect-square"
          >
             <div className="absolute inset-0 bg-neoYellow border-4 border-neoBorder rounded-xl transform translate-x-3 translate-y-3 shadow-[4px_4px_0px_#111827]"></div>
            <img
              src="/Assets/Me2.jpg"
              alt="Samaresh"
              className="relative w-full h-full object-cover rounded-xl border-4 border-neoBorder bg-white"
            />
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutMe;
