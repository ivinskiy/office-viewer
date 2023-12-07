import { CameraControls } from "@react-three/drei";
import { MeshProps, Vector3 } from "@react-three/fiber";

export type SelectableObjectProps = {
  orbitRef: React.MutableRefObject<CameraControls | null>;
  selectedObject: string | null;
  onSelectHandler: (uuid: string | null) => void;
  position?: Vector3;
};
