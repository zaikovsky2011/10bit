"use client";
import React, { useEffect } from 'react';
import { VscRocket, VscReport, VscGear, VscBriefcase, VscCallIncoming } from 'react-icons/vsc';
import { usePathname, useRouter } from 'next/navigation';
import useTransitionStore from './useTransitionStore'; // Подставьте свой путь, если нужно

export const navData = [
  { name: "home", path: "/", icon: <VscRocket /> },
  { name: "about", path: "/about", icon: <VscReport /> },
  { name: "services", path: "/services", icon: <VscGear /> },
  { name: "work", path: "/work", icon: <VscBriefcase /> },
  { name: "contact", path: "/contact", icon: <VscCallIncoming /> },
];

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { 
    toggleAnimateTransition, 
    setExitAnimationComplete, 
    setAnimateTransition,
    setIsTransitioning,
    isTransitioning,
    setIsInitialAnimationAllowed,
    isInitialAnimationAllowed 
  } = useTransitionStore(state => ({
    toggleAnimateTransition: state.toggleAnimateTransition,
    setExitAnimationComplete: state.setExitAnimationComplete,
    setAnimateTransition: state.setAnimateTransition,
    setIsTransitioning: state.setIsTransitioning,
    isTransitioning: state.isTransitioning,
    setIsInitialAnimationAllowed: state.setIsInitialAnimationAllowed,
    isInitialAnimationAllowed: state.isInitialAnimationAllowed,
  }));

  useEffect(() => {
    // Ensure the initial animation state is correctly set on mount
    setIsInitialAnimationAllowed(true);
    setAnimateTransition(JSON.parse(localStorage.getItem('animateTransition')) ?? true);
  }, []);

  const handleClick = (path) => {
    if (!isTransitioning) { // Проверка на переход
      toggleAnimateTransition(); // Запуск анимации exit
      setExitAnimationComplete(false); // Установка флага о начале анимации
      setIsTransitioning(true); // Установка флага, что переход начался
      setIsInitialAnimationAllowed(false); // Запрет запуска initial анимации

      const interval = setInterval(() => {
        if (useTransitionStore.getState().exitAnimationComplete) {
          clearInterval(interval);
          router.push(path);
          setIsTransitioning(false); // Сброс флага после завершения перехода

          // Ждем завершения загрузки нового раздела
          setTimeout(() => {
            setIsInitialAnimationAllowed(true); // Разрешение запуска initial анимации
            setAnimateTransition(true); // Запуск анимации initial после перехода
          }, 500); // Настройте время задержки по необходимости
        }
      }, 100);
    }
  };

  return (
    <nav className="flex flex-col bg-violet-800/60 items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:left z-50 top-0 w-full xl:w-[120px] xl:max-w-md xl:h-screen">
      <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 text-3xl xl:text-xl">
        {navData.map((link, index) => (
          <div
            key={index}
            onClick={() => handleClick(link.path)}
            className={`relative flex items-center group hover:text-accent transition-all duration-300`}
          >
            <div style={{ color: 'white' }}>
              {React.cloneElement(link.icon, { size: 50 })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
