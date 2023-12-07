import { TransformControls, useHelper } from "@react-three/drei";
import { FC, useEffect, useRef, useState } from "react";
import {
  DirectionalLightHelper,
  DoubleSide,
  DirectionalLight as THREEDirectionalLight,
} from "three";
import { useDisableOrbitControls } from "../../hooks/useDisableOrbitControls";
import { SelectableObjectProps } from "../../types/selectableObjects";

export const DirectionalLight: FC<SelectableObjectProps> = ({
  orbitRef,
  selectedObject,
  onSelectHandler,
  position,
}) => {
  const lightRef = useRef<THREEDirectionalLight>(null);
  const [active, setActive] = useState(false);

  const transformRef = useRef(null);

  // Typescript is not happy with this despite the docs
  // @ts-ignore
  useHelper(lightRef, DirectionalLightHelper, 1, "green");

  useDisableOrbitControls(transformRef, orbitRef);

  useEffect(() => {
    if (selectedObject === lightRef.current?.uuid) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selectedObject]);

  return (
    <TransformControls
      ref={transformRef}
      position={position}
      showX={active}
      showY={active}
      showZ={active}
    >
      <group>
        <mesh
          onClick={() => {
            onSelectHandler(lightRef.current ? lightRef.current.uuid : null);
          }}
        >
          <planeGeometry />
          <meshStandardMaterial
            wireframe={true}
            visible={false}
            side={DoubleSide}
          />
        </mesh>
        <directionalLight castShadow ref={lightRef} />
      </group>
    </TransformControls>
  );
};
