import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InquiryFormSerivies from "../InquiryFormSerivies";

import placementImage from "../../assets/Images/Banner/18-1.webp";
import internshipImage from "../../assets/Images/Banner/workplace.png";
import edutechImage from "../../assets/Images/edutech/edutech.gif";
import CoeImage from "../../assets/Images/Banner/Coes.png";
import CodeChefImage from "../../assets/Images/Banner/codchef.png";
import TrainingImage from "../../assets/Images/Banner/coes1.png";

import CodechefInquiryFormSerivies from "../ContactPage/CodechefInquiryFormSerivies";


const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

// 🔑 Map URL path -> slide index
const pathToSlideIndex = {
  "/placement": 0,
  "/internship": 1,
  "/edutech": 2,
  "/coe": 3,
  "/codechef": 4,
  "/training": 5,
};

function BannerCarousel() {
  const location = useLocation();
  const navigate = useNavigate();

  const slides = [
    {
      badgeText: "Campus to Corporate Services",
      title: "Placement Support",
      subtitle: "Bridging Institutions & Industry",
      description:
        "We bridge the gap between institutions and industry by enabling seamless placement opportunities tailored to your students' career goals.",
      primaryBtnText: "Explore Now",
      primaryBtnLink: "/placement",
      secondaryBtnText: "Contact Us",
      secondaryBtnLink: "#contact",
      image: placementImage,
    },
    {
      badgeText: "Campus to Corporate Services",
      title: "Internship Programs",
      subtitle: "Empowering Students with Real-World Experience",
      description:
        "Our internship programs are designed to provide students with hands-on experience, bridging the gap between academic learning and industry requirements. We collaborate with top companies to offer internships that enhance skills and boost employability.",
      primaryBtnText: "Explore Now",
      primaryBtnLink: "/internship",
      secondaryBtnText: "Contact Us",
      secondaryBtnLink: "#contact",
      image: internshipImage,
    },
    {
      badgeText: "Campus to Corporate Services",
      title: "Edutech Solutions",
      subtitle: "From Learning to Hiring — All in One Place",
      description:
        "Infoziant’s Edutech platform is a smart, AI-powered career ecosystem designed to guide students from learning to landing their dream job.",
      primaryBtnText: "Explore Platform",
      primaryBtnLink: "/edutech",
      secondaryBtnText: "Contact Us",
      secondaryBtnLink: "#get-started",
      image: edutechImage,
    },
    {
      badgeText: "Campus to Corporate Services",
      title: "Centre Of Excellence",
      subtitle: "Turning Campuses into Innovation Hubs",
      description:
        "Our Centre of Excellence (CoE) initiative empowers colleges to build skill-driven learning environments in Cybersecurity & AI.",
      primaryBtnText: "Explore CoE",
      primaryBtnLink: "/coe",
      secondaryBtnText: "Contact Us",
      secondaryBtnLink: "#contact",
      image: CoeImage,
    },
    {
      badgeText: "Campus to Corporate Services",
      title: "CodeChef Training",
      subtitle: "Empower Students with CodeChef – Powered by Infoziant",
      description:
        "As a licensed partner of CodeChef, Infoziant brings a global learning platform to your institution.",
      primaryBtnText: "Explore CodeChef",
      primaryBtnLink: "/codechef",
      secondaryBtnText: "Contact Us",
      secondaryBtnLink: "#contact",
      image: CodeChefImage,
    },
    {
      badgeText: "Campus to Corporate Services",
      title: "Courses",
      subtitle: "Industry-Aligned Training Programs",
      description:
        "Our courses are designed in collaboration with industry experts to ensure students gain relevant skills that enhance their employability.",
      primaryBtnText: "Explore our Training",
      primaryBtnLink: "/courses",
      secondaryBtnText: "Contact Us",
      secondaryBtnLink: "#contact",
      image: TrainingImage,
    },
  ];

  // 👉 initial slide based on current path
  const getInitialIndex = () => {
    const indexFromPath = pathToSlideIndex[location.pathname];
    return indexFromPath ?? 0;
  };

  const [current, setCurrent] = useState(getInitialIndex);
  const [direction, setDirection] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const activeSlide = slides[current];

  // helper: derive an element id from a route path like "/placement" -> "placement"
  const idFromPath = (path) => {
    if (!path) return "top";
    return path.replace(/^\//, "").replace(/\//g, "-") || "top";
  };

  // When URL changes (menu click or navigation), jump to the right slide
  useEffect(() => {
    const targetIndex = pathToSlideIndex[location.pathname];

    if (typeof targetIndex === "number" && targetIndex !== current) {
      setDirection(targetIndex > current ? 1 : -1);
      setCurrent(targetIndex);
    }

    // If navigation included a scroll target in location.state, attempt to scroll after a short delay
    const scrollToId = location.state?.scrollTo;
    if (scrollToId) {
      const t = setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) {
          // if you have a fixed header, subtract its height here
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // fallback: scroll down by a viewport fraction
          window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
        }

        // Clear history state so repeated navigations don't try to scroll again.
        try {
          // Replace current history entry state with empty state (keeps same URL)
          window.history.replaceState({}, document.title);
        } catch (err) {
          // ignore if browser blocks this
        }
      }, 120);

      return () => clearTimeout(t);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const goToSlide = (index) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const handlePrimaryClick = (e) => {
    const targetPath = activeSlide.primaryBtnLink;
    const targetId = idFromPath(targetPath);

    if (location.pathname === targetPath) {
      // same page: scroll to element if exists
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
      }
    } else {
      // different route: navigate + pass desired scroll target in location.state
      navigate(targetPath, { state: { scrollTo: targetId } });
    }
  };

  return (
    <section
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-4 sm:px-6 w-full min-h-[600px] sm:h-[530px] overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white text-gray-900 flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute top-[-60px] left-[-60px] w-52 sm:w-72 h-52 sm:h-72 bg-blue-300 rounded-full opacity-30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute bottom-[-80px] right-[-60px] w-56 sm:w-80 h-56 sm:h-80 bg-blue-400 rounded-full opacity-30 blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto py-10 lg:py-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid lg:grid-cols-2 gap-10 items-center min-h-[420px]"
          >
            {/* TEXT */}
            <div className="space-y-5 max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center px-4 py-1.5 bg-blue-100 rounded-full border text-blue-600 text-sm font-medium">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                {activeSlide.badgeText}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                {activeSlide.title}
              </h1>

              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-blue-500">
                {activeSlide.subtitle}
              </h2>

              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                {activeSlide.description}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                {/* Primary button uses handler */}
                <button
                  onClick={handlePrimaryClick}
                  className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-300/40 transition inline-flex items-center justify-center"
                >
                  {activeSlide.primaryBtnText}
                </button>

                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 sm:px-8 py-3 border border-gray-300 rounded-full font-semibold bg-white cursor-pointer"
                >
                  {activeSlide.secondaryBtnText}
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-[32px] w-[260px] h-[220px] sm:w-[360px] sm:h-[300px] lg:w-[460px] lg:h-[380px] flex items-center justify-center">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="max-w-full max-h-full object-contain rounded-3xl"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DOTS */}
        <div className="mt-8 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-6 bg-gradient-to-r from-blue-500 to-teal-400"
                  : "w-2.5 bg-blue-200"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden sm:flex flex-col gap-2 absolute left-4 bottom-10">
        <span className="w-2 h-2 rounded-full bg-blue-300" />
        <span className="w-2 h-2 rounded-full bg-blue-300/70" />
        <span className="w-2 h-2 rounded-full bg-blue-300/40" />
      </div>

 {showForm && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
    {location.pathname === "/codechef" ? (
      <CodechefInquiryFormSerivies closeModal={() => setShowForm(false)} />
    ) : (
      <InquiryFormSerivies closeModal={() => setShowForm(false)} />
    )}
  </div>
)}
    </section>
  );
}

export default BannerCarousel;
