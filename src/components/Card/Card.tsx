import { FC, useContext } from "react";
import { AdjustableLayerContext } from "../context/AdjustableLayerContext";
import { AmbientLightSettings } from "../Settings/LightSettings/AmbientLightSettings";
import { ObjectSettings } from "../Settings/ObjectSettings/ObjectSettings";
import { StyledCard } from "./Card.styles";
/**
 *
 * @param param0
 *
 * TODO in the future: Make position and rotation connected to transforms
 * @returns
 */
export const Card: FC<{
  setObjectsInScene: React.Dispatch<
    React.SetStateAction<
      {
        type: "UniFi" | "Box" | "PointLight" | "DirectionalLight";
        uuid: string;
      }[]
    >
  >;
  ambientLight: THREE.AmbientLight | null;
}> = ({ setObjectsInScene, ambientLight }) => {
  const [selectedObject] = useContext(AdjustableLayerContext);
  return (
    <StyledCard>
      {!selectedObject && ambientLight && (
        <AmbientLightSettings ambientLight={ambientLight} />
      )}
      {selectedObject && <ObjectSettings key={selectedObject.object?.uuid} />}

      {selectedObject && (
        <button
          onClick={() => {
            setObjectsInScene((prev) => {
              const filteredArray = prev.filter(
                (object) => object.uuid !== selectedObject?.object?.uuid
              );
              return filteredArray;
            });
          }}
        >
          Delete
        </button>
      )}
    </StyledCard>
  );
};
