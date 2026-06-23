import React from "react";
import { IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { Icon } from "../../UI/Icons/Icon";

export interface DropdownSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DropdownSearch({
  value,
  placeholder,
  onChange
}: Readonly<DropdownSearchProps>) {
  return (
    <div className="dropdown__search">
      <div className="dropdown__search__container">
        <Icon icon={IconDefinitions.search} size={SizeDefinitions.Small} />
        <input
          type="text"
          placeholder={placeholder ?? "Zoeken..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}