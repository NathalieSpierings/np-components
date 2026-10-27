import { DatagridGetDataArguments } from "../../components/Data/Datagrid/Config/DatagridData";
import { DatagridRowConfig } from "../../components/Data/Datagrid/Config/DatagridRowConfig";
import { filterDataTable } from "../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { downloadFile } from "../utils/files";

export interface CsvColumn<T> {
    title: string;
    value: (item: T) => unknown;
}

const SEPARATOR = ";";      
const CHUNK_SIZE = 5000;    // voorkomt één gigantische string bij veel rijen

export const formatCsvCell = (value: unknown): string => {
    if (value === null || value === undefined) {
        return "";
    }
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? "" : value.toLocaleDateString("nl-NL");
    }
    if (typeof value === "boolean") {
        return value ? "Ja" : "Nee";
    }
    if (typeof value === "number") {
        return Number.isFinite(value) ? String(value).replace(".", ",") : "";
    }
    if (typeof value === "bigint") {
        return value.toString();
    }
    if (typeof value !== "string") {
        return ""; // objecten, arrays, functies, symbols horen niet in een CSV-cel
    }

    let text = value;
    if (/^[=+\-@\t\r]/.test(text)) {
        text = `'${text}`; // formule-injectie voorkomen
    }
    if (/[";\r\n]/.test(text)) {
        text = `"${text.replaceAll('"', '""')}"`; // escapen
    }
    return text;
};

export const buildCsvParts = <T,>(rows: T[], columns: CsvColumn<T>[]): string[] => {
    const parts = [columns.map(c => formatCsvCell(c.title)).join(SEPARATOR) + "\r\n"];
    for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
        const end = Math.min(i + CHUNK_SIZE, rows.length);
        const lines: string[] = [];
        for (let r = i; r < end; r++) {
            const row = rows[r];
            lines.push(columns.map(c => formatCsvCell(c.value(row))).join(SEPARATOR));
        }
        parts.push(lines.join("\r\n") + "\r\n");
    }
    return parts;
};

export const exportToCsv = <T,>(rows: T[], columns: CsvColumn<T>[], fileName: string): void => {
    const blob = new Blob(["\uFEFF", ...buildCsvParts(rows, columns)], { type: "text/csv;charset=utf-8;" });
    downloadFile(blob, fileName);
};

// Alle gefilterde + gesorteerde rijen, zonder paginering
export const getFilteredRows = <T,>(dataRaw: T[], tableOptions: DatagridGetDataArguments<T> | null): T[] => {
    if (!tableOptions) return dataRaw;
    const [rows] = filterDataTable(dataRaw, {
        ...tableOptions,
        pagination: { page: 1, perPage: Math.max(dataRaw.length, 1) },
    });
    return rows;
};

// Kolommen afleiden uit de bestaande Datagrid-config; overrides voor enum/badge-kolommen
export const csvColumnsFromProperties = <T,>(
    properties: DatagridRowConfig<T>[],
    overrides: Partial<Record<string, (item: T) => unknown>> = {}
): CsvColumn<T>[] =>
    properties.map(p => ({
        title: p.title,
        value: overrides[p.prop] ?? ((item: T) => (item as Record<string, unknown>)[p.prop]),
    }));

