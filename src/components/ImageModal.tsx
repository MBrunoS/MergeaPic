import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import Cropper from "react-easy-crop";
import { EditContext } from "../context";
import { useContext } from "react";

export const ImageModal: React.FC = () => {
  const {
    isModalOpen,
    closeModal,
    activeImage,
    setActiveImage,
    setPhotosPreview,
  } = useContext(EditContext);

  function handleCropChange(crop: { x: number; y: number }) {
    setActiveImage({ ...activeImage, crop });
  }

  function handleZoomChange(zoom: number) {
    setActiveImage({ ...activeImage, zoom });
  }

  function handleClose() {
    setPhotosPreview((prev) => ({
      ...prev,
      [activeImage.name]: activeImage,
    }));
    closeModal();
  }

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent h="75vh">
        <ModalBody>
          <Cropper
            image={activeImage.src}
            crop={activeImage.crop}
            zoom={activeImage.zoom}
            aspect={4 / 3}
            onCropChange={handleCropChange}
            onZoomChange={handleZoomChange}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
