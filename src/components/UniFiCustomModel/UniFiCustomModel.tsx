import { FC, useEffect, useRef, useState } from "react";
import { TransformControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";
import { Select } from "@react-three/postprocessing";
import { useDisableOrbitControls } from "../../hooks/useDisableOrbitControls";
import { SelectableObjectProps } from "../../types/selectableObjects";

// Converted from USDZ to GLTF via blender since USDZ does not seem to have good support
export const UniFiCustomModel: FC<SelectableObjectProps> = ({
  orbitRef,
  selectedObject,
  onSelectHandler,
  position,
  ...props
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const transformRef = useRef<TransformControlsImpl>(null);

  const [active, setActive] = useState(false);

  // This reference will give us direct access to the mesh
  const { nodes } = useGLTF("/UniFi.gltf");
  nodes["Scene"].scale.set(0.1, 0.1, 0.1);

  useDisableOrbitControls(transformRef, orbitRef);

  useEffect(() => {
    if (selectedObject === meshRef.current?.uuid) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selectedObject]);

  return (
    <TransformControls
      ref={transformRef}
      position={position ?? [0, 0.5, 0]}
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
              onSelectHandler(meshRef.current ? meshRef.current.uuid : null);
            }}
            castShadow
            receiveShadow
            scale={[0.5, 0.5, 0.5]}
          >
            <primitive object={nodes["Scene"]} />
          </mesh>
        </Select>
      </group>
    </TransformControls>
  );
};

useGLTF.preload("/UniFi.gltf");
