import { FC, useContext } from "react";
import { AdjustableObject } from "../../context/AdjustableLayerContext";
import {
  InputAndLabelContainer,
  InputContainer,
  InputWrapper,
} from "./ObjectSettings.styles";

export const ScaleSettings: FC<{ selectedObject: AdjustableObject }> = ({
  selectedObject,
}) => {
  return (
    <InputWrapper>
      <p>Scale</p>
      <InputContainer>
        <InputAndLabelContainer>
          <p>X:</p>
          <input
            type="number"
            defaultValue={1}
            onChange={(event) => {
              if (selectedObject.object && selectedObject.transform) {
                selectedObject.object.scale.x = Number(event.target.value);
                selectedObject.transform.scale.x = Number(event.target.value);
              }
            }}
          />
        </InputAndLabelContainer>
        <InputAndLabelContainer>
          <p>Y:</p>
          <input
            type="number"
            min={0}
            defaultValue={1}
            onChange={(event) => {
              if (selectedObject.object && selectedObject.transform) {
                selectedObject.object.scale.y = Number(event.target.value);
                selectedObject.transform.scale.y = Number(event.target.value);
              }
            }}
          />
        </InputAndLabelContainer>
        <InputAndLabelContainer>
          <p>Z:</p>
          <input
            type="number"
            defaultValue={1}
            onChange={(event) => {
              if (selectedObject.object && selectedObject.transform) {
                selectedObject.object.scale.z = Number(event.target.value);
                selectedObject.transform.scale.z = Number(event.target.value);
              }
            }}
          />
        </InputAndLabelContainer>
      </InputContainer>
    </InputWrapper>
  );
};
