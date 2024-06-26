"use client";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { VscCircleLargeFilled, VscCircleLarge } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
	const [showFirstImage, setShowFirstImage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsDesktop(width > 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlayPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 10000);
      setIntervalId(interval);

      return () => clearInterval(interval);
    }
  }, [isAutoPlayPaused]);

	useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstImage(true);
    }, 2000); // Задержка в 1 секунду перед появлением первого изображения

    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    if (isAnimationComplete) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsAnimationComplete(false);
      setIsAutoPlayPaused(true);
    }
  };

  const prevSlide = () => {
    if (isAnimationComplete) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsAnimationComplete(false);
      setIsAutoPlayPaused(true);
    }
  };

  const handleSlideChange = (index) => {
    if (isAnimationComplete && index !== currentSlide) {
      // Add a check to prevent unnecessary state update
      setIsTransitioning(true);
      setCurrentSlide(index);
      setIsAnimationComplete(false);
      setIsAutoPlayPaused(true);
    }
  };

  const onAnimationCompleteHandler = () => {
    setIsAnimationComplete(true);
    setIsTransitioning(false);
    setIsAutoPlayPaused(false);
  };

  return (
    <div className="z-30 absolute grid grid-cols-12 gap-2 h-full w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: "20%", filter: "blur(5px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{
          display: "grid",
          position: "absolute",
          gridColumnStart: "7",
          gridColumnEnd: "13",
          bottom: "5%",
        }}
      >
        <motion.img
          src="/svg/right.svg"
          className="w-[50vw] h-[25vh] xl:h-[40vh]"
        />
        <div
          className="flex flex-col absolute right-4 top-auto"
          style={{ color: "white", top: "50%", transform: "translateY(-50%)" }}
        >
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              onClick={() => handleSlideChange(index)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="block"
            >
              <motion.div
                initial={
                  index === currentSlide
                    ? { scale: 0.8, opacity: 0.8 }
                    : { scale: 1, opacity: 1 }
                }
                animate={
                  index === currentSlide
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.8, opacity: 0.8 }
                }
                exit={
                  index === currentSlide
                    ? { scale: 0.8, opacity: 0.8 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.5 }}
              >
                {index === currentSlide ? (
                  <VscCircleLargeFilled size={45} />
                ) : (
                  <VscCircleLarge size={45} />
                )}
              </motion.div>
            </motion.button>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: "-20%", filter: "blur(5px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{
          display: "grid",
          position: "absolute",
          gridColumnStart: isMobile ? "1" : "2",
          gridColumnEnd: "9",
          bottom: "15%",
        }}
      >
        <motion.img
          src="/svg/left.svg"
          className="w-[60vw] h-[30vh] xl:h-[50vh]"
        />
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute text-white left-4"
            style={{ width: "60%" }}
            onAnimationComplete={onAnimationCompleteHandler}
          >
            <motion.p
              className="top-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {slides[currentSlide].text1}
            </motion.p>
            <motion.p
              className="top-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {slides[currentSlide].text2}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute w-full h-full flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1}}
        >
          {showFirstImage && slides[currentSlide].images.map((image, index) => (
              <motion.img
              key={index}
              src={image.url}
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="absolute"
            />
          ))}
        </motion.div>
      </AnimatePresence>
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
