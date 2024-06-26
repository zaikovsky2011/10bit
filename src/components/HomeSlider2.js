// HomeSlider.js

"use client";

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
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle initial animation display
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialAnimation(false);
    }, 10000); // Adjust timing as needed for your initial animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative grid grid-cols-6 w-full h-full">
      <motion.img
        src="/svg/right.svg"
        initial="hidden"
        animate={showInitialAnimation ? "visible" : "static"}
        variants={{
          hidden: { opacity: 0, x: "30%" },
          visible: { opacity: 1, x: 0, transition: { duration: 1 } },
          static: { opacity: 1, x: 0, transition: { duration: 0 } },
        }}
        className="absolute top-1/3 right-0 transform -translate-y-1/2 h-[55vh] "
      />
      <motion.img
        src="/svg/left.svg"
        initial="hidden"
        animate={showInitialAnimation ? "visible" : "static"}
        variants={{
          hidden: { opacity: 0, x: "-30%" },
          visible: { opacity: 1, x: 0, transition: { duration: 1 } },
          static: { opacity: 1, x: 0, transition: { duration: 0 } },
        }}
        className="absolute top-1/4 left-0 transform -translate-y-1/2 h-[45vh]"
      />
      <div className="inset-0 flex">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="w-full h-full flex items-center justify-center absolute"
            initial="exit"
            animate={index === currentSlide ? "enter" : "exit"}
          >
            <div className="flex w-full h-full xl:flex-row flex-col justify-center items-center">
              <div className="absolute col-span-2 col-start-4">
                <motion.div
                  variants={slide.variants.text1}
                  className="font-montserrat font-bold text-7xl text-white shadow-text"
                >
                  {slide.text1}
                </motion.div>
                <motion.div
                  variants={slide.variants.text2}
                  className="text-6xl text-white shadow-text2"
                >
                  {slide.text2}
                </motion.div>
              </div>
              <div className="w-1/2 h-full flex items-center justify-center">
                {slide.images.map((image, imgIndex) => (
                  <motion.img
                    key={imgIndex}
                    src={image.url}
                    alt={`Slide ${slide.id} Image ${imgIndex}`}
                    className="absolute"
                    initial="exit"
                    animate={index === currentSlide ? "enter" : "exit"}
                    variants={image.variants}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded"
          onClick={prevSlide}
        >
          Prev
        </button>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded"
          onClick={nextSlide}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomeSlider;
