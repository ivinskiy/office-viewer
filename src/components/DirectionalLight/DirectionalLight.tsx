import { TransformControls, useHelper } from "@react-three/drei";
import { FC, useContext, useEffect, useRef, useState } from "react";
import {
  DirectionalLightHelper,
  DoubleSide,
  DirectionalLight as THREEDirectionalLight,
} from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";

import { useDisableOrbitControls } from "../../hooks/useDisableOrbitControls";
import { SelectableObjectProps } from "../../types/selectableObjects";
import { AdjustableLayerContext } from "../context/AdjustableLayerContext";

export const DirectionalLight: FC<SelectableObjectProps> = ({
  orbitRef,
  position,
  uuid,
}) => {
  const lightRef = useRef<THREEDirectionalLight>(null);
  const [active, setActive] = useState(false);

  const transformRef = useRef<TransformControlsImpl>(null);

  const [selectedObject, setSelectedObject] = useContext(
    AdjustableLayerContext
  );

  // Typescript is not happy with this despite the docs
  // @ts-ignore
  useHelper(lightRef, DirectionalLightHelper, 1, "green");

  useDisableOrbitControls(transformRef, orbitRef);

  useEffect(() => {
    if (selectedObject?.object?.uuid === lightRef.current?.uuid) {
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
            if (transformRef.current) {
              setSelectedObject({
                object: lightRef.current,
                transform: transformRef.current,
              });
            }
          }}
        >
          <planeGeometry />
          <meshStandardMaterial
            wireframe={true}
            visible={false}
            side={DoubleSide}
          />
        </mesh>
        <directionalLight castShadow ref={lightRef} uuid={uuid} />
      </group>
    </TransformControls>
  );
};
