import { Suspense, useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Box } from "./components/Box/Box";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { Plane } from "./components/Plane/Plane";
import {
  EffectComposer,
  Outline,
  Selection,
} from "@react-three/postprocessing";
import { PointLight } from "./components/PointLight/PointLight";
import { FloorPlan } from "./components/FloorPlan/FloorPlan";
import { UniFiCustomModel } from "./components/UniFiCustomModel/UniFiCustomModel";

function App() {
  const controlsRef = useRef<CameraControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  return (
    <div style={{ width: "100vw", height: "75vh" }}>
      <Canvas shadows={"basic"}>
        <PerspectiveCamera
          ref={cameraRef}
          position={[0, 5, 5]}
          rotation={[0, -Math.PI / 4, 0]}
          makeDefault
        />
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight />
        <PointLight orbitRef={controlsRef} />
        <directionalLight position={[10, 10, 10]} />
        <Selection>
          <EffectComposer multisampling={8} autoClear={false}>
            <Outline
              blur
              visibleEdgeColor={0xff0000}
              edgeStrength={100}
              width={1000}
              xRay={false}
            />
          </EffectComposer>
          <Box position={[-1.2, 0.5, 0]} orbitRef={controlsRef} />
          <Box position={[1.2, 0.5, 0]} orbitRef={controlsRef} />
          <Suspense>
            <UniFiCustomModel />
          </Suspense>
        </Selection>
        <Suspense>
          <FloorPlan />
        </Suspense>

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
