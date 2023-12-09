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
  ambientLight: THREE.AmbientLight | null;
}> = ({ ambientLight }) => {
  const [selectedObject] = useContext(AdjustableLayerContext);
  return (
    <StyledCard>
      {!selectedObject && ambientLight && (
        <AmbientLightSettings ambientLight={ambientLight} />
      )}
      {selectedObject && <ObjectSettings key={selectedObject.object?.uuid} />}
      {/* 
      <button
        onClick={() => {
          selectedObject?.object?.removeFromParent();
        }}
      >
        Delete
      </button> */}
    </StyledCard>
  );
};
