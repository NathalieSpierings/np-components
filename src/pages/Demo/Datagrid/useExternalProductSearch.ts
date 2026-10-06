import { useMemo, useState } from "react";
import { ColumnFilters, DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import { DatagridRowConfig } from "../../../components/Data/Datagrid/Config/DatagridRowConfig";
import { hasActiveColumnFilters } from "../../../components/Data/Datagrid/Filters/DatagridColumnFilter";
import { getColumnFiltersFromSearch } from "../../../components/Data/Datagrid/Helpers/datagridSearchToFilters";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";


export function useExternalProductSearch() {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const columns = useMemo(() => filterProductColumns() as DatagridRowConfig<ProductGetModel>[], []);

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<ColumnFilters<ProductGetModel>>({});
    const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [message, setMessage] = useState("");

    const resetSearch = () => {
        setSearch("");
        setMessage("");
        setSelected(undefined);
    };

    const clearAll = () => {
        setFilters({});
        resetSearch();
    };

    const handleColumnFiltersChange = (next: ColumnFilters<ProductGetModel>) => {
        setFilters(next);
  if (!hasActiveColumnFilters(next)) {
            setMessage("");
        }
    };

    const handleSearch = () => {
        const value = search.trim();
        if (!value) return;

        // 1. Exact id 
        const byId = dataRaw.find(x => String(x.id) === value);
        if (byId) {
            setSelected(byId);
            setMessage(`Product ${byId.id} gevonden`);
            return;
        }

        // 2. Search term -> column filter (column with the most hits)
        const result = getColumnFiltersFromSearch(dataRaw, value, columns, {
            columns: ["naam", "sku", "ean"]
        });

        if (result.matchedRows.length === 0) {
            setMessage("Geen product gevonden");
            return;
        }

        if (result.matchedRows.length === 1) {
            const only = result.matchedRows[0];
            setSelected(only);
            setMessage(`1 product gevonden: ${only.naam}`);
            return;
        }

        setSelected(undefined);
        setFilters(result.filters);
        setMessage(`${result.matchedRows.length} producten gevonden, gefilterd op kolom "${result.column}"`);
    };

    return {
        search,
        setSearch,
        handleSearch,
        message,
        selected,
        setSelected,
        filters,
        resetSearch,
        clearAll,
        gridProps: {
            data: data || [],
            dataRaw,
            total: total || 0,
            loading: status === "pending",
            onFilterUpdate: setTableOptions,
            properties: columns,
            enableFiltersInHeader: true,
            columnFilters: filters,
            onColumnFiltersChange: handleColumnFiltersChange,
            selectedRow: selected,
            rowSingleClickAction: setSelected
        }
    };
}
