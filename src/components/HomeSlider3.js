// HomeSlider.js

"use client";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { VscCircleLargeFilled, VscCircleLarge } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  const currentImages = slides[currentSlide].images;

  return (
    <div className="relative grid grid-cols-12 gap-8 h-full w-full">
      {currentImages.map((image, index) => (
        <motion.img
          key={index}
          src={image.url}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={image.variants}
          className={`absolute col-span-6 col-end-13 w-[100vw] h-[50vh]`}
          style={{ bottom: "5%" }}
        />
      ))}
      <motion.div
        initial="hidden"
        animate={showInitialAnimation ? "visible" : "static"}
        variants={{
          hidden: { opacity: 0, x: "-20%", filter: "blur(5px)" },
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }} // Пример анимации текста
          className="absolute col-span-4 col-start-2 text-white left-4 top-4"
        >
          {slides[currentSlide].text1}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3 }} // Пример анимации текста
          className="absolute col-span-2 col-start-2 text-white left-4 top-12"
        >
          {slides[currentSlide].text2}
        </motion.p>
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
      {slides.map((slide, index) => (
        <motion.button
          key={slide.id}
          className="absolute col-span-1 col-start-12"
          style={{ bottom: "28%", color: "white" }}
          onClick={() => setCurrentSlide(index)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {index === currentSlide ? (
            <VscCircleLargeFilled size={45} />
          ) : (
            <VscCircleLarge size={45} />
          )}
        </motion.button>
      ))}
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
