"use client";

import { motion } from "framer-motion";

const FullscreenImage = () => {
  return (
    <div style={{
      position: 'fixed',  // фиксирует положение на экране
      top: 0,             // привязывает верхнюю часть к началу экрана
      left: 0,            // привязывает левую часть к началу экрана
      width: '100vw',     // устанавливает ширину на 100% ширины окна
      height: '100vh',    // устанавливает высоту на 100% высоты окна
      overflow: 'hidden', // скрывает переполнение содержимого
      zIndex: -1          // помещает элемент позади других элементов
    }}>
      <motion.img
        src="/image2.jpg"
        alt="Fullscreen Image"
        style={{ 
          objectFit: 'cover',  // масштабирует изображение до покрытия всего контейнера
          width: '100%',       // устанавливает ширину изображения на 100% ширины контейнера
          height: '100%'       // устанавливает высоту изображения на 100% высоты контейнера
        }}
        initial={{ filter: 'saturate(1) hue-rotate(0deg) brightness(1) contrast(1)' }}
        animate={{ 
          filter: [
            'saturate(1) hue-rotate(0deg) brightness(1.2) contrast(1)',
            'saturate(1.2) hue-rotate(15deg) brightness(1.1) contrast(1.1)',
            'saturate(1.3) hue-rotate(30deg) brightness(1) contrast(1.2)',
          ],
          opacity: [0.75, 0.8, 0.85], // Пример значений прозрачности для каждого ключевого кадра
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: 'reverse',
          times: [0, 0.5, 1]  // Настройка времени для ключевых кадров
        }}
      />
    </div>
  );
};

export default FullscreenImage;
