import { Dispatch, SetStateAction, createContext, useState } from "react";
import { CroppedImg, PhotosPreview } from "../@types";
import { usePhotosPreview } from "../hooks";

type EditContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  activeImage: CroppedImg;
  setActiveImage: React.Dispatch<React.SetStateAction<CroppedImg>>;
  photosPreview: PhotosPreview;
  setPhotosPreview: Dispatch<SetStateAction<PhotosPreview>>;
};

export const EditContext = createContext<EditContextType>(
  {} as EditContextType
);

type EditProviderProps = {
  children: React.ReactNode;
};

export const EditProvider: React.FC<EditProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [activeImage, setActiveImage] = useState<CroppedImg>({} as CroppedImg);
  const [photosPreview, setPhotosPreview] = usePhotosPreview();

  return (
    <EditContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        activeImage,
        setActiveImage,
        photosPreview,
        setPhotosPreview,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};
