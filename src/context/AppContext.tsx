import { createContext, useState } from "react";
import { ImageFile, Steps } from "../@types";

type AppContextType = {
  currentStep: Steps;
  setCurrentStep: React.Dispatch<React.SetStateAction<Steps>>;
  photos: ImageFile[];
  setPhotos: React.Dispatch<React.SetStateAction<ImageFile[]>>;
  overlay: ImageFile;
  setOverlay: React.Dispatch<React.SetStateAction<ImageFile>>;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(Steps.Upload);
  const [photos, setPhotos] = useState<ImageFile[]>([]);
  const [overlay, setOverlay] = useState<ImageFile>({} as ImageFile);

  return (
    <AppContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        photos,
        setPhotos,
        overlay,
        setOverlay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
