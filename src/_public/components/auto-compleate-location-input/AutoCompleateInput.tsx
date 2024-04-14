import React, { useState, useRef, useEffect } from "react";
import "./test.css";
import SearchBox from "@/components/search-box";
import { IoLocationOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

interface AutocompleteLocationInputProps {
  locations: string[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const AutocompleteLocationInput: React.FC<AutocompleteLocationInputProps> = ({
  locations,
  inputValue,
  setInputValue,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const autocomplete = (value: string) => {
    const filteredSuggestions = locations
      .filter((country) =>
        country.toLowerCase().startsWith(value.toLowerCase())
      )
      .slice(0, 6); // Limit to maximum 6 suggestions
    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    autocomplete(e.target.value);
  };

  const handleItemClick = (value: string) => {
    setInputValue(value);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-container">
      <SearchBox styles="px-4">
        <div className="flex justify-between items-center gap-2 h-10">
          <IoLocationOutline className="text-xl text-gray-500" />
          <input
            ref={inputRef}
            id="myInput"
            type="text"
            name="myCountry"
            placeholder="City"
            value={inputValue}
            onChange={handleInputChange}
            className="outline-none font-md"
          />
          {inputValue && (
            <RxCross2
              onClick={() => setInputValue("")}
              className="hover:bg-gray-100 duration-200 text-2xl rounded-md w-8 h-8 p-1"
            />
          )}
        </div>
      </SearchBox>
      <div ref={suggestionRef} className="autocomplete-items">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(suggestion)}
            dangerouslySetInnerHTML={{
              __html: suggestion.replace(
                new RegExp(inputValue, "gi"),
                (match) => `<strong>${match}</strong>`
              ),
            }}
            className="autocomplete-item"
          />
        ))}
      </div>
    </div>
  );
};

export default AutocompleteLocationInput;
