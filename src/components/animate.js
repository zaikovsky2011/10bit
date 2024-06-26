{/* <AnimatePresence>
        <motion.div
          key={`images-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="z-40"
          style={{
            display: "grid",
            position: "relative",
            gridColumnStart: "7",
            gridColumnEnd: "11",
          }}
        >
          {slides[currentSlide].images.map((image, index) => (
            <motion.img
              key={index}
              src={image.url}
              initial={image.initial}
              animate={image.animate}
              exit={image.exit}
              transition={image.transition}
              onAnimationComplete={onAnimationCompleteHandler}
            />
          ))}
        </motion.div>
      </AnimatePresence> */}