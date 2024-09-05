import { useEffect } from 'react';

const ResizeHandler = ({ setIsMobile, setIsTablet, setIsDesktop }) => {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth; // Получаем текущую ширину окна

      setIsMobile(width <= 768); // Если ширина меньше или равна 768px, то это мобильное устройство
      setIsTablet(width > 768 && width <= 1024); // Если ширина больше 768px и меньше или равна 1024px, то это планшет
      setIsDesktop(width > 1024); // Если ширина больше 1024px, то это десктоп
    };

    handleResize(); // Устанавливаем начальное состояние

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile, setIsTablet, setIsDesktop]);

  return null;
};

export default ResizeHandler;
