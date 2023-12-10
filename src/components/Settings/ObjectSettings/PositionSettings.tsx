import { FC } from "react";
import { AdjustableObject } from "../../context/AdjustableLayerContext";
import {
  InputAndLabelContainer,
  InputContainer,
  InputWrapper,
} from "./ObjectSettings.styles";

export const PositionSettings: FC<{ selectedObject: AdjustableObject }> = ({
  selectedObject,
}) => {
  return (
    <InputWrapper>
      <p>Position</p>
      <InputContainer>
        <InputAndLabelContainer>
          <p>X:</p>
          <input
            type="number"
            defaultValue={
              selectedObject.transform
                ? Math.round(
                    selectedObject.transform.children[1].position.x * 10
                  ) / 10
                : 0
            }
            onChange={(event) => {
              if (selectedObject.object && selectedObject.transform) {
                selectedObject.object.position.x = Number(event.target.value);
              }
            }}
          />
        </InputAndLabelContainer>
        <InputAndLabelContainer>
          <p>Y:</p>
          <input
            type="number"
            min={0}
            defaultValue={
              selectedObject.transform
                ? Math.round(
                    selectedObject.transform.children[1].position.y * 10
                  ) / 10
                : 0
            }
            onChange={(event) => {
              if (selectedObject.object && selectedObject.transform) {
                selectedObject.object.position.y = Number(event.target.value);
                selectedObject.transform.position.y = Number(
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
            defaultValue={
              selectedObject.transform
                ? Math.round(
                    selectedObject.transform.children[1].position.z * 10
                  ) / 10
                : 0
            }
            onChange={(event) => {
              if (selectedObject.object && selectedObject.transform) {
                selectedObject.object.position.z = Number(event.target.value);
                selectedObject.transform.position.z = Number(
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
