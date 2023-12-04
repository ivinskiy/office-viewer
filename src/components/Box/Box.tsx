import { useEffect, useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";
import {
  Selection,
  Select,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

export const Box = ({ orbitRef, position, ...props }) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const transformRef = useRef<TransformControlsImpl>(null);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // Return view, these are regular three.js elements expressed in JSX

  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current;
      const callback = (event: THREE.Event) => {
        //@ts-ignore
        orbitRef.current.enabled = !event.value;
      };
      controls.addEventListener("dragging-changed", callback);
      return () => {
        controls.removeEventListener("dragging-changed", callback);
      };
    }
  });

  return (
    <TransformControls
      ref={transformRef}
      position={position}
      showX={active}
      showY={active}
      showZ={active}
      onObjectChange={() => {
        console.log(groupRef.current);
        if (
          transformRef.current &&
          groupRef.current?.parent &&
          groupRef.current?.parent?.position.y < 0.5
        ) {
          groupRef.current.parent.position.y = 0.5;
        }
      }}
    >
      <group ref={groupRef}>
        <Select enabled={active}>
          <mesh
            {...props}
            ref={meshRef}
            onClick={() => {
              setActive(!active);
            }}
            castShadow
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
          </mesh>
        </Select>
      </group>
    </TransformControls>
  );
};
