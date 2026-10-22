import type { DatagridGetDataArguments } from "../../Config/DatagridData";
import type { DatagridRowConfig } from "../../Config/DatagridRowConfig";
import { filterDataTable } from "../useTableQueryClientFilter";

describe("filterDataTable", () => {
    type Row = { id: number; code: number; name: string };

    const rows: Row[] = [
        { id: 1, code: 5517, name: "Noord" },
        { id: 2, code: 5523, name: "Eilanden" },
        { id: 3, code: 3341, name: "Caresco" },
    ];

    const propertyConfigs: DatagridRowConfig<Row>[] = [
        { prop: "code", title: "Code", filter: { type: "number" } },
        { prop: "name", title: "Naam", filter: { type: "text" } },
    ];

    const filter = (columnFilters: DatagridGetDataArguments<Row>["columnFilters"]) =>
        filterDataTable(rows, { columnFilters, propertyConfigs, pagination: { page: 1, perPage: 10 } } as DatagridGetDataArguments<Row>)[0].map(
            ({ id }) => id
        );

    it("filters a number column on one of a list of values", () => {
        expect(filter({ code: { values: ["5517", "3341"] } })).toEqual([1, 3]);
    });

    it("filters a text column on one of a list of values", () => {
        expect(filter({ name: { values: ["eilanden"] } })).toEqual([2]);
    });

    it("still filters a number column with an operator", () => {
        expect(filter({ code: { operator: "greaterThan", value: "5000" } })).toEqual([1, 2]);
    });
});
