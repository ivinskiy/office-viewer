import { useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";
import { Select } from "@react-three/postprocessing";
import { useDisableOrbitControls } from "../../hooks/useDisableOrbitControls";

export const Box = ({ orbitRef, position, ...props }) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const transformRef = useRef<TransformControlsImpl>(null);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useDisableOrbitControls(transformRef, orbitRef);

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
      castShadow
    >
      <group ref={groupRef} castShadow>
        <Select enabled={active} castShadow>
          <mesh
            {...props}
            ref={meshRef}
            onClick={() => {
              setActive(!active);
            }}
            castShadow
            receiveShadow
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
