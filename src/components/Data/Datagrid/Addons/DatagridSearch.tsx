import React from "react";
import SearchInput from "../../../Forms/SearchInput/SearchInput";

export interface DatagridSearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    css?: string;
}

/**
 * General search field for the Datagrid. Searches in all columns (see `searchable` on the column config).
 * Rendered automatically in the toolbar with `enableSearch`, but can also be used standalone.
 */
const DatagridSearch = ({
    searchTerm,
    onSearchChange,
    placeholder = "Zoeken in alle kolommen...",
    autoFocus = false,
    css = ""
}: DatagridSearchProps) => (
    <div className={["datagrid__toolbar-search", css].filter(Boolean).join(" ")}>
        <SearchInput
            name="datagridSearch"
            type="text"
            value={searchTerm}
            onTextInput={onSearchChange}
            placeholder={placeholder}
            autoFocus={autoFocus}
            aria-label={placeholder}
        />
    </div>
);

export default DatagridSearch;
