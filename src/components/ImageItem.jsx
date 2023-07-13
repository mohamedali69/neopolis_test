import React from "react";

const ImageItem = ({ image, openFullScreen, handleDeleteImage, handleOpenDeleteDialog }) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={image.links.download}
        alt="image"
        className="object-cover h-64 cursor-pointer"
        onClick={() => openFullScreen(image)}
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{image.user?.username}</h2>
        <button
          onClick={() => handleOpenDeleteDialog(image.id)}
          className="px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ImageItem;
