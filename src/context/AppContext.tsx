import { createContext, useState } from "react";
import { Steps } from "../@types";

type AppContextType = {
  currentStep: Steps;
  setCurrentStep: React.Dispatch<React.SetStateAction<Steps>>;
  photos: File[];
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
  overlay: File;
  setOverlay: React.Dispatch<React.SetStateAction<File>>;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(Steps.Upload);
  const [photos, setPhotos] = useState<File[]>([]);
  const [overlay, setOverlay] = useState<File>({} as File);

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
