import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Object3D } from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";

export type AdjustableObject = {
  object: Object3D | undefined | null;
  transform: TransformControlsImpl | undefined | null;
};

type AdjustableLayerContextType = [
  AdjustableObject | null | undefined,
  Dispatch<SetStateAction<AdjustableObject | undefined | null>>
];

export const AdjustableLayerContext = createContext<AdjustableLayerContextType>(
  [] as unknown as AdjustableLayerContextType
);

/**
 *
 * A context for storing the currently selected object and showing the properties in the card
 * @returns A context provider containing the currently selected object and it's transform
 */
export const AdjustableLayerContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedObjectRef, setSelectedObject] =
    useState<AdjustableObject | null>();

  return (
    <AdjustableLayerContext.Provider
      value={[selectedObjectRef, setSelectedObject]}
    >
      {children}
    </AdjustableLayerContext.Provider>
  );
};
