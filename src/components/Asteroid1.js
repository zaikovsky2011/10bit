"use client"
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Asteroid1 = ({ containerRef }) => {
  const pivotRef = useRef();
  const { scene } = useGLTF("/assets/asteroid1.glb");

  return (
    <div ref={containerRef} className="absolute z-20 w-full h-full">
      <Canvas alpha={true}>
        <group ref={pivotRef} rotation={[0, 0, -Math.PI / 6]}>
          <ambientLight intensity={4} />
          <directionalLight intensity={6.5} position={[-3.5, 1, 0]} />
          <pointLight position={[0, 5, 5]} intensity={1.5} />
          <primitive object={scene} />
          <Planet pivotRef={pivotRef} />
        </group>
      </Canvas>
    </div>
  );
};

const Planet = ({ pivotRef }) => {
  useFrame(() => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y += 0.001; // Adjust rotation speed as needed
    }
  });

  return null;
};

export default Asteroid1;
