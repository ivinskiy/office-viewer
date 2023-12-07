import { FC, useEffect, useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";
import { Select } from "@react-three/postprocessing";
import { useDisableOrbitControls } from "../../hooks/useDisableOrbitControls";
import { SelectableObjectProps } from "../../types/selectableObjects";

export const Box: FC<SelectableObjectProps> = ({
  orbitRef,
  selectedObject,
  onSelectHandler,
  position,
  ...props
}) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const transformRef = useRef<TransformControlsImpl>(null);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (selectedObject === meshRef.current?.uuid) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selectedObject]);

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
              onSelectHandler(meshRef.current ? meshRef.current.uuid : null);
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
