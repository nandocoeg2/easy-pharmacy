import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/Store";
import { SortOption, setSortOption } from "../../stores/SearchSlice";
import { ArrowUpDown } from "lucide-react";

const SortDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const currentSort = useSelector((state: RootState) => state.search.sortBy);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value as SortOption));
  };

  return (
    <div className="flex items-center">
      <ArrowUpDown className="h-4 w-4 text-gray-500 mr-2" />
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Sort by</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  );
};

export default SortDropdown;
