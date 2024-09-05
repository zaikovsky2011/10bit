"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Accordion from "@/components/Accordion";
import { VscEdit, VscTools, VscGlobe } from "react-icons/vsc";
import useTransitionStore from "./useTransitionStore";
import HorizontalMenu from "@/components/HorizontalMenu";
import ResizeHandler from "./ResizeHandler";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "../components/overlayscrollbars.css";

const animationVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const Services = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { animateTransition, setExitAnimationComplete } = useTransitionStore(
    (state) => ({
      animateTransition: state.animateTransition,
      setExitAnimationComplete: state.setExitAnimationComplete,
    })
  );

  const sections = [
    {
      title: "Создание сайтов",
    content: [
      <motion.a
        key="Одностраничные сайты"
        onClick={() => handleScroll("odnostranichnye-sayty")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-id="odnostranichnye-sayty"
        >
          Одностраничные сайты
        </motion.a>,
        <motion.a
				key="Корпоративные сайты"
        onClick={() => handleScroll("korporativnye-sayty")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-id="korporativnye-sayty"
        >
          Корпоративные сайты
        </motion.a>,
        <motion.a
				key="Сайты-каталоги"
        onClick={() => handleScroll("sayty-katalogi")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-id="sayty-katalogi"
        >
          Сайты-каталоги
        </motion.a>,
      ],
      icon: <VscEdit size={isMobile ? 45 : isTablet ? 50 : 65} />,
    },
    {
      title: "Сервисное обслуживание",
      content: [
        <motion.a
				key="link4"
        onClick={() => handleScroll("pochemu-vybirayut-nas")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-id="pochemu-vybirayut-nas"
        >
          Почему выбирают нас
        </motion.a>,
        <motion.a
				key="link5"
        onClick={() => handleScroll("nachnite-s-nami")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-id="nachnite-s-nami"
        >
          Начните с нами
        </motion.a>,
      ],
      icon: <VscTools size={isMobile ? 45 : isTablet ? 50 : 65} />,
    },
    {
      title: "Продвижение",
      content: [
        <motion.a
          key="link6"
          href="#"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Link 6
        </motion.a>,
      ],
      icon: <VscGlobe size={isMobile ? 45 : isTablet ? 50 : 65} />,
    },
  ];
	
	const handleScroll = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

  return (
    <>
      <ResizeHandler
        setIsMobile={setIsMobile}
        setIsTablet={setIsTablet}
        setIsDesktop={setIsDesktop}
      />
      <div className="z-40 absolute inset-0 flex mt-4 xl:mt-0 justify-center xl:items-center xl:ml-[120px] overflow-hidden">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => setExitAnimationComplete(true)}
        >
          {animateTransition && (
            <motion.div
              className="bg-violet-800/70 w-[90vw] h-[85vh] xl:h-[90vh] rounded-lg flex flex-col shadow-box"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="md:hidden bg-violet-900/70 w-full rounded-t-lg">
                <HorizontalMenu sections={sections} handleScroll={handleScroll} />
              </div>
              <div className="flex overflow-hidden">
                <div className="hidden w-[20vw] xl:block mt-8">
                  <Accordion sections={sections} />
                </div>
                <div className="bg-violet-800/70 flex xl:m-8 m-4 rounded-lg shadow-box">
                  <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                    <OverlayScrollbarsComponent
                      options={{
                        className: "os-theme-dark",
                        resize: "none",
                        sizeAutoCapable: true,
                        paddingAbsolute: true,
                        autoUpdate: true,
                        scrollbars: {
                          visibility: "auto",
                          autoHide: "leave",
                          autoHideDelay: 800,
                          dragScroll: true,
                          clickScroll: true,
                          touchSupport: true,
                          snapHandle: true,
                        },
                      }}
                      style={{ height: "100%", width: "100%" }}
                    >
                      {children}
                    </OverlayScrollbarsComponent>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Services;
