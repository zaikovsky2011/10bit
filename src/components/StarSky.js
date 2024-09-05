"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const StarSky = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();

    // scene.background = new THREE.Color(0x000000);

    // const loader = new THREE.TextureLoader();
    // loader.load(
    //   "image2.jpg", // Укажите путь к вашему изображению здесь
    //   function (texture) {
    //     scene.background = texture; // Устанавливаем изображение в качестве фона
    //   },
    //   undefined,
    //   function (err) {
    //     console.error("Произошла ошибка при загрузке текстуры фона", err);
    //   }
    // );

    const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 700);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    currentMount.appendChild(renderer.domElement);

    // Создаем звезды
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffe8bb });
    const starVertices = [];

    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 1000;

    const animate = () => {
      requestAnimationFrame(animate);

      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Функция для обновления размеров камеры и рендерера при изменении размера окна
    const onWindowResize = () => {
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      currentMount.removeChild(renderer.domElement);
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return <div ref={mountRef} className="absolute z-10 w-full h-full" />;
};

export default StarSky;
