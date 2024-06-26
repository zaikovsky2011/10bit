"use client";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi"; // Импорт иконок для кнопок "вправо" и "влево".
import { VscCircleLargeFilled, VscCircleLarge } from "react-icons/vsc"; // Импорт иконок для индикаторов текущего слайда.
import { useState, useEffect } from "react"; // Импорт хуков для работы с состояниями и побочными эффектами.
import { motion, AnimatePresence } from "framer-motion"; // Импорт анимационных компонентов из библиотеки framer-motion.
import { useExiting } from "./ExitingContext"; // Импорт пользовательского хука для отслеживания состояния выхода.

const HomeSlider = ({ slides }) => {
  // Определение состояния компонента с помощью хуков useState
  const [currentSlide, setCurrentSlide] = useState(0); // Текущий слайд.
  const [isMobile, setIsMobile] = useState(false); // Флаг для мобильного устройства.
  const [isTablet, setIsTablet] = useState(false); // Флаг для планшета.
  const [isDesktop, setIsDesktop] = useState(true); // Флаг для десктопа.
  const [isAnimationComplete, setIsAnimationComplete] = useState(true); // Флаг завершения анимации.
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false); // Флаг паузы автопроигрывания.
  const [isTransitioning, setIsTransitioning] = useState(false); // Флаг для отслеживания переходов между слайдами.
  const [intervalId, setIntervalId] = useState(null); // Идентификатор интервала для автопроигрывания.
  const [showFirstImage, setShowFirstImage] = useState(false); // Флаг для отображения первого изображения.
  const { isExiting } = useExiting(); // Использование пользовательского хука для отслеживания состояния выхода.
  const [size, setSize] = useState({ width: 0, height: 0 });

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

  useEffect(() => {
    if (!isAutoPlayPaused) {
      const interval = setInterval(() => {
        nextSlide(); // Переход к следующему слайду
      }, 10000); // Интервал 10 секунд
      setIntervalId(interval); // Сохраняем идентификатор интервала в состоянии

      return () => clearInterval(interval); // Очищаем интервал при размонтировании или изменении состояния
    }
  }, [isAutoPlayPaused]); // Запуск эффекта при изменении состояния isAutoPlayPaused

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstImage(true); // Устанавливаем состояние, чтобы показать первое изображение
    }, 2000); // Задержка в 2 секунды

    return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
  }, []);

  const nextSlide = () => {
    if (isAnimationComplete) {
      // Проверяем, завершена ли анимация предыдущего слайда
      setIsTransitioning(true); // Устанавливаем состояние перехода
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1)); // Переходим к следующему слайду или возвращаемся к первому
      setIsAnimationComplete(false); // Сбрасываем состояние завершения анимации
      setIsAutoPlayPaused(true); // Приостанавливаем автопроигрывание
    }
  };

  const prevSlide = () => {
    if (isAnimationComplete) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1)); // Переходим к предыдущему слайду или к последнему
      setIsAnimationComplete(false);
      setIsAutoPlayPaused(true);
    }
  };

  const handleSlideChange = (index) => {
    if (isAnimationComplete && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index); // Устанавливаем выбранный слайд
      setIsAnimationComplete(false);
      setIsAutoPlayPaused(true);
    }
  };

  const onAnimationCompleteHandler = () => {
    setIsAnimationComplete(true); // Устанавливаем флаг завершения анимации
    setIsTransitioning(false); // Сбрасываем флаг перехода
    setIsAutoPlayPaused(false); // Возобновляем автопроигрывание
  };

  const imageStyles = () => {
    if (isMobile) {
      return {
        position: "absolute",
        gridColumnStart: "4",
        gridColumnEnd: "7",
        top: "20%",
        width: size.width,
        height: size.height,
      };
    } else if (isTablet) {
      return {
        position: "absolute",
        gridColumnStart: "3",
        gridColumnEnd: "6",
        top: "15%",
        width: size.width,
        height: size.height,
      };
    } else if (isDesktop) {
      return {
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
        bottom: "25%",
      };
    } else if (isTablet) {
      return {
        position: "absolute",
        gridColumnStart: "3",
        gridColumnEnd: "6",
        top: "15%",
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
        bottom: "5%",
      };
    } else if (isTablet) {
      return {
        position: "absolute",
        gridColumnStart: "3",
        gridColumnEnd: "6",
        top: "15%",
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

  // const containerStyle = isMobile
  //   ? { left: "60%", transform: "translateX(-50%)" }
  //   : { display: "grid" };

  return (
    <div className="z-30 absolute grid grid-cols-12 gap-2 h-full w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: "20%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={rightStyles()}
      >
        <motion.img
          src="/svg/right.svg"
          className="w-[92vw] h-[40vh] xl:h-[40vh]"
          animate={
            isExiting
              ? { x: 300, opacity: 0, transition: { duration: 0.5 } }
              : {}
          }
        />
        <div
          className="flex flex-col absolute right-2"
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
        initial={{ opacity: 0, x: "-20%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={leftStyles()}
      >
        <motion.img
          src="/svg/left.svg"
          className="w-[90vw] h-[40vh] xl:h-[50vh]"
          animate={
            isExiting
              ? { x: -300, opacity: 0, transition: { duration: 0.5 } }
              : {}
          }
        />
        <AnimatePresence>
          {(!isExiting || !isAnimationComplete) && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }} // При isExiting смещение влево и прозрачность 0
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="text-white"
              style={{
								width: "60%",
								position: "absolute",
								left: "2%", // Примерное смещение слева
							}}
              onAnimationComplete={onAnimationCompleteHandler}
            >
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: isAnimationComplete ? 1 : 0, // При смене слайда opacity 0
                  x: isExiting ? -300 : 0, // При isExiting смещение влево
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
								style={{
									marginTop: "10px", // Примерное смещение сверху
								}}
              >
                {slides[currentSlide].text1}
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: isAnimationComplete ? 1 : 0, // При смене слайда opacity 0
                  x: isExiting ? -300 : 0, // При isExiting смещение влево
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
								style={{
									marginTop: "10px", // Примерное смещение сверху
								}}
              >
                {slides[currentSlide].text2}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={imageStyles()}
          >
            {showFirstImage &&
              slides[currentSlide].images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image.url}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }}
                  exit={{
                    opacity: 0,
                    y: -50,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }}
                  className="w-full h-full"
                />
              ))}
          </motion.div>
        )}
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
