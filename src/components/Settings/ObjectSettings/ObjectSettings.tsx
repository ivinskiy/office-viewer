import { useContext } from "react";
import { AdjustableLayerContext } from "../../context/AdjustableLayerContext";
import { LightSettings } from "../LightSettings/LightSettings";
import { ObjectSettingsWrapper } from "./ObjectSettings.styles";
import { ScaleSettings } from "./ScaleSettings";
import { TransformModeSettings } from "./TransformModeSettings";

/**
 *
 * @returns Settings in the card. Currently only scale and transform mode
 */
export const ObjectSettings = () => {
  const [selectedObject] = useContext(AdjustableLayerContext);
  return (
    <ObjectSettingsWrapper>
      <h3>{selectedObject?.object?.type}</h3>

      {selectedObject?.object && selectedObject.object.type === "Mesh" && (
        <>
          {/* <PositionSettings selectedObject={selectedObject} /> */}
          {/* <RotationSettings selectedObject={selectedObject} /> */}
          <ScaleSettings selectedObject={selectedObject} />
        </>
      )}
      {selectedObject?.object &&
        ["PointLight", "DirectionalLight", "SpotLight"].includes(
          selectedObject.object.type
        ) && <LightSettings selectedObject={selectedObject} />}
      {selectedObject?.transform && (
        <TransformModeSettings selectedObject={selectedObject} />
      )}
    </ObjectSettingsWrapper>
  );
};
