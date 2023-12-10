import { FC } from "react";
import { StyledModal } from "./Modal.styles";
/**
 *
 * @param toggled: Boolean to see if modal is toggled
 * @param setObjectsInScene: Setter for current objects in the scene
 * @returns A modal where you can place new items to the scene
 */
export const Modal: FC<{
  toggled: boolean;
  setObjectsInScene: React.Dispatch<
    React.SetStateAction<
      {
        type: "UniFi" | "Box" | "PointLight" | "DirectionalLight";
        uuid: string;
      }[]
    >
  >;
}> = ({ toggled, setObjectsInScene }) => {
  return (
    <StyledModal $toggled={toggled}>
      <h3>Items</h3>
      <button
        onClick={() => {
          setObjectsInScene((prev) => {
            return [...prev, { type: "UniFi", uuid: `UniFi-${prev.length}` }];
          });
        }}
      >
        UniFi model
      </button>
      <button
        onClick={() => {
          setObjectsInScene((prev) => {
            return [...prev, { type: "Box", uuid: `Box-${prev.length}` }];
          });
        }}
      >
        Box
      </button>

      <button
        onClick={() => {
          setObjectsInScene((prev) => {
            return [
              ...prev,
              { type: "PointLight", uuid: `PointLight-${prev.length}` },
            ];
          });
        }}
      >
        PointLight
      </button>
      <button
        onClick={() => {
          setObjectsInScene((prev) => {
            return [
              ...prev,
              {
                type: "DirectionalLight",
                uuid: `DirectionalLight-${prev.length}`,
              },
            ];
          });
        }}
      >
        DirectionalLight
      </button>
    </StyledModal>
  );
};
