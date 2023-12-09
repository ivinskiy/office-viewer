import { CameraControls } from "@react-three/drei";
import { MeshProps, Vector3 } from "@react-three/fiber";

export type SelectableObjectProps = {
  orbitRef: React.MutableRefObject<CameraControls | null>;
  position?: Vector3;
};

export type SelectedObject = {
  uuid: string;
  type: string;
};
