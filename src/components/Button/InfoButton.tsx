import { FC } from "react";
import { StyledInfoButton } from "./PlaceItemsButton.styles";

export const InfoButton: FC<{
  onClick: () => void;
  toggled: boolean;
}> = ({ onClick, toggled }) => {
  return (
    <StyledInfoButton onClick={onClick} $toggled={toggled}>
      Info
    </StyledInfoButton>
  );
};
