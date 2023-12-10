import { FC, useContext } from "react";
import { AdjustableLayerContext } from "../context/AdjustableLayerContext";
import { AmbientLightSettings } from "../Settings/LightSettings/AmbientLightSettings";
import { ObjectSettings } from "../Settings/ObjectSettings/ObjectSettings";
import { StyledCard } from "./Card.styles";
/**
 *
 * @param setObjectsInScene: Setter for objects in the scene (setState setter).
 * @param ambientLight: Reference to the ambient light if nothing else is selected.
 *
 * @returns A card / menu with different settings depending on what is selected.
 * @todo Make position, scale and rotation settings get updated together with the transform controls
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
