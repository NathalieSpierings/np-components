import { createContext, ReactNode, useContext, useMemo } from "react";
import { DatagridRowConfig } from "../Config/DatagridRowConfig";
import { DatagridColumnFilterConfig, DatagridColumnFilterValue } from "./DatagridColumnFilter";

/**
 * Waarde van de filtercontext voor één kolom.
 * Beschikbaar via useDatagridFilter() binnen een DatagridFilterEditor, bijvoorbeeld in een customPicker.
 */
export interface DatagridFilterContextValue<TData = any> {
    /**
     * De kolomconfiguratie waarvoor dit filter geldt (o.a. prop en title).
     */
    column: DatagridRowConfig<TData>;

    /**
     * De filterconfiguratie van de kolom (gelijk aan column.filter, maar altijd gedefinieerd).
     * Het type bepaalt hoe de waarde bij het filteren wordt toegepast.
     */
    filter: DatagridColumnFilterConfig<TData, any>;

    /**
     * De ongefilterde rijen van de datagrid.
     * Handig om keuzes op te bouwen, bijvoorbeeld met getFilterOptions(filter, dataRaw).
     * Kan undefined zijn, bijvoorbeeld bij server-side data.
     */
    dataRaw?: TData[];

    /**
     * De huidige filterwaarde van deze kolom, of undefined als er geen filter is ingesteld.
     */
    value?: DatagridColumnFilterValue;

    /**
     * Vervangt de volledige filterwaarde. Undefined wist het filter.
     * Bijvoorbeeld setValue({ values: ["a", "b"] }) voor een select-filter.
     */
    setValue: (value: DatagridColumnFilterValue | undefined) => void;
}

const DatagridFilterContext = createContext<DatagridFilterContextValue | undefined>(undefined);

export interface DatagridFilterProviderProps<TData> {
    /**
     * De filterinvoer.
     */
    children: ReactNode;

    /**
     * De kolom waarvoor het filter geldt. Zonder column.filter rendert de provider niets.
     */
    column: DatagridRowConfig<TData>;

    /**
     * De ongefilterde rijen van de datagrid. Wordt doorgegeven aan de context.
     */
    dataRaw?: TData[];

    /**
     * De huidige filterwaarde van deze kolom.
     */
    value?: DatagridColumnFilterValue;

    /**
     * Wordt aangeroepen met de nieuwe filterwaarde, of met undefined als het filter gewist wordt.
     */
    onChange: (value: DatagridColumnFilterValue | undefined) => void;
}

export function DatagridFilterProvider<TData>({
    children,
    column,
    dataRaw,
    value,
    onChange,
}: Readonly<DatagridFilterProviderProps<TData>>) {

    const contextValue = useMemo<DatagridFilterContextValue<TData> | undefined>(() => {
        const filter = column.filter;

        if (!filter) {
            return undefined;
        }

        return {
            column,
            filter,
            dataRaw,
            value,
            setValue: onChange,
        };
    }, [column, dataRaw, value, onChange]);

    if (!contextValue) {
        return null;
    }

    return (
        <DatagridFilterContext.Provider value={contextValue}>
            {children}
        </DatagridFilterContext.Provider>
    );
}

// Geeft toegang tot de waarde en setters van het filter waarin dit component gerenderd wordt (bijv. in een customPicker).
export function useDatagridFilter<TData = any>(): DatagridFilterContextValue<TData> {
    const context = useContext(DatagridFilterContext);

    if (!context) {
        throw new Error("useDatagridFilter moet binnen een DatagridFilterEditor (of DatagridFilterProvider) gebruikt worden");
    }

    return context;
}
