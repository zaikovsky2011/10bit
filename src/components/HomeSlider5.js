// HomeSlider.js

"use client";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { VscCircleLargeFilled, VscCircleLarge } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);

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
    <div className="relative grid grid-cols-12 gap-8 h-full w-full">
      <motion.img
        src="/svg/right.svg"
        initial="hidden"
        animate={showInitialAnimation ? "visible" : "static"}
        variants={{
          hidden: { opacity: 0, x: "20%", filter: "blur(5px)" },
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
        className="absolute col-span-6 col-end-13 w-[100vw] h-[50vh]"
        style={{ bottom: "5%" }}
      />
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
        className="absolute col-span-7 col-start-2 w-[100vw] h-[60vh]"
        style={{ bottom: "15%" }}
      >
        <motion.img src="/svg/left.svg" className="absolute" />
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
              exit={{ opacity: 0, transition: { duration: 1 } }}
              transition={{ duration: 1, delay: 2.5 }} // Пример анимации текста
              className="absolute text-white left-4 top-4"
              style={{
                width: "33.3333%", // col-span-4 (4/12 * 100%)
              }}
            >
              {slides[currentSlide].text1}
            </motion.p>
            <motion.p
              key={`${slides[currentSlide].id}-text2`} // Уникальный ключ для text2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
              transition={{ duration: 1, delay: 2.5 }} // Пример анимации текста
              className="absolute text-white left-4 top-12"
              style={{
                width: "33.3333%", // col-span-4 (4/12 * 100%)
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
      <div className="absolute col-span-1 col-start-12" style={{ bottom: "28%", color: "white" }}>
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
