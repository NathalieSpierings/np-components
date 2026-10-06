import { ReactNode } from "react";
import { DatagridSortFunc } from "./DatagridSort";
import { DatagridColumnFilterConfig } from "../Filters/DatagridColumnFilter";
import { ColorDefinitions } from "../../../../lib/utils/definitions";
import { DatagridPinnedPosition } from "../Datagrid";
import { NestedValue } from "../Helpers/datagridTypeHelpers";

export type Primitive =
    | string
    | number
    | boolean
    | bigint
    | symbol
    | null
    | undefined
    | Date;




export type NestedKeyOf<T> = T extends Primitive
    ? never
    : {
          [K in Extract<keyof T, string>]:
              NonNullable<T[K]> extends Primitive | unknown[]
                  ? K
                  : NonNullable<T[K]> extends T
                      ? K
                      : K | `${K}.${NestedKeyOf<NonNullable<T[K]>>}`;
      }[Extract<keyof T, string>];


export interface DatagridRowConfig<
    TData,
    TProp extends NestedKeyOf<TData> = NestedKeyOf<TData>,
    TTransformedValue extends ReactNode = any> {

    prop: TProp;
    title: string;
    sortable?: boolean;

    transformValue?: (value: NestedValue<TData, TProp>) => TTransformedValue;
    useItemOnly?: (item: TData) => ReactNode;
    wrapValue?: (item: TData, value: TTransformedValue) => ReactNode;

    sort?: DatagridSortFunc<TData>;

    cssClass?: string;
    textAlign?: "left" | "center" | "right";
    textMuted?: boolean;

    tooltipContent?: ReactNode;
    showTooltip?: boolean;
    tooltipColor?: ColorDefinitions;
    tooltipArrow?: boolean;

    filter?: DatagridColumnFilterConfig<TData>;

    width?: number;
    visible?: boolean;
    pinned?: DatagridPinnedPosition;

    summary?: boolean

    /**
     * Include this column in the general search (DatagridSearch / searchTerm).
     * Default: true
     */
    searchable?: boolean;

    /**
     * Custom text used by the general search, e.g. for columns that use `useItemOnly`.
     */
    searchValue?: (item: TData) => string;
}

