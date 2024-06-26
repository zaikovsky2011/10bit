import { motion, AnimatePresence } from "framer-motion";

const ImageSlider = ({ currentSlide, slides }) => {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={currentSlide}
        className="absolute w-full h-full flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {slides[currentSlide].images.map((image, index) => (
          <motion.img
            key={index}
            src={image.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute"
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageSlider;
