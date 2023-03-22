import { createContext, useState } from "react";
import { Preview } from "../@types";
import { useImagesUpload } from "../hooks";

type AppContextType = {
  previews: Preview[];
  setPreviews: React.Dispatch<React.SetStateAction<Preview[]>>;
  isOverlayStep: boolean;
  setIsOverlayStep: React.Dispatch<React.SetStateAction<boolean>>;
  handlePhotosChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const {
    previews,
    setPreviews,
    handleImagesChange: handlePhotosChange,
  } = useImagesUpload({
    maxFiles: 20,
    maxFileSize: 2 * 1024 * 1024,
  });
  const [isOverlayStep, setIsOverlayStep] = useState(false);

  return (
    <AppContext.Provider
      value={{
        previews,
        setPreviews,
        isOverlayStep,
        setIsOverlayStep,
        handlePhotosChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
