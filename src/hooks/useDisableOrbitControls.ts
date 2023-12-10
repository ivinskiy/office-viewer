import { CameraControls } from "@react-three/drei";
import { useEffect } from "react";
import { TransformControls as TransformControlsImpl } from "three-stdlib";

type CustomEvent = THREE.Event & { value: boolean };

/**
 *
 * @param transformRef: A reference to the transform controls of the object
 * @param orbitRef A reference to the orbit controls of the whole scene / application
 *
 * Custom hook that disables the orbit controls when you are dragging the transform controls
 */
export const useDisableOrbitControls = (
  transformRef: React.RefObject<TransformControlsImpl<THREE.Camera>>,
  orbitRef: React.MutableRefObject<CameraControls | null>
) => {
  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current;
      const callback = (event: THREE.Event) => {
        if (orbitRef.current)
          orbitRef.current.enabled = !(event as CustomEvent).value;
      };
      controls.addEventListener("dragging-changed", callback);
      return () => {
        controls.removeEventListener("dragging-changed", callback);
      };
    }
  });
};
