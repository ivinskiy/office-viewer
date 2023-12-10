import { FC } from "react";
import { StyledButton } from "./PlaceItemsButton.styles";

export const PlaceItemsButton: FC<{
  onClick: () => void;
  toggled: boolean;
}> = ({ onClick, toggled }) => {
  return (
    <StyledButton onClick={onClick} $toggled={toggled}>
      Place Items
    </StyledButton>
  );
};
