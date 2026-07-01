import React from "react";
import { IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { Icon } from "../../UI/Icons/Icon";

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "date" | "search";
  css?: string;
}

function Search({
  value,
  placeholder,
  onChange,
  type,
  css=''
}: Readonly<SearchProps>) {
  return (
    <div className={`search ${css}`}>
      <div className="search__container">
        <Icon icon={IconDefinitions.search} size={SizeDefinitions.Small} />
        <input
          type={type}
          placeholder={placeholder ?? "Zoeken..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

export default Search;