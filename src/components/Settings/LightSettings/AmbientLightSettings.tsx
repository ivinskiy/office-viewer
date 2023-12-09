import { FC } from "react";
import { Color } from "three";
import { StyledWrapper } from "./AmbientLightSettings.styles";

export const AmbientLightSettings: FC<{
  ambientLight: THREE.AmbientLight;
}> = ({ ambientLight }) => {
  return (
    <StyledWrapper>
      <h3>Ambient Light</h3>
      <div>
        <p>Intensity</p>
        <input
          type="range"
          defaultValue={ambientLight.intensity}
          onChange={(event) => {
            ambientLight.intensity = Number(event.target.value);
          }}
          max={5}
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
            ambientLight.color = color;
          }}
        />
      </div>
    </StyledWrapper>
  );
};
