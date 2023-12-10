import styled from "styled-components";

export const InfoModalWrapper = styled.div<{ $toggled: boolean }>`
  background-color: rgb(238, 238, 241);
  position: absolute;
  top: 132px;
  left: 16px;
  border-radius: 8px;
  padding: 16px;
  text-align: left;
  opacity: ${(props) => (props.$toggled ? 1 : 0)};
  pointer-events: ${(props) => (props.$toggled ? "all" : "none")};
  transition: all 0.5s;

  @media (min-width: 600px) {
    top: 16px;
    left: calc(252px + 116px);
  }
`;
