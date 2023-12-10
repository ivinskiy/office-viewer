import { Suspense, useContext, useRef, useState } from "react";
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
import { Card } from "./components/Card/Card";
import { AdjustableLayerContext } from "./components/context/AdjustableLayerContext";
import { AmbientLight } from "three";
import { Modal } from "./components/Modal/Modal";
import { PlaceItemsButton } from "./components/PlaceItemsButton/PlaceItemsButton";

function App() {
  const [objectsInScene, setObjectsInScene] = useState<
    {
      type: "UniFi" | "Box" | "PointLight" | "DirectionalLight";
      uuid: string;
    }[]
  >([]);
  const [placeItemsModalsIsToggled, setPlaceItemsModalIsToggled] =
    useState(false);
  const controlsRef = useRef<CameraControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [ambientLight, setAmbientLight] = useState<AmbientLight | null>(null);

  const [, setSelectedObject] = useContext(AdjustableLayerContext);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Canvas
        shadows={"basic"}
        onPointerMissed={() => {
          setSelectedObject(null);
          setPlaceItemsModalIsToggled(false);
        }}
      >
        <PerspectiveCamera
          ref={cameraRef}
          position={[0, 5, 5]}
          rotation={[0, -Math.PI / 4, 0]}
          makeDefault
        />
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight ref={setAmbientLight} />
        <Selection>
          <PointLight position={[3, 3, 3]} orbitRef={controlsRef} uuid={"1"} />
          <DirectionalLight
            position={[5, 5, -5]}
            orbitRef={controlsRef}
            uuid={"2"}
          />
          <EffectComposer multisampling={8} autoClear={false}>
            <Outline
              blur
              visibleEdgeColor={0x006eff}
              edgeStrength={100}
              width={1000}
              xRay={false}
            />
          </EffectComposer>
          {objectsInScene.map((object) => {
            switch (object.type) {
              case "UniFi":
                return (
                  <Suspense>
                    <UniFiCustomModel
                      position={[0, 0.5, 0]}
                      orbitRef={controlsRef}
                      uuid={object.uuid}
                    />
                  </Suspense>
                );
              case "PointLight":
                return (
                  <PointLight
                    position={[0, 3, 0]}
                    orbitRef={controlsRef}
                    uuid={object.uuid}
                  />
                );
              case "DirectionalLight":
                return (
                  <DirectionalLight
                    position={[-3, 3, 3]}
                    orbitRef={controlsRef}
                    uuid={object.uuid}
                  />
                );
              case "Box":
                return (
                  <Box
                    position={[0, 0.5, 0]}
                    orbitRef={controlsRef}
                    uuid={object.uuid}
                  />
                );
              default:
                return null;
            }
          })}
        </Selection>
        <Suspense>
          <FloorPlan />
        </Suspense>

        <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2 - 0.1} />
      </Canvas>
      <Card ambientLight={ambientLight} setObjectsInScene={setObjectsInScene} />
      <PlaceItemsButton
        toggled={placeItemsModalsIsToggled}
        onClick={() => {
          setPlaceItemsModalIsToggled((prev) => !prev);
        }}
      />
      <Modal
        setObjectsInScene={setObjectsInScene}
        toggled={placeItemsModalsIsToggled}
      />
    </div>
  );
}

export default App;
