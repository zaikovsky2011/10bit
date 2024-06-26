"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { useSpring, animated } from "@react-spring/three";
import { easeExpOut } from "d3-ease";

const Planet = ({ initialPosition, finalPosition, controlPointOffset, initialScale, finalScale, animationDuration }) => {
  const planetRef = useRef();
  const { scene } = useGLTF("/assets/planet.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const existingMap = child.material.map;
        child.material = new MeshStandardMaterial({ 
          map: existingMap,
          color: "rgb(255, 0, 234)",
          opacity: 0.7, 
          transparent: true,
        });
      }
    });
  }, [scene]);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0015;
    }
  });

  // Контрольная точка для настройки дуги
  const controlPoint = [
    (initialPosition[0] + finalPosition[0]) / 2 + controlPointOffset,
    (initialPosition[1] + finalPosition[1]) / 2 + controlPointOffset,
    (initialPosition[2] + finalPosition[2]) / 2 + controlPointOffset,
  ];

  const { t } = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    config: { duration: animationDuration, easing: easeExpOut },
  });

  const position = t.to((t) => {
    const x = (1 - t) * (1 - t) * initialPosition[0] + 2 * (1 - t) * t * controlPoint[0] + t * t * finalPosition[0];
    const y = (1 - t) * (1 - t) * initialPosition[1] + 2 * (1 - t) * t * controlPoint[1] + t * t * finalPosition[1];
    const z = (1 - t) * (1 - t) * initialPosition[2] + 2 * (1 - t) * t * controlPoint[2] + t * t * finalPosition[2];
    return [x, y, z];
  });

  const { scale } = useSpring({
    from: { scale: initialScale },
    to: { scale: finalScale },
    config: { duration: animationDuration, easing: easeExpOut },
  });

  return <animated.primitive ref={planetRef} object={scene} position={position} scale={scale} />;
};

const RotatingPlanet = ({ containerRef }) => {
  const pivotRef = useRef();

  return (
    <div ref={containerRef} className="absolute z-20 w-full h-full">
      <Canvas alpha={true}>
        <group ref={pivotRef} rotation={[0, 0, -Math.PI / 6]}>
          <ambientLight intensity={4} color={"#6b108f"} />
          <directionalLight intensity={6.5} position={[-3.5, 1, 0]} color={"#f2cc36"} />
          <Planet
            initialPosition={[-3, -5, -10]} // начальная позиция
            finalPosition={[0, 0.5, 1.5]} // конечная позиция
            controlPointOffset={5} // параметр, управляющий кривизной дуги
            initialScale={[0.1, 0.1, 0.1]} // начальный масштаб
            finalScale={[1.8, 1.8, 1.8]} // конечный масштаб
            animationDuration={10000} // длительность анимации
          />
        </group>
      </Canvas>
    </div>
  );
};

export default RotatingPlanet;
