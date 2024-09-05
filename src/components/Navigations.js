import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiChevronLeft,
  HiOutlinePlay,
  HiOutlinePause,
  HiChevronRight,
} from "react-icons/hi";
import ResizeHandler from "./ResizeHandler";
import useSliderStore from "./useSliderStore";

const Navigations = ({}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { nextSlide, prevSlide, pauseSlideShow, playSlideShow, isPaused } =
    useSliderStore();

  const buttonStyles = () => {
    if (isMobile) {
      return {
        display: "flex",
        position: "absolute",
        gap: "1.5rem",
        width: "100%",
        alignItems: "center",
        gridColumnStart: "1",
        bottom: "11%",
      };
    } else if (isTablet) {
      return {
        display: "flex",
        position: "absolute",
        gap: "2.75rem",
        alignItems: "center",
        gridColumnStart: "3",
        bottom: "4%",
      };
    } else if (isDesktop) {
      return {
        display: "flex",
        position: "absolute",
        gap: "2.75rem",
        alignItems: "center",
        gridColumnStart: "3",
        bottom: "4%",
      };
    }
  };

  return (
    <>
      <ResizeHandler
        setIsMobile={setIsMobile}
        setIsTablet={setIsTablet}
        setIsDesktop={setIsDesktop}
      />
      <motion.div
        // className="absolute flex bottom-[80px] gap-x-11 w-full items-center justify-center"
        style={buttonStyles()}
      >
        <motion.button
          className="flex"
          style={{ color: "white" }}
          onClick={prevSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          transition={{ duration: 1, delay: 2 }}
        >
          <HiChevronLeft size={isMobile ? 65 : isTablet ? 75 : 85} />
        </motion.button>
        <motion.button
          className="flex"
          style={{ color: "white" }}
          onClick={isPaused ? playSlideShow : pauseSlideShow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          transition={{ duration: 1, delay: 2 }}
        >
          {isPaused ? (
            <HiOutlinePlay size={isMobile ? 55 : isTablet ? 75 : 85} />
          ) : (
            <HiOutlinePause size={isMobile ? 55 : isTablet ? 75 : 85} />
          )}
        </motion.button>
        <motion.button
          className="flex"
          style={{ color: "white" }}
          onClick={nextSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          transition={{ duration: 1, delay: 2 }}
        >
          <HiChevronRight size={isMobile ? 65 : isTablet ? 75 : 85} />
        </motion.button>
      </motion.div>
    </>
  );
};

export default Navigations;
