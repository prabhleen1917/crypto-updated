import React, { ChangeEvent, FC } from 'react';

// Define the props for the SearchBar component
interface SearchBarProps {
  searchQuery: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="mb-16 flex items-center w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="bg-[#222531] border-none p-4 rounded outline-none w-full placeholder-gray-200 text-white"
      />
    </div>
  );
};

export default SearchBar;
