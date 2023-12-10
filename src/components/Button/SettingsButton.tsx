import { FC } from "react";
import { StyledInfoButton } from "./PlaceItemsButton.styles";

/**
 *
 * @param onClick: onClick handler
 * @param toggled: Boolean to see if place items menu is toggled
 *
 * @returns An info button
 */
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
