import React, { createContext, useState, useEffect } from "react";
import {GetImages} from "../../lib/fetch"

const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const data = await GetImages(page);
      setImages(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const addImage = (image) => {
    setImages((prevImages) => [...prevImages, image]);
  };

  const deleteImage = (imageId) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <ImageContext.Provider
      value={{ images, addImage, deleteImage, isLoading, error, nextPage, prevPage }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { ImageContext, ImageProvider };
