import { Suspense, useRef, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import {
  EffectComposer,
  Outline,
  Selection,
} from "@react-three/postprocessing";
import { Box } from "./components/Box/Box";
import { PointLight } from "./components/PointLight/PointLight";
import { FloorPlan } from "./components/FloorPlan/FloorPlan";
import { UniFiCustomModel } from "./components/UniFiCustomModel/UniFiCustomModel";
import { DirectionalLight } from "./components/DirectionalLight/DirectionalLight";

function App() {
  const controlsRef = useRef<CameraControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);

  const onSelectHandler = (uuid: string | null) => {
    if (!selectedObject) {
      setSelectedObject(uuid);
    } else {
      setSelectedObject((prev) => {
        if (prev === uuid) {
          return null;
        } else {
          return uuid;
        }
      });
    }
  };

  return (
    <div style={{ width: "100vw", height: "75vh" }}>
      <Canvas
        shadows={"basic"}
        onPointerMissed={() => {
          setSelectedObject(null);
        }}
      >
        <PerspectiveCamera
          ref={cameraRef}
          position={[0, 5, 5]}
          rotation={[0, -Math.PI / 4, 0]}
          makeDefault
        />
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight />
        <PointLight
          position={[3, 3, 3]}
          orbitRef={controlsRef}
          selectedObject={selectedObject}
          onSelectHandler={onSelectHandler}
        />
        <DirectionalLight
          position={[10, 10, 10]}
          orbitRef={controlsRef}
          selectedObject={selectedObject}
          onSelectHandler={onSelectHandler}
        />
        <Selection>
          <EffectComposer multisampling={8} autoClear={false}>
            <Outline
              blur
              visibleEdgeColor={0x006eff}
              edgeStrength={100}
              width={1000}
              xRay={false}
            />
          </EffectComposer>
          <Box
            position={[-1.2, 0.5, 0]}
            orbitRef={controlsRef}
            selectedObject={selectedObject}
            onSelectHandler={onSelectHandler}
          />
          <Box
            position={[1.2, 0.5, 0]}
            orbitRef={controlsRef}
            selectedObject={selectedObject}
            onSelectHandler={onSelectHandler}
          />
          <Suspense>
            <UniFiCustomModel
              position={[0, 0.5, 0]}
              orbitRef={controlsRef}
              selectedObject={selectedObject}
              onSelectHandler={onSelectHandler}
            />
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
