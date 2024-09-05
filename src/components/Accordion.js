"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { VscDebugStart } from "react-icons/vsc";

const Accordion = ({ sections }) => {
  const [openSectionIndex, setOpenSectionIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenSectionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex">
      <div className="flex flex-col ml-[2%] w-[30vw] max-h-[70vh] text-white">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="flex flex-col m-4 items-center justify-center"
            onHoverStart={() => setHoverIndex(index)}
            onHoverEnd={() => setHoverIndex(null)}
          >
            <motion.header
              onClick={() => toggleSection(index)}
              initial={false}
              animate={{
                backgroundColor:
                  openSectionIndex === index
                    ? "rgba(255, 0, 136, 0.7)"
                    : "rgba(57, 27, 118, 0.7)",
              }}
              className={`flex w-full h-[50px] items-center justify-center shadow-box ${
                openSectionIndex === index ? "rounded-t-lg" : "rounded-lg"
              }`}
            >
              <div className="flex w-2/6 h-full font-bold justify-center">
                <motion.div
                  animate={{
                    scale: openSectionIndex === index || hoverIndex === index ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-end"
                >
                  {section.icon}
                </motion.div>
              </div>
              <div className="flex w-3/6 h-full font-bold justify-left">
                <div className="flex items-center">{section.title}</div>
              </div>
              <div className="flex w-1/6 h-full font-bold justify-left">
                <div className="flex items-center">
                  {openSectionIndex === index ? (
                    <VscDebugStart className="w-[30px] h-[30px] rotate-90" />
                  ) : (
                    <VscDebugStart className="w-[30px] h-[30px]" />
                  )}
                </div>
              </div>
            </motion.header>
            <motion.section
              initial="collapsed"
              animate={openSectionIndex === index ? "open" : "collapsed"}
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className={`flex flex-col bg-white/10 text-white h-full w-full items-center justify-center ${
                openSectionIndex === index ? "rounded-b-lg" : ""
              }`}
            >
              {section.content.map((link, idx) => (
                <div key={idx} className="m-3">
                  {link}
                </div>
              ))}
            </motion.section>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
