// HomeSlider.js

"use client";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { VscCircleLargeFilled, VscCircleLarge } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

	useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsDesktop(width > 1024);
    };

    handleResize(); // Проверка при монтировании компонента
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="z-30 absolute grid grid-cols-12 gap-2 h-full w-full overflow-hidden">
      <motion.div
        initial="initial"
        animate={showInitialAnimation ? "visible" : "static"}
        variants={{
          initial: { opacity: 0, x: "20%", filter: "blur(5px)" },
          visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0.7, delay: 0.5 },
          },
          static: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0 },
          },
        }}
        style={{
          display: "grid",
          position: "absolute",
          gridColumnStart: "7",
          gridColumnEnd: "13",
          bottom: "5%",
        }}
      >
        <motion.img src="/svg/right.svg" className="w-[50vw] h-[25vh] xl:h-[40vh]" />
        <div className="flex flex-col absolute right-4 top-auto" style={{ color: "white", top: "50%", transform: "translateY(-50%)" }}>
          {slides.map((slide, index) => (
            <AnimatePresence key={slide.id}>
              <motion.button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="block"
              >
                {index === currentSlide ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <VscCircleLargeFilled size={45} />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 0.8, opacity: 0.8 }}
                    exit={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <VscCircleLarge size={45} />
                  </motion.div>
                )}
              </motion.button>
            </AnimatePresence>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial="initial"
        animate={showInitialAnimation ? "visible" : "static"}
        variants={{
          initial: { opacity: 0, x: "-20%", filter: "blur(5px)" },
          visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0.7, delay: 0.5 },
          },
          static: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0 },
          },
        }}
        style={{
          display: "grid",
          position: "absolute",
          gridColumnStart: isMobile ? "1" : "2",
          gridColumnEnd: "9",
          bottom: "15%",
        }}
      >
        <motion.img src="/svg/left.svg" className="w-[60vw] h-[30vh] xl:h-[50vh]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id} // Уникальный ключ для текста
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            transition={{ duration: 1, delay: 2.5 }} // Пример анимации текста
          >
            <motion.p
              key={`${slides[currentSlide].id}-text1`} // Уникальный ключ для text1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 2 } }}
              transition={{ duration: 0.5, delay: 0.5 }} // Пример анимации текста
              className="absolute text-white left-4 top-4"
              style={{ width: "60%" }}
            >
              {slides[currentSlide].text1}
            </motion.p>
            <motion.p
              key={`${slides[currentSlide].id}-text2`} // Уникальный ключ для text2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 2 } }}
              transition={{ duration: 0.5, delay: 0.5 }} // Пример анимации текста
              className="absolute text-white left-4 top-12"
              style={{
                width: "60%", // col-span-4 (4/12 * 100%)
              }}
            >
              {slides[currentSlide].text2}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <motion.button
        className="absolute col-span-1 col-start-4"
        style={{ bottom: "5%", color: "white" }}
        onClick={prevSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <HiChevronLeft size={85} />
      </motion.button>
      <motion.button
        className="absolute col-span-1 col-start-6"
        style={{ bottom: "5%", color: "white" }}
        onClick={nextSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <HiChevronRight size={85} />
      </motion.button>
    </div>
  );
};

export default HomeSlider;
