import { FC } from "react";
import { StyledButton } from "./PlaceItemsButton.styles";

/**
 *
 * @param onClick: onClick handler
 * @param toggled: Boolean to see if place items menu is toggled
 *
 * @returns A "place items" button
 */
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
