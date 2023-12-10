import styled from "styled-components";

export const StyledButton = styled.button<{ $toggled: boolean }>`
  /* background-color: rgb(238, 238, 241); */
  background-color: ${(props) =>
    props.$toggled ? "white" : "rgb(238, 238, 241)"};
  border-radius: 8px;
  transition: all 0.5s;
  position: absolute;
  top: 72px;
  left: 252px;
  width: 100px;
`;

export const StyledInfoButton = styled(StyledButton)`
  left: calc(252px);
  top: 16px;
`;
