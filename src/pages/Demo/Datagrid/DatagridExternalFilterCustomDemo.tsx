import React from "react";
import DatagridClearFiltersButton from "../../../components/Data/Datagrid/Addons/DatagridClearFiltersButton";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { hasActiveColumnFilters } from "../../../components/Data/Datagrid/Filters/DatagridColumnFilter";
import SearchInput from "../../../components/Forms/SearchInput/SearchInput";
import { useExternalProductSearch } from "./useExternalProductSearch";


const DatagridExternalFilterCustomDemo: React.FC = () => {

    const s = useExternalProductSearch();

    return (
        <>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                <SearchInput
                    name="externalSearch"
                    value={s.search}
                    onTextInput={s.setSearch}
                    placeholder="Zoek op id, naam, SKU of EAN en druk op Enter..."
                    style={{ minWidth: "420px" }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") s.handleSearch();
                    }}
                />

                {s.message && <span>{s.message}</span>}

                {hasActiveColumnFilters(s.filters) && (
                    <DatagridClearFiltersButton onClick={s.clearAll} />
                )}
            </div>

            <Datagrid
                {...s.gridProps}
                toolbarTitle="External filters – custom"
                filterInfoPosition="none"
                enableTabs
                enableTabColumnVisibility
                enableTabFilters
            />
        </>
    );
};

export default DatagridExternalFilterCustomDemo;
