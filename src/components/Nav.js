"use client";

import React from "react";
import { VscRocket, VscReport, VscGear, VscBriefcase, VscCallIncoming } from "react-icons/vsc";
import { useRouter, usePathname } from "next/navigation";
import { useExiting } from "./ExitingContext";

// nav data
export const navData = [
  { name: "home", path: "/", icon: <VscRocket /> },
  { name: "about", path: "/about", icon: <VscReport /> },
  { name: "services", path: "/services", icon: <VscGear /> },
  { name: "work", path: "/work", icon: <VscBriefcase /> },
  {
    name: "contact",
    path: "/contact",
    icon: <VscCallIncoming />,
  },
];

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsExiting } = useExiting();

  const handleLinkClick = (e, path) => {
    if (path === pathname) {
      e.preventDefault(); // Prevent default action if link is for the current page
      return;
    }
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      router.push(path);
      setTimeout(() => {
        setIsExiting(false); // Сбросить isExiting через 2 секунды после перехода
      }, 2000);
    }, 700);
  };

  return (
    <nav className="flex flex-col bg-violet-800/60 shadow-inner items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:left z-50 top-0 w-full xl:w-[120px] xl:max-w-md xl:h-screen">
      <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 text-3xl xl:text-xl">
        {navData.map((link, index) => (
          <a
            className={`${
              link.path === pathname && "text-accent"
            } relative flex items-center group hover:text-accent transition-all duration-300`}
            href={link.path}
            onClick={(e) => handleLinkClick(e, link.path)}
            key={index}
          >
            <div className="absolute pr-14 right-0 hidden xl:group-hover:flex">
              <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                <div className="text-[12px] leading-none font-semibold capitalize">
                  {link.name}
                </div>
                <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"></div>
              </div>
            </div>
            <div style={{ color: "white" }}>
              {React.cloneElement(link.icon, { size: 50 })}
            </div>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
