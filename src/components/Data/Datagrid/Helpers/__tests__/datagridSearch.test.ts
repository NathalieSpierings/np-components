import type { DatagridRowConfig } from "../../Config/DatagridRowConfig";
import { defaultSearch } from "../datagridDataManipulation";
import { getColumnFiltersFromSearch } from "../datagridSearchToFilters";

interface Product {
    id: number;
    naam: string;
    sku: string;
    status: string;
    categorie: string;
    datum: string;
    intern?: string;
    leverancier: { naam: string };
}

const rows: Product[] = [
    { id: 1, naam: "Tuinstoel", sku: "TS-001", status: "A", categorie: "Tuin", datum: "2026-01-16", intern: "geheim", leverancier: { naam: "Acme" } },
    { id: 2, naam: "Tuintafel", sku: "TT-002", status: "I", categorie: "Tuin", datum: "2026-02-01", leverancier: { naam: "Nordic" } },
    { id: 3, naam: "Bureaustoel", sku: "BS-003", status: "A", categorie: "Wonen", datum: "2025-12-24", leverancier: { naam: "Acme" } },
];

const columns: DatagridRowConfig<Product>[] = [
    { prop: "id", title: "Id", filter: { type: "number" } },
    { prop: "naam", title: "Naam", filter: { type: "text" } },
    { prop: "sku", title: "SKU", filter: { type: "text" } },
    { prop: "status", title: "Status", transformValue: (v) => (v === "A" ? "Actief" : "Inactief") },
    {
        prop: "categorie", title: "Categorie",
        filter: { type: "select", options: [{ label: "Buitenleven", value: "Tuin" }, { label: "Wonen", value: "Wonen" }] }
    },
    { prop: "datum", title: "Datum", filter: { type: "date" } },
    { prop: "intern", title: "Intern", searchable: false },
    { prop: "leverancier", title: "Leverancier", useItemOnly: (item) => item.leverancier.naam, searchValue: (item) => item.leverancier.naam },
];

const ids = (items: Product[]) => items.map(x => x.id);

describe("defaultSearch", () => {
    it("returns all rows for an empty search term", () => {
        expect(ids(defaultSearch(rows, "   ", columns))).toEqual([1, 2, 3]);
    });

    it("searches case-insensitive in text columns", () => {
        expect(ids(defaultSearch(rows, "STOEL", columns))).toEqual([1, 3]);
    });

    it("requires every word to match somewhere in the row", () => {
        expect(ids(defaultSearch(rows, "stoel tuin", columns))).toEqual([1]);
    });

    it("matches on transformed values", () => {
        expect(ids(defaultSearch(rows, "inactief", columns))).toEqual([2]);
    });

    it("matches on select option labels", () => {
        expect(ids(defaultSearch(rows, "buitenleven", columns))).toEqual([1, 2]);
    });

    it("matches dates in both formats", () => {
        expect(ids(defaultSearch(rows, "16-01-2026", columns))).toEqual([1]);
        expect(ids(defaultSearch(rows, "2026-02", columns))).toEqual([2]);
    });

    it("uses searchValue for custom columns", () => {
        expect(ids(defaultSearch(rows, "nordic", columns))).toEqual([2]);
    });

    it("skips columns with searchable: false", () => {
        expect(defaultSearch(rows, "geheim", columns)).toEqual([]);
    });
});

describe("getColumnFiltersFromSearch", () => {
    it("returns empty filters when nothing matches", () => {
        const result = getColumnFiltersFromSearch(rows, "xyz", columns);
        expect(result.filters).toEqual({});
        expect(result.matchedRows).toEqual([]);
    });

    it("sets a contains filter on the column with the most hits", () => {
        const result = getColumnFiltersFromSearch(rows, "stoel", columns, { columns: ["sku", "naam"] });
        expect(result.column).toBe("naam");
        expect(result.filters).toEqual({ naam: { operator: "contains", value: "stoel" } });
        expect(ids(result.matchedRows)).toEqual([1, 3]);
    });

    it("uses the first column with hits for strategy firstMatch", () => {
        const result = getColumnFiltersFromSearch(rows, "t", columns, { columns: ["sku", "naam"], strategy: "firstMatch" });
        expect(result.column).toBe("sku");
    });

    it("sets select values for select columns", () => {
        const result = getColumnFiltersFromSearch(rows, "buitenleven", columns, { columns: ["categorie"] });
        expect(result.filters).toEqual({ categorie: { values: ["Tuin"] } });
    });

    it("sets an equals filter for numeric columns", () => {
        const result = getColumnFiltersFromSearch(rows, "2", columns, { columns: ["id"] });
        expect(result.filters).toEqual({ id: { operator: "equals", value: "2" } });
    });
});
