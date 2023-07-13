import React, { useState, useContext } from "react";
import { ImageContext } from "./context/ImageContext";
import { AiFillCloseCircle } from "react-icons/ai";
import ImageItem from "./ImageItem";
import ImageFilter from "./ImageFilter";
import DeleteDialog from "./shared/DeleteDialog";

const Home = () => {
  const {
    images,
    isLoading,
    error,
    addImage,
    deleteImage,
    nextPage,
    prevPage,
  } = useContext(ImageContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterTags, setFilterTags] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [imageId, setImageId] = useState(null);

  const handleOpenDialog = (imgId) => {
    setIsOpen(!isOpen);
    setImageId(imgId);
  };

  const openFullScreen = (image) => {
    setSelectedImage(image);
  };

  const closeFullScreen = () => {
    setSelectedImage(null);
  };

  const handleDeleteImage = () => {
    deleteImage(imageId);
    handleOpenDialog();
  };

  const handleAddImage = () => {
    const newImage = {
      id: Date.now().toString(),
      links: {
        download: imageUrl,
      },
      description: imageDescription,
      category: "Nature", // Added a default category
      tags: ["outdoors", "landscape"], // Added default tags
    };

    addImage(newImage);
    setImageUrl("");
    setImageDescription("");
  };

  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleFilterTagsChange = (e) => {
    setFilterTags(e.target.value);
  };

  const filteredImages = images.filter((image) => {
    if (filterCategory === "all" && filterTags === "") {
      return true;
    }

    let matchesCategory = true;
    if (filterCategory !== "all") {
      matchesCategory = image.category === filterCategory;
    }

    let matchesTags = true;
    if (filterTags !== "") {
      matchesTags = image.tags?.includes(filterTags.toLowerCase());
    }

    return matchesCategory && matchesTags;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-2xl text-gray-700">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-2xl text-red-500">Error: {error.message}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <DeleteDialog
        isOpen={isOpen}
        handleOpenDeleteDialog={handleOpenDialog}
        handleDelete={handleDeleteImage}
      />
      <h1 className="text-3xl font-bold mb-4">Welcome To Our Image Gallery</h1>

      <div className="flex mb-4">
        <div className="flex-1 pr-2">
          <ImageFilter
            filterCategory={filterCategory}
            filterTags={filterTags}
            handleFilterCategoryChange={handleFilterCategoryChange}
            handleFilterTagsChange={handleFilterTagsChange}
          />
        </div>
        <div className="flex-1 pl-2">
          <div className="mb-4 flex">
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
              className="px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAddImage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Image
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <ImageItem
            key={image.id}
            image={image}
            openFullScreen={openFullScreen}
            handleDeleteImage={handleDeleteImage}
            handleOpenDeleteDialog={handleOpenDialog}
          />
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
        >
          Previous Page
        </button>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
        >
          Next Page
        </button>
      </div>

      {selectedImage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="max-w-3xl">
            <AiFillCloseCircle
              onClick={closeFullScreen}
              className="absolute top-4 right-4 text-gray-500 cursor-pointer focus:outline-none"
              size={40}
            />
            <img
              src={selectedImage.links.download}
              alt="image"
              className="rounded-lg object-contain h-screen"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-white">
                {selectedImage.description}
              </h2>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
