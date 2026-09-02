import type { DatagridGetDataArguments } from "../../../Config/DatagridData";
import { getDatagridGetDataArguments, getServersideTableQueryParams } from "../useServersideTableQueryParams";

describe("getServersideTableQueryParams", () => {
    const createFilters = (
        overrides: Partial<DatagridGetDataArguments<{ name: string; status: string }>> = {},
    ): DatagridGetDataArguments<{ name: string; status: string }> => ({
        searchTerm: "",
        sort: undefined,
        pagination: {
            page: 1,
            perPage: 10,
        },
        columnFilters: {},
        ...overrides,
    });

    it("returns empty params when filters is null", () => {
        const result = getServersideTableQueryParams(null);

        expect(result.toString()).toBe("");
    });

    it("returns empty params when no filters are set", () => {
        const result = getServersideTableQueryParams(createFilters());

        expect(result.toString()).toBe(
            "pagination.page=1&pagination.perpage=10",
        );
    });

    describe("search term", () => {
        it("adds a non-empty search term", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    searchTerm: "john",
                }),
            );

            expect(result.get("searchterm")).toBe("john");
        });

        it("does not add an empty search term", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    searchTerm: "",
                }),
            );

            expect(result.has("searchterm")).toBe(false);
        });
    });

    describe("sorting", () => {
        it("adds sort property and order", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    sort: {
                        prop: "name",
                        order: "asc",
                    },
                }),
            );

            expect(result.get("sort.property")).toBe("name");
            expect(result.get("sort.order")).toBe("asc");
        });

        it("supports descending sort order", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    sort: {
                        prop: "name",
                        order: "desc",
                    },
                }),
            );

            expect(result.get("sort.property")).toBe("name");
            expect(result.get("sort.order")).toBe("desc");
        });

        it("does not add sort parameters when sort is undefined", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    sort: undefined,
                }),
            );

            expect(result.has("sort.property")).toBe(false);
            expect(result.has("sort.order")).toBe(false);
        });
    });

    describe("pagination", () => {
        it("adds page and per-page parameters", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    pagination: {
                        page: 3,
                        perPage: 25,
                    },
                }),
            );

            expect(result.get("pagination.page")).toBe("3");
            expect(result.get("pagination.perpage")).toBe("25");
        });
    });

    describe("column filters", () => {
        it("adds a filter operator and value", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    columnFilters: {
                        name: {
                            operator: "contains",
                            value: "john",
                        },
                    },
                }),
            );

            expect(result.get("columnfilter.name.operator")).toBe("contains");
            expect(result.getAll("columnfilter.name.values")).toEqual(["john"]);
        });

        it("adds valueTo when provided", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    columnFilters: {
                        name: {
                            operator: "between",
                            value: "a",
                            valueTo: "z",
                        },
                    },
                }),
            );

            expect(result.get("columnfilter.name.operator")).toBe("between");
            expect(result.getAll("columnfilter.name.values")).toEqual(["a", "z"]);
        });

        it("adds all values from values", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    columnFilters: {
                        status: {
                            operator: "equals",
                            values: ["active", "pending"],
                        },
                    },
                }),
            );

            expect(result.get("columnfilter.status.operator")).toBe("equals");
            expect(result.getAll("columnfilter.status.values")).toEqual(["active", "pending"]);
        });

        it("does not add undefined values", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    columnFilters: {
                        name: {
                            operator: "equals",
                            value: undefined,
                            valueTo: null!,
                            values: ["john"],
                        },
                    },
                }),
            );

            expect(result.getAll("columnfilter.name.values")).toEqual(["john"]);
        });

        it("converts undefined to oneOf", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    columnFilters: {
                        name: {
                            values: ["john", "paul"],
                        },
                    },
                }),
            );

            expect(result.get("columnfilter.name.operator")).toEqual("oneOf");
            expect(result.getAll("columnfilter.name.values")).toEqual(["john", "paul"]);
        });

        it("handles multiple column filters", () => {
            const result = getServersideTableQueryParams(
                createFilters({
                    columnFilters: {
                        name: {
                            operator: "contains",
                            value: "john",
                        },
                        status: {
                            operator: "equals",
                            value: "active",
                        },
                    },
                }),
            );

            expect(result.get("columnfilter.name.operator")).toBe("contains");
            expect(result.getAll("columnfilter.name.values")).toEqual(["john"]);

            expect(result.get("columnfilter.status.operator")).toBe("equals");
            expect(result.getAll("columnfilter.status.values")).toEqual(["active"]);
        });
    });

    it("combines search, sorting, pagination and column filters", () => {
        const result = getServersideTableQueryParams(
            createFilters({
                searchTerm: "john",
                sort: {
                    prop: "name",
                    order: "desc",
                },
                pagination: {
                    page: 2,
                    perPage: 25,
                },
                columnFilters: {
                    status: {
                        operator: "equals",
                        value: "active",
                    },
                },
            }),
        );

        expect(result.get("searchterm")).toBe("john");

        expect(result.get("sort.property")).toBe("name");
        expect(result.get("sort.order")).toBe("desc");

        expect(result.get("pagination.page")).toBe("2");
        expect(result.get("pagination.perpage")).toBe("25");

        expect(result.get("columnfilter.status.operator")).toBe("equals");
        expect(result.getAll("columnfilter.status.values")).toEqual(["active"]);
    });
});

describe("getDatagridGetDataArguments", () => {
    interface RoundTripTestData {
        name: string;
        status: string;
        deleted: boolean;
        createdAt: string;
        category: string;
    }

    it("roundtrips: getServersideTableQueryParams -> getDatagridGetDataArguments", () => {
        const filters = {
            searchTerm: "hello",
            sort: {
                prop: "name",
                order: "desc",
            },
            pagination: {
                page: 3,
                perPage: 50,
            },
            columnFilters: {
                status: {
                    operator: "blank",
                },
                deleted: {
                    operator: "notBlank",
                },
                createdAt: {
                    operator: "between",
                    value: "2026-01-01",
                    valueTo: "2026-12-31",
                },
                category: {
                    values: ["foo", "bar", "baz"],
                },
                name: {
                    operator: "contains",
                    value: "john",
                },
            },
        } satisfies DatagridGetDataArguments<RoundTripTestData>;

        const params = getServersideTableQueryParams<RoundTripTestData>(filters);
        const result = getDatagridGetDataArguments<RoundTripTestData>(params);

        expect(result).toEqual({
            searchTerm: "hello",
            sort: {
                prop: "name",
                order: "desc",
            },
            pagination: {
                page: 3,
                perPage: 50,
            },
            columnFilters: {
                status: {
                    operator: "blank",
                },
                deleted: {
                    operator: "notBlank",
                },
                createdAt: {
                    operator: "between",
                    value: "2026-01-01",
                    valueTo: "2026-12-31",
                },
                category: {
                    values: ["foo", "bar", "baz"],
                },
                name: {
                    operator: "contains",
                    value: "john",
                },
            },
        });
    })
});
