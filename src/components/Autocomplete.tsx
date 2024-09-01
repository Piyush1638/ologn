import React from "react";

interface AutocompleteProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="absolute z-20 mt-1 w-full max-h-80 h-fit overflow-y-scroll border border-gray-300 bg-white rounded-lg shadow-lg">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="w-full text-left px-4 py-2 hover:bg-gray-200"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default Autocomplete;
