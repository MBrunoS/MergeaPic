import { createContext, useState } from "react";
import { Preview, Steps } from "../@types";

type AppContextType = {
  currentStep: Steps;
  setCurrentStep: React.Dispatch<React.SetStateAction<Steps>>;
  photos: Preview[];
  setPhotos: React.Dispatch<React.SetStateAction<Preview[]>>;
  overlay: Preview;
  setOverlay: React.Dispatch<React.SetStateAction<Preview>>;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(Steps.Home);
  const [photos, setPhotos] = useState<Preview[]>([]);
  const [overlay, setOverlay] = useState<Preview>({} as Preview);

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
