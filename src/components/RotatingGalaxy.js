"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial } from "three";

const Galaxy = () => {
  const galaxyRef = useRef();
  const obj = useLoader(OBJLoader, "/assets/galaxy.obj"); // Update the path to your 3D model file

  useEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        // Get the existing texture from the material
        const existingMap = child.material.map;

        // Change the material to use the existing texture and add a color overlay
        child.material = new MeshStandardMaterial({
          map: existingMap,
          color: "rgb(255, 0, 234)", // Red color overlay
          opacity: 0.8,
          transparent: true,
        });
      }
    });
  }, [obj]);

  useFrame(() => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.001; // Adjust rotation speed as needed
    }
  });

  return <primitive ref={galaxyRef} object={obj} scale={2.5} />;
};

const RotatingGalaxy = ({ containerRef }) => {
  const pivotRef = useRef();

  return (
    <div ref={containerRef} className="absolute z-20 w-full h-full">
      <Canvas alpha={true}>
        <group ref={pivotRef} rotation={[0, 0, -Math.PI / 6]}> {/* Adjust rotation as needed */}
          <ambientLight intensity={4} color={"#6b108f"} />
          <directionalLight intensity={6.5} position={[-3.5, 1, 0]} color={"#f2cc36"} />
          <Galaxy />
        </group>
      </Canvas>
    </div>
  );
};

export default RotatingGalaxy;
