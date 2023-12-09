import { FC, useContext, useEffect, useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";
import { Select } from "@react-three/postprocessing";
import { useDisableOrbitControls } from "../../hooks/useDisableOrbitControls";
import { SelectableObjectProps } from "../../types/selectableObjects";
import { AdjustableLayerContext } from "../context/AdjustableLayerContext";

export const Box: FC<SelectableObjectProps> = ({
  orbitRef,
  position,
  ...props
}) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const transformRef = useRef<TransformControlsImpl>(null);

  const [selectedObject, setSelectedObject] = useContext(
    AdjustableLayerContext
  );

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (selectedObject?.object?.uuid === meshRef.current?.uuid) {
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
              if (transformRef.current) {
                setSelectedObject({
                  object: meshRef.current,
                  transform: transformRef.current,
                });
              }
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
