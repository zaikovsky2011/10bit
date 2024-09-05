"use client";
import React from "react";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import useOnScreen from "../../components/useOnScreen";
import useOnScreenStore from "../../components/useOnScreenStore";


const Services = () => {
  const setVisibleId = useOnScreenStore((state) => state.setVisibleId);

  const sectionRefs = {
    "Odnostranichnye-sayty": useRef(null),
    "korporativnye-sayty": useRef(null),
    "sayty-katalogi": useRef(null),
    "pochemu-vybirayut-nas": useRef(null),
    "nachnite-s-nami": useRef(null),
  };

  Object.keys(sectionRefs).forEach((id) => {
    const isVisible = useOnScreen(sectionRefs[id], "0% 0px -10% 0px"); // Adjust the rootMargin as needed
    useEffect(() => {
      if (isVisible) {
        setVisibleId(id);
      }
    }, [isVisible, id, setVisibleId]);
  });

  return (
    <div className="mt-5">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
            delay: 1,
          },
        }}
        exit={{
          opacity: 0,
          y: 50,
          transition: { duration: 1, ease: "easeOut" },
        }}
        className="relative float-left ml-10 mr-10 mb-10 top-0 left-0 h-80"
      >
        <motion.img
          src="/svg/landing/01.svg"
          alt="SVG image"
          className="w-full h-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.img
          src="/svg/landing/02.svg"
          alt="SVG image"
          className="absolute h-40 w-40 bottom-20 left-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        />
        <motion.img
          src="/svg/landing/03.svg"
          alt="SVG image"
          className="absolute h-40 w-40 bottom-0 right-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        />
      </motion.div>
			<div className="text-white p-4">
        <h1 id="odnostranichnye-sayty" ref={sectionRefs["odnostranichnye-sayty"]} className="text-2xl font-bold mb-4">
          Одностраничные сайты
        </h1>
        <p className="mb-4">
				Идеальный выбор для быстрого и эффективного представления вашего бизнеса, продукта или услуги. Одностраничные сайты подходят для проведения рекламных кампаний, акций и специальных предложений. Мы создаем современные, привлекательные и функциональные лендинги с анимацией, которые привлекают внимание и побуждают к действию.
        </p>
        <h1 id="korporativnye-sayty" ref={sectionRefs["korporativnye-sayty"]} className="text-2xl font-bold mb-4">
          Корпоративные сайты
        </h1>
        <p className="mb-4">
				Для компаний, которым необходимо представить большой объем информации, мы разрабатываем корпоративные сайты. Они включают в себя множество разделов, такие как информация о компании, продуктах и услугах, новости, блоги, и многое другое. Мы создаем удобные и интуитивно понятные сайты с современной анимацией, которые помогают эффективно взаимодействовать с клиентами и партнерами.
        </p>
        <h1 id="sayty-katalogi" ref={sectionRefs["sayty-katalogi"]} className="text-2xl font-bold mb-4">
          Сайты-каталоги
        </h1>
        <p className="mb-4">
				Если ваш бизнес требует представления большого количества товаров или услуг, сайты-каталоги станут идеальным решением. Мы разрабатываем каталоги с удобной навигацией и мощными инструментами поиска, что позволяет вашим клиентам легко находить нужные товары и делать заказы. Современная анимация делает использование сайтов еще более приятным, а размещение на наших серверах обеспечивает стабильную работу и высокую скорость загрузки.
        </p>
        <h1 id="pochemu-vybirayut-nas" ref={sectionRefs["pochemu-vybirayut-nas"]} className="text-2xl font-bold mb-4">
          Почему выбирают нас
        </h1>
        <p className="mb-4">
				Индивидуальный подход: Мы внимательно изучаем потребности каждого клиента и предлагаем решения, которые идеально соответствуют их требованиям.
        </p>
        <h2 id="nachnite-s-nami" ref={sectionRefs["nachnite-s-nami"]} className="text-xl font-bold mb-4">
          Начните с нами
        </h2>
        <p>
				Свяжитесь с нами сегодня, чтобы обсудить ваш проект. Мы с радостью поможем вам создать сайт, который будет работать на вас и принесет желаемые результаты.

        </p>
      </div>
    </div>
  );
};

export default Services;