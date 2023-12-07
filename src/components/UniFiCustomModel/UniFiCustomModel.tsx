import { useRef, useState } from "react";
import { TransformControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";
import { Select } from "@react-three/postprocessing";
import { useDisableOrbitControls } from "../../hooks/useDisableOrbitControls";

// Converted from USDZ to GLTF via blender since USDZ does not seem to have good support
export const UniFiCustomModel = ({ orbitRef, position, ...props }) => {
  // This reference will give us direct access to the mesh
  const { nodes } = useGLTF("/UniFi.gltf");
  console.log(nodes);
  nodes["Scene"].scale.set(0.1, 0.1, 0.1);

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
            scale={[0.5, 0.5, 0.5]}
          >
            <primitive object={nodes["Scene"]} />
          </mesh>
        </Select>
      </group>
    </TransformControls>
  );
};
