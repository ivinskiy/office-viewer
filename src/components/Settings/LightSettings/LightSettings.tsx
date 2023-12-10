import { FC } from "react";
import { Color } from "three";
import { AdjustableObject } from "../../context/AdjustableLayerContext";
import { StyledWrapper } from "./AmbientLightSettings.styles";

export const LightSettings: FC<{ selectedObject: AdjustableObject }> = ({
  selectedObject,
}) => {
  return (
    <StyledWrapper>
      <div>
        <p>Intensity</p>
        <input
          type="range"
          defaultValue={(selectedObject?.object as THREE.Light).intensity}
          onChange={(event) => {
            (selectedObject?.object as THREE.Light).intensity = Number(
              event.target.value
            );
          }}
          max={1000}
          min={0}
        />
      </div>

      <div>
        <p>Color</p>
        <input
          type="color"
          defaultValue={"#ffffff"}
          onChange={(event) => {
            const color = new Color(event.target.value);
            (selectedObject?.object as THREE.Light).color = color;
          }}
        />
      </div>
    </StyledWrapper>
  );
};
