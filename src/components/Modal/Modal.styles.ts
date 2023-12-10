import styled from "styled-components";

export const StyledModal = styled.div<{ $toggled: boolean }>`
  position: absolute;
  top: 16px;
  right: ${(props) => (props.$toggled ? "16px" : "-232px")};
  transition: all 0.5s;
  width: 200px;
  height: 400px;
  background-color: rgb(238, 238, 241);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;
