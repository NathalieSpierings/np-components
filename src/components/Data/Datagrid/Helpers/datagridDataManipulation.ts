import moment from 'moment';
import { normalizeDate } from '../../../../lib/helpers/helpers';
import { DatagridRowConfig } from '../Config/DatagridRowConfig';
import { DatagridSortConfig } from '../Config/DatagridSort';
import { getNestedValue } from './datagridTypeHelpers';

const orderMap = {
    desc: -1,
    asc: 1,
};


const getPropConfig = <TData>(
    prop: string,
    propertyConfigs?: DatagridRowConfig<TData>[]
): DatagridRowConfig<TData> | undefined => {
    if (!propertyConfigs) {
        return;
    }

    const config = propertyConfigs.filter((x) => x.prop == prop);

    if (!config.length) {
        return;
    }

    return config[0];
};

const getValue = <TData>(
    item: TData, 
    prop: string, 
    propertyConfigs?: DatagridRowConfig<TData>[]
): any => {
    const rawValue = getNestedValue(item, prop as any);
    const config = getPropConfig(prop, propertyConfigs);

    if (!config?.transformValue) {
        return rawValue;
    }

     return config.transformValue(rawValue as any);
};

export function defaultSort<TData>(
    items: TData[],
    sortConfig: DatagridSortConfig,
    propertyConfigs?: DatagridRowConfig<TData>[]
): TData[] {

    const data = [...items];

    data.sort((a: TData, b: TData) => {
        const config = getPropConfig(sortConfig.prop, propertyConfigs);

        let result: number;

        if (config?.sort) {
            result = config.sort(a, b);
        } else {
            const valA = getValue(a, sortConfig.prop, propertyConfigs);
            const valB = getValue(b, sortConfig.prop, propertyConfigs);

            const aIsNull = valA === null || valA === undefined;
            const bIsNull = valB === null || valB === undefined;

            if (aIsNull && bIsNull) {
                result = 0;
            } else if (aIsNull) {
                result = 1;
            } else if (bIsNull) {
                result = -1;
            } else if (valA > valB) {
                result = 1;
            } else if (valA < valB) {
                result = -1;
            } else {
                result = 0;
            }
        }

        return result * orderMap[sortConfig.order];
    });

    return data;
}

export const getStringValue = (val: any): string => {
    if (val instanceof Date) {
        return moment(val).format('DD-MM-YYYY');
    }
    if (val === null || val === undefined) {
        return val;
    }

    return val + '';
};

export const debounce = (func: any, timeout = 300) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
};

const getDateSearchStrings = (rawVal: unknown): string[] => {
    const date = normalizeDate(rawVal);

    if (!date) {
        return [];
    }

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return [
        `${yyyy}-${mm}-${dd}`, // 2026-01-16
        `${dd}-${mm}-${yyyy}`, // 16-01-2026
    ];
};

/**
 * Returns all texts of a single cell the general search may match on:
 * - `searchValue(item)` when configured (e.g. for `useItemOnly` columns)
 * - the raw value
 * - the transformed value (when `transformValue` returns a string or number)
 * - the label of a matching filter option (select columns)
 * - formatted dates (yyyy-mm-dd and dd-mm-yyyy) for date columns
 */
export const getSearchableTexts = <TData>(
    item: TData,
    column: DatagridRowConfig<TData>
): string[] => {

    if (column.searchValue) {
        return [column.searchValue(item) ?? ''];
    }

    const rawVal = getNestedValue(item, column.prop);

    if (rawVal == null) {
        return [];
    }

    if (column.filter?.type === 'date') {
        return getDateSearchStrings(rawVal);
    }

    const texts = [String(rawVal)];

    if (column.transformValue) {
        const transformed = column.transformValue(rawVal as any);

        if (typeof transformed === 'string' || typeof transformed === 'number') {
            texts.push(String(transformed));
        }
    }

    const option = column.filter?.options?.find(o => o.value === String(rawVal));

    if (option) {
        texts.push(option.label);
    }

    return texts;
};

/**
 * Columns that take part in the general search (all columns, including hidden ones,
 * except those with `searchable: false`).
 */
export const getSearchableColumns = <TData>(
    propertyConfigs?: DatagridRowConfig<TData>[]
): DatagridRowConfig<TData>[] =>
    (propertyConfigs ?? []).filter(column => column.searchable !== false);

/**
 * Splits a search term into lowercase words.
 */
export const getSearchWords = (searchTerm: string): string[] =>
    searchTerm.toLowerCase().trim().split(/\s+/).filter(Boolean);

/**
 * General search over all searchable columns.
 * Every word of the search term must occur in at least one column of the row
 * (e.g. "bike red" matches a row with "Bike" in name and "Red" in color).
 */
export const defaultSearch = <TData>(
    data: TData[],
    searchTerm: string,
    propertyConfigs?: DatagridRowConfig<TData>[]
): TData[] => {

    const words = getSearchWords(searchTerm);

    if (words.length === 0) {
        return data;
    }

    const columns = getSearchableColumns(propertyConfigs);

    return data.filter(item => {
        const haystack = columns
            .flatMap(column => getSearchableTexts(item, column))
            .join('\n')
            .toLowerCase();

        return words.every(word => haystack.includes(word));
    });
};
