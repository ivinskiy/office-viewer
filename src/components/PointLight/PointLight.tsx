import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { PointLightHelper } from "three";

export const PointLight = () => {
  const lightRef = useRef(null);
  useHelper(lightRef, PointLightHelper, 1, "red");
  return (
    <pointLight
      position={[3, 3, 3]}
      castShadow
      intensity={150}
      ref={lightRef}
    />
  );
};
