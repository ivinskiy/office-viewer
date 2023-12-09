import { FC } from "react";
import { AdjustableObject } from "../../context/AdjustableLayerContext";
import { StyledSelect, TransformModeWrapper } from "./ObjectSettings.styles";

export const TransformModeSettings: FC<{
  selectedObject: AdjustableObject;
}> = ({ selectedObject }) => {
  return (
    <TransformModeWrapper>
      <p>Transform mode</p>
      <StyledSelect
        defaultValue={"translate"}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          console.log(event.target.value);
          if (selectedObject.transform) {
            selectedObject.transform.setMode(event.target.value);
          }
        }}
      >
        <option value="translate">Translate</option>
        <option value="rotate">Rotate</option>
        <option value="scale">Scale</option>
      </StyledSelect>
    </TransformModeWrapper>
  );
};
