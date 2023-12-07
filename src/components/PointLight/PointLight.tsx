import { TransformControls, useHelper } from "@react-three/drei";
import { useRef, useState } from "react";
import { DoubleSide, PointLightHelper } from "three";
import { useDisableOrbitControls } from "../../hooks/useDisableOrbitControls";

export const PointLight = ({ orbitRef }) => {
  const lightRef = useRef(null);
  const [active, setActive] = useState(false);

  const transformRef = useRef(null);

  useHelper(lightRef, PointLightHelper, 1, "red");

  useDisableOrbitControls(transformRef, orbitRef);

  return (
    <TransformControls
      position={[3, 3, 3]}
      ref={transformRef}
      showX={active}
      showY={active}
      showZ={active}
    >
      <group>
        <mesh
          onClick={() => {
            setActive((prev) => !prev);
          }}
        >
          <planeGeometry />
          <meshStandardMaterial
            wireframe={true}
            visible={false}
            side={DoubleSide}
          />
        </mesh>
        <pointLight
          castShadow
          intensity={150}
          ref={lightRef}
          onClick={() => {
            setActive((prev) => !prev);
          }}
        />
      </group>
    </TransformControls>
  );
};
