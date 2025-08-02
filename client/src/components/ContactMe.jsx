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
    <section className="relative z-10 px-6 py-16 max-w-6xl mx-auto mt-20 text-white">
      <div className="backdrop-blur-xl bg-white/5 border border-purple-800/20 shadow-xl rounded-2xl p-10 flex flex-col md:flex-row gap-10 items-center justify-between">
        {/* Left: Links */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center md:text-left">
            📬 Contact Me
          </h1>
          <p className="text-white/70 text-center md:text-left mb-10">
            Whether it’s for a quick hello, collaboration idea, or just to say
            you love the color violet — I’d be thrilled to hear from you! 😊
          </p>

          <ul className="space-y-6 text-white/80 text-lg ">
            {contactLinks.map(({ label, href, icon }) => (
              <li key={label} className="flex items-center gap-3">
                {icon}
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="hover:text-white transition-colors text-white/80"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center md:text-left text-white/80 text-sm">
            Built with 🩵, caffeine, and way too many Tailwind classes.
          </div>
        </div>

        {/* Right: Animated image for tablets and desktop only */}
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
            src="/Assets/Me.jpg"
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
            src="/Assets/Me.jpg"
            alt="Samaresh"
            className="rounded-xl shadow-xl border border-violet-500/30 w-[250px] h-[250px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMe;
