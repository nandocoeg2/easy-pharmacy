import React from "react";
import { Search, X } from "lucide-react";
import Input from "../atoms/Input";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../stores/SearchSlice";
import { RootState } from "../../stores/Store";

export default function SearchInput() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);

  return (
    <Input
      type="text"
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      placeholder="Search products..."
      leftIcon={<Search className="h-5 w-5 text-gray-400" />}
      rightIcon={
        searchQuery && (
          <button
            onClick={() => dispatch(setSearchQuery(""))}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-4 w-4" />
          </button>
        )
      }
    />
  );
}
