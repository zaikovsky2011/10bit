"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useOnScreenStore from "./useOnScreenStore";

const animationVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 50 },
  exit: { opacity: 0, height: 0 },
};

const HorizontalMenu = ({ sections, handleScroll }) => {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const visibleId = useOnScreenStore((state) => state.visibleId);

  useEffect(() => {
    if (visibleId) {
      sections.forEach((section, sectionIndex) => {
        section.content.forEach((link, contentIndex) => {
          if (link.props["data-id"] === visibleId) {
            setSelectedSectionIndex(sectionIndex);
            setActiveContentIndex(contentIndex);
          }
        });
      });
    }
  }, [visibleId, sections]);

  const selectSection = (index) => {
    setSelectedSectionIndex(index);
    setActiveContentIndex(0);

    const firstContentId = sections[index].content[0].props["data-id"];
    handleScroll(firstContentId);
  };

  const selectContent = (index, id) => {
    setActiveContentIndex(index);
    handleScroll(id);
  };

  return (
    <div className="flex flex-col items-center w-full text-white">
      <div className="flex bg-violet-800 justify-center w-full rounded-t-lg shadow-md">
        {sections.map((section, index) => (
          <div
            key={index}
            className="cursor-pointer w-1/3"
            onClick={() => selectSection(index)}
          >
            <div className="flex flex-col items-center p-4 text-center">
              <motion.div
                initial={false}
                animate={{
                  scale: selectedSectionIndex === index ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div>{section.icon}</div>
              </motion.div>
              <div className="mt-2 xl:font-bold">{section.title}</div>
            </div>
          </div>
        ))}
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animationVariants}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex items-start"
      >
        <div className="flex items-center">
          {sections[selectedSectionIndex].content.map((link, idx) => (
            <div
              key={idx}
              className={`cursor-pointer w-[30vw] h-[55px] ${
                activeContentIndex === idx ? "bg-violet-800 shadow-md" : "text-white"
              } text-center flex items-center justify-center rounded-b-lg`}
              onClick={() => selectContent(idx, link.props["data-id"])}
            >
              {link}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HorizontalMenu;
