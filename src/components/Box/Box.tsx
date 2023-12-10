import { FC, useContext, useEffect, useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";
import { Select } from "@react-three/postprocessing";
import { useDisableOrbitControls } from "../../hooks/useDisableOrbitControls";
import { SelectableObjectProps } from "../../types/selectableObjects";
import { AdjustableLayerContext } from "../context/AdjustableLayerContext";

/**
 *
 * @param orbitRef: The ref to the camera controls (OrbitControls)
 * @param position: Initial position
 * @param uuid: Unique identifier
 * @returns A Box mesh with sizes 1, 1, 1, fully selecteable and transformable using TransformControls
 */
export const Box: FC<SelectableObjectProps> = ({
  orbitRef,
  position,
  uuid,
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
            uuid={uuid}
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
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
          </mesh>
        </Select>
      </group>
    </TransformControls>
  );
};
