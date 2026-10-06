import React from "react";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import SearchInput from "../../../components/Forms/SearchInput/SearchInput";
import { useExternalProductSearch } from "./useExternalProductSearch";

/**
 * External filters – "Filter wissen" in the toolbar (filterInfoPosition="toolbar", the default).
 * The toolbar has no message slot, so the message is added as a postfix item before the button.
 */
const DatagridExternalFilterToolbarDemo: React.FC = () => {

    const s = useExternalProductSearch();

    return (
        <Datagrid
            {...s.gridProps}
            toolbarTitle="External filters – toolbar"

            filterInfoPosition="toolbar"
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
            toolbarPostfixItems={
                s.message
                    ? [<span key="message" className="text-muted">{s.message}</span>]
                    : []
            }
        />
    );
};

export default DatagridExternalFilterToolbarDemo;
