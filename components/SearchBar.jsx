import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar({ setQuery }) {
  return (
    <div className="search-container flex items-center gap-2">
      <CiSearch size={25} />
      <input
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        type="text"
        placeholder="Search for a country..."
      />
    </div>
  );
}

export default SearchBar;
