import React from "react";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import SearchInput from "../../../components/Forms/SearchInput/SearchInput";
import { useExternalProductSearch } from "./useExternalProductSearch";

/**
 * External filters – message + "Filter wissen" in the table info bar (filterInfoPosition="tableInfo").
 */
const DatagridExternalFilterDemo: React.FC = () => {

    const s = useExternalProductSearch();

    return (
        <Datagrid
            {...s.gridProps}
            toolbarTitle="External filters – infotoolbar"

            filterInfoPosition="tableInfo"
            filterMessage={s.message}
            onClearFilters={s.resetSearch}
            enableTabs
                enableTabColumnVisibility
                enableTabFilters

            toolbarPrefixItems={[
                <SearchInput
                    key="search"
                    name="externalSearch"
                    value={s.search}
                    onTextInput={s.setSearch}
                    placeholder="Zoek op id, naam, SKU of EAN en druk op Enter..."
                    style={{ minWidth: "420px" }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") s.handleSearch();
                    }}
                />
            ]}
        />
    );
};

export default DatagridExternalFilterDemo;
