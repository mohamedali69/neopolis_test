import React, { useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ImageContext } from "./context/ImageContext";

function AddImageModal({ isOpenModal, handleOpenModal }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const { addImage } = useContext(ImageContext);

  const handleAddImage = (e) => {
    e.preventDefault();

    const newImage = {
      id: Date.now().toString(),
      links: {
        download: imageUrl,
      },
      description: imageDescription,
      category: "Nature",
      tags: ["outdoors", "landscape"],
    };

    addImage(newImage);
    handleOpenModal();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenModal}
        onClose={handleOpenModal}
        isCentered={true}
        onEsc={handleOpenModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleAddImage}>
              <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-4 py-2 mr-2 mb-2 border w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                className="flex-1 px-4 py-2 mr-2 mb-2 border w-full border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <div className="flex flex-row-reverse">
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2 ml-2 bg-red-500 rounded-md text-white hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddImageModal;
