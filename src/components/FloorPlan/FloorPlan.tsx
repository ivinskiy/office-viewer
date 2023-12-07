import { FC } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

/**
 *
 * @param props GroupProps (position etc)
 * @returns A Floor Plan model loaded from GLTF
 */
export const FloorPlan: FC<GroupProps> = (props) => {
  const { nodes } = useGLTF("/scan.gltf");
  nodes["FloorNode"].traverse((child) => {
    if (child.type === "Mesh") {
      child.receiveShadow = true;
      // To get floor to read lights
      (child as THREE.Mesh).geometry.computeVertexNormals();
    }
  });
  nodes["scan_1"].traverse((child) => {
    if (child.type === "Mesh") {
      child.receiveShadow = true;
      child.castShadow = true;
    }
  });
  return (
    <group
      {...props}
      dispose={null}
      position={[0, 1.5, -15]}
      rotation={[0, -Math.PI / 4, 0]}
    >
      <mesh>
        <primitive object={nodes["scan_1"]} />
      </mesh>
      <mesh receiveShadow>
        <primitive object={nodes["FloorNode"]} />
      </mesh>
    </group>
  );
};

useGLTF.preload("/scan.gltf");
