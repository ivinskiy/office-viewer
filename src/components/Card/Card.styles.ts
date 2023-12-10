import styled from "styled-components";

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 20px;
  width: 220px;
  height: 320px;
  background-color: rgb(238, 238, 241);
  position: absolute;
  top: 16px;
  left: 16px;
  h3 {
    margin-bottom: 0%;
  }
  button {
    width: fit-content;
  }
`;
