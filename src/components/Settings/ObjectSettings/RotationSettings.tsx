import { FC } from "react";
import { AdjustableObject } from "../../context/AdjustableLayerContext";
import {
  InputAndLabelContainer,
  InputContainer,
  InputWrapper,
} from "./ObjectSettings.styles";

export const RotationSettings: FC<{ selectedObject: AdjustableObject }> = ({
  selectedObject,
}) => {
  return (
    <InputWrapper>
      <p>Rotation</p>
      <InputContainer>
        <InputAndLabelContainer>
          <p>X:</p>
          <input
            type="number"
            defaultValue={0}
            onChange={(event) => {
              if (selectedObject.object && selectedObject.transform) {
                selectedObject.object.rotation.x = Number(event.target.value);
                selectedObject.transform.rotation.x = Number(
                  event.target.value
                );
              }
            }}
          />
        </InputAndLabelContainer>
        <InputAndLabelContainer>
          <p>Y:</p>
          <input
            type="number"
            min={0}
            defaultValue={0}
            onChange={(event) => {
              if (selectedObject.object && selectedObject.transform) {
                selectedObject.object.rotation.y = Number(event.target.value);
                selectedObject.transform.rotation.y = Number(
                  event.target.value
                );
              }
            }}
          />
        </InputAndLabelContainer>
        <InputAndLabelContainer>
          <p>Z:</p>
          <input
            type="number"
            defaultValue={0}
            onChange={(event) => {
              if (selectedObject.object && selectedObject.transform) {
                selectedObject.object.rotation.z = Number(event.target.value);
                selectedObject.transform.rotation.z = Number(
                  event.target.value
                );
              }
            }}
          />
        </InputAndLabelContainer>
      </InputContainer>
    </InputWrapper>
  );
};
