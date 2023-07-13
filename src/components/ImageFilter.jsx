import React from "react";

const ImageFilter = ({
  filterCategory,
  filterTags,
  handleFilterCategoryChange,
  handleFilterTagsChange,
}) => {
  return (
    <div className="flex mb-4">
      <select
        value={filterCategory}
        onChange={handleFilterCategoryChange}
        className="px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="all">All</option>
        <option value="Nature">Nature</option>
        <option value="Architecture">Architecture</option>
        <option value="Travel">Travel</option>
      </select>
      <input
        type="text"
        placeholder="Filter by tags"
        value={filterTags}
        onChange={handleFilterTagsChange}
        className="px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default ImageFilter;
