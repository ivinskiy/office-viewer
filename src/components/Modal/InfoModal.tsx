import { FC } from "react";
import { InfoModalWrapper } from "./InfoModal.styles";

export const InfoModal: FC<{ toggled: boolean }> = ({ toggled }) => {
  return (
    <InfoModalWrapper $toggled={toggled}>
      <p>
        Place an item by toggling the place item menu and selecting an object
        from the menu.
      </p>
      <p>
        Transform the object by clicking on it and using the transform controls
        (arrows).
      </p>
      <p>
        You may also change some properties of the object on the menu to the
        left.
      </p>
    </InfoModalWrapper>
  );
};
