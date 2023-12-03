import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Box } from "./components/Box/Box";
import {
  CameraControls,
  OrbitControls,
  PerspectiveCamera,
  Plane,
} from "@react-three/drei";
import * as THREE from "three";

function App() {
  const [count, setCount] = useState(0);
  const controlsRef = useRef<CameraControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  return (
    <div style={{ width: "100vw", height: "75vh" }}>
      <Canvas>
        <PerspectiveCamera
          ref={cameraRef}
          position={[0, 5, 5]}
          rotation={[0, -Math.PI / 4, 0]}
          makeDefault
        />
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Plane
          rotation={[-Math.PI / 2, 0, 0]}
          args={[10, 10]}
          material={new THREE.MeshBasicMaterial({ color: "green" })}
        />
        <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2 - 0.1} />
      </Canvas>
      <button
        onClick={() => {
          if (controlsRef.current && cameraRef.current) {
            controlsRef.current.moveTo(0, 0, 0);
            controlsRef.current.polarAngle = Math.PI / 2 - 0.1;
            cameraRef.current.zoom = 2;
          }
        }}
      >
        Reset Camera Position
      </button>
      <div style={{ height: "25vh", width: "100vw" }}></div>
    </div>
  );
}

export default App;
