import styled from "styled-components";

export const ObjectSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

export const InputAndLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  input {
    width: 40px;
  }
  p {
    margin: 0;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
  }
`;

export const StyledSelect = styled.select`
  width: 50%;
`;

export const TransformModeWrapper = styled.div`
  width: 100%;
  p {
    margin: 0;
  }
`;
