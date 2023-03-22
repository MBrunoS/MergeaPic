import { createContext } from "react";
import { Preview } from "../@types";
import { useImagesUpload } from "../hooks";

type AppContextType = {
  previews: Preview[];
  setPreviews: React.Dispatch<React.SetStateAction<Preview[]>>;
  handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { previews, setPreviews, handleImagesChange } = useImagesUpload();

  return (
    <AppContext.Provider value={{ previews, setPreviews, handleImagesChange }}>
      {children}
    </AppContext.Provider>
  );
};
