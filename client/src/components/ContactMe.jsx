import { delay, motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaUser,
  FaQuestionCircle,
} from "react-icons/fa";

const contactLinks = [
  {
    label: "Github",
    href: "https://github.com/Samaresh-Das",
    icon: <FaGithub className="text-violet-400 animate-pulse" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samaresh-d-ab9621212/",
    icon: <FaLinkedin className="text-blue-400 animate-pulse" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/samaresh.d/",
    icon: <FaInstagram className="text-pink-400 animate-pulse" />,
  },
  {
    label: "About Me",
    href: "/about",
    icon: <FaUser className="text-yellow-400 animate-pulse" />,
  },
  {
    label: "Fun Quiz",
    href: "/quiz",
    icon: <FaQuestionCircle className="text-indigo-400 animate-pulse" />,
  },
];

const ContactMe = () => {
  return (
    <section className="relative z-10 px-6 py-16 max-w-6xl mx-auto mt-10">
      <div className="bg-white border-4 border-neoBorder shadow-neoLg rounded-xl p-10 flex flex-col md:flex-row gap-10 items-center justify-between relative overflow-hidden">
        {/* Background Decorative Blocks */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-neoYellow border-b-4 border-r-4 border-neoBorder rounded-br-full z-0"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-neoBlue border-t-4 border-l-4 border-neoBorder rounded-tl-full z-0 hidden md:block"></div>

        {/* Left: Links */}
        <div className="flex-1 relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-6 text-center md:text-left text-neoBorder">
            📬 Contact Me
          </h1>
          <p className="font-bold text-lg text-center md:text-left mb-10 text-neoBorder">
            Whether it’s for a quick hello, collaboration idea, or just to say
            you love the color <span className="bg-neoPink px-1 border-2 border-neoBorder rounded shadow-[2px_2px_0px_#111827]">violet</span> — I’d be thrilled to hear from you! 😊
          </p>

          <ul className="space-y-4 text-neoBorder font-bold text-lg mb-8">
            {contactLinks.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="flex items-center gap-4 bg-neoBg border-2 border-neoBorder p-4 rounded-lg shadow-neo hover:shadow-neoHover hover:-translate-y-1 hover:bg-neoYellow transition-all group"
                >
                  <span className="p-2 bg-white border-2 border-neoBorder rounded-lg group-hover:scale-110 transition-transform">
                    {icon}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center md:text-left text-neoBorder font-bold text-sm bg-neoBg p-3 border-2 border-neoBorder rounded-lg shadow-neo inline-block">
            Built with 🩵, caffeine, and way too many Tailwind classes.
          </div>
        </div>

        {/* Right: Animated image for tablets and desktop only */}
        <div className="flex-1 max-w-sm mx-auto hidden md:block relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100, y: -100, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 12, duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1.5 }}
            className="relative"
          >
            {/* Image backdrop container for the brutalist effect */}
            <div className="absolute inset-0 bg-neoGreen border-4 border-neoBorder rounded-2xl transform translate-x-4 translate-y-4"></div>
            <img
              src="/Assets/Me.jpg"
              alt="Samaresh"
              className="relative rounded-2xl border-4 border-neoBorder w-full h-[400px] object-cover bg-white"
            />
          </motion.div>
        </div>

        {/* Mobile version - From bottom horizontally */}
        <div className="flex justify-center md:hidden mt-8 relative z-10 w-full max-w-xs">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 10, duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1.5 }}
            className="relative w-full"
          >
            <div className="absolute inset-0 bg-neoGreen border-4 border-neoBorder rounded-xl transform translate-x-3 translate-y-3"></div>
            <img
              src="/Assets/Me.jpg"
              alt="Samaresh"
              className="relative rounded-xl border-4 border-neoBorder w-full h-[300px] object-cover bg-white"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
