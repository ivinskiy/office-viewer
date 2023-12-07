import { CameraControls } from "@react-three/drei";
import { useEffect } from "react";
import { TransformControls as TransformControlsImpl } from "three-stdlib";

export const useDisableOrbitControls = (
  transformRef: React.RefObject<TransformControlsImpl<THREE.Camera>>,
  orbitRef: React.MutableRefObject<CameraControls | null>
) => {
  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current;
      const callback = (event: THREE.Event) => {
        console.log(event);
        //@ts-ignore
        orbitRef.current.enabled = !event.value;
      };
      controls.addEventListener("dragging-changed", callback);
      return () => {
        controls.removeEventListener("dragging-changed", callback);
      };
    }
  });
};
