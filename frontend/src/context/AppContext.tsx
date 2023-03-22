import { createContext, useState } from "react";
import { useImagesUpload } from "../hooks";

type AppContextType = {
  images: File[];
  handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { images, handleImagesChange } = useImagesUpload();

  return (
    <AppContext.Provider value={{ images, handleImagesChange }}>
      {children}
    </AppContext.Provider>
  );
};
