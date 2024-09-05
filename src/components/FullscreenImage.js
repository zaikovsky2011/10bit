"use client";

import { motion } from "framer-motion";
import ResizeHandler from "./ResizeHandler";
import { useState } from "react";

const FullscreenImage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const getImageSrc = () => {
    if (isMobile) return "/imagemobile.jpg";
    if (isTablet) return "/imagetablet.jpg";
    return "/imagedesktop.jpg";
  };

  return (
    <>
      <ResizeHandler
        setIsMobile={setIsMobile}
        setIsTablet={setIsTablet}
        setIsDesktop={setIsDesktop}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1
      }}>
        <motion.img
          src={getImageSrc()}
          alt="Fullscreen Image"
          style={{ 
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
          initial={isDesktop ? { filter: 'saturate(1) hue-rotate(0deg) brightness(1) contrast(1)' } : {}}
          animate={isDesktop ? { 
            filter: [
              'saturate(1) hue-rotate(0deg) brightness(1.2) contrast(1)',
              'saturate(1.2) hue-rotate(15deg) brightness(1.1) contrast(1.1)',
              'saturate(1.3) hue-rotate(30deg) brightness(1) contrast(1.2)',
            ],
            opacity: [0.75, 0.8, 0.85],
          } : {}}
          transition={isDesktop ? { 
            duration: 10, 
            repeat: Infinity, 
            repeatType: 'reverse',
            times: [0, 0.5, 1]
          } : {}}
        />
      </div>
    </>
  );
};

export default FullscreenImage;
