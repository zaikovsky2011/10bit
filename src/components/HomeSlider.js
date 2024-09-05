"use client";

import { motion, AnimatePresence } from "framer-motion";
import useTransitionStore from "./useTransitionStore"; // Подставьте свой путь, если нужно
import useSliderStore from "./useSliderStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // Импорт хуков для работы с состояниями и побочными эффектами.
import { VscCircleLargeFilled, VscCircleLarge } from "react-icons/vsc"; // Импорт иконок для индикаторов текущего слайда.
import Navigations from "./Navigations";
import { Oswald } from 'next/font/google';
import { Commissioner } from 'next/font/google';


const oswald = Oswald({ weight: ['300', '700'], subsets: ['latin'] });
const commissioner = Commissioner({ weight: ['300', '700'], subsets: ['latin'] });

const HomeSlider = ({ slides }) => {
  const router = useRouter();
  const { animateTransition, setExitAnimationComplete } = useTransitionStore(
		(state) => ({
			animateTransition: state.animateTransition,
			setExitAnimationComplete: state.setExitAnimationComplete,
		})
	);

  const [isMobile, setIsMobile] = useState(false); // Флаг для мобильного устройства.
  const [isTablet, setIsTablet] = useState(false); // Флаг для планшета.
  const [isDesktop, setIsDesktop] = useState(true); // Флаг для десктопа.
  const [size, setSize] = useState({ width: 0, height: 0 });
  const {
    currentSlide,
    nextSlide,
    goToSlide,
    isPaused,
  } = useSliderStore();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth; // Получаем текущую ширину окна
      const height = window.innerHeight; // Получаем текущую высоту окна
      setIsMobile(width <= 768); // Если ширина меньше или равна 768px, то это мобильное устройство
      setIsTablet(width > 768 && width <= 1024); // Если ширина больше 768px и меньше или равна 1024px, то это планшет
      setIsDesktop(width > 1024); // Если ширина больше 1024px, то это десктоп

      // Рассчитываем размеры для мобильных устройств
      if (width <= 768) {
        const elementWidth = width * 0.65; // 60vw в пикселях для мобильных устройств
        setSize({ width: elementWidth, height: elementWidth });
      }

      // Рассчитываем размеры для планшетов
      if (width > 768 && width <= 1024) {
        const elementWidth = width * 0.8; // 80vw в пикселях для планшетов
        const elementHeight = height * 0.4; // 40vh в пикселях для планшетов
        setSize({ width: elementWidth, height: elementHeight });
      }

      // Рассчитываем размеры для десктопов
      if (width > 1024) {
        const elementHeight = height * 0.7; // 60vh в пикселях для десктопов
        setSize({ width: elementHeight, height: elementHeight });
      }
    };

    handleResize(); // Устанавливаем начальное состояние

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imageStyles = () => {
    if (isMobile) {
      return {
        zIndex: 40,
        position: "absolute",
        gridColumnStart: "3",
        gridColumnEnd: "6",
        top: "5%",
        width: size.width,
        height: size.height,
      };
    } else if (isTablet) {
      return {
        zIndex: 40,
        position: "absolute",
        gridColumnStart: "8",
        gridColumnEnd: "12",
        top: "20%",
        width: size.width,
        height: size.height,
      };
    } else if (isDesktop) {
      return {
        zIndex: 40,
        position: "absolute",
        gridColumnStart: "8",
        gridColumnEnd: "12",
        top: "20%",
        width: size.width,
        height: size.height,
      };
    }
  };

  const rightStyles = () => {
    if (isMobile) {
      return {
        display: "grid",
        position: "absolute",
        gridColumnStart: "2",
        gridColumnEnd: "13",
        bottom: "40%",
      };
    } else if (isTablet) {
      return {
        display: "grid",
        position: "absolute",
        gridColumnStart: "7",
        gridColumnEnd: "13",
        bottom: "5%",
      };
    } else if (isDesktop) {
      return {
        display: "grid",
        position: "absolute",
        gridColumnStart: "7",
        gridColumnEnd: "13",
        bottom: "5%",
      };
    }
  };

  const leftStyles = () => {
    if (isMobile) {
      return {
        display: "grid",
        position: "absolute",
        gridColumnStart: "1",
        gridColumnEnd: "11",
        bottom: "20%",
      };
    } else if (isTablet) {
      return {
        display: "grid",
        position: "absolute",
        gridColumnStart: "2",
        gridColumnEnd: "9",
        bottom: "15%",
      };
    } else if (isDesktop) {
      return {
        display: "grid",
        position: "absolute",
        gridColumnStart: "2",
        gridColumnEnd: "9",
        bottom: "15%",
      };
    }
  };

  useEffect(() => {
    // Автоматическое переключение слайдов каждые 5 секунд
    const interval = setInterval(() => {
      if (!isPaused) {
        // Добавляем проверку на isPaused
        nextSlide();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <div>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setExitAnimationComplete(true)}
      >
        {animateTransition && (
          <div className="z-30 absolute grid grid-cols-12 gap-2 h-full w-full overflow-hidden">
            {slides.map((slide, index) =>
              index === currentSlide ? (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={imageStyles()}
                >
                    {slide.images.map((image, idx) => (
                      <motion.img
                        key={idx}
                        src={image.url}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0, 
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: 50,
                          transition: { duration: 1, ease: "easeOut" },
                        }}
                      />
                    ))}
                </motion.div>
              ) : null
            )}
            <motion.div
              key="right-image"
              initial={{ opacity: 0, x: "20%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={rightStyles()}
            >
              <motion.img
                src="/svg/right.svg"
                className="w-[92vw] h-[40vh] xl:h-[40vh]"
              />
              <div
                className="flex flex-col absolute right-2"
                style={{
                  color: "white",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {slides.map((slide, index) => (
                  <motion.button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
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
                        <VscCircleLargeFilled size={isMobile ? 35 : 45} />
                      ) : (
                        <VscCircleLarge size={isMobile ? 35 : 45} />
                      )}
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
            <motion.div
              key="left-image"
              initial={{ opacity: 0, x: "-20%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={leftStyles()}
            >
              <motion.img
                src="/svg/left.svg"
                className="w-[90vw] h-[40vh] xl:h-[50vh]"
              />
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className= {`text-white ${commissioner.className} font-[700] "text-white text-2xl xl:text-6xl flex absolute ml-3 flex-col w-[60%] h-full`}
              >
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
                  style={{
                    marginTop: "10px",
                    justifyContent: "center",
                  }}
                >
                  {slides[currentSlide].text1}
                </motion.p>
                {slides[currentSlide].texts.map((textItem, index) => (
                  <motion.p
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: textItem.delay,
                    }}
                    className={`text-white ${oswald.className} font-[300] text-2xl xl:text-5xl flex h-2/6 items-center justify-center`} 
                  >
                    {textItem.text}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
            <Navigations />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeSlider;
