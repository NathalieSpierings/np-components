import { renderHook, act, waitFor } from "@testing-library/react";
import type { DatagridRowConfig } from "../../../Config/DatagridRowConfig";
import type {
    ServersideTableQueryConfig,
    ServersideTableQueryResult,
} from "../types";
import useServersideTableQuery from "../useServersideTableQuery";

describe("useServersideTableQuery", () => {
    type TestData = {
        id: number;
        name: string;
        status: string;
    };

    type FetchConfig = () => Promise<ServersideTableQueryConfig<TestData>>;

    type FetchData = (
        queryParameters: URLSearchParams,
    ) => Promise<ServersideTableQueryResult<TestData>>;

    const dataRowConfig: DatagridRowConfig<TestData>[] = [
        {
            prop: "id",
            title: "Id",
        },
        {
            prop: "name",
            title: "Name",
        },
        {
            prop: "status",
            title: "Status",
        },
    ];

    const config: ServersideTableQueryConfig<TestData> = {
        sortProperties: ["name"],
        filterOperations: {
            status: {
                columnFilterType: "text",
                allowedValues: [],
            },
        },
        canSearch: false,
    };

    const data: ServersideTableQueryResult<TestData> = {
        TotalCount: 2,
        Items: [
            {
                id: 1,
                name: "John",
                status: "active",
            },
            {
                id: 2,
                name: "Jane",
                status: "inactive",
            },
        ],
    };

    
     //A promise whose resolution/rejection can be controlled by the test.
     
    const deferred = <T,>() => {
        let resolve!: (value: T) => void;
        let reject!: (reason?: unknown) => void;

        const promise = new Promise<T>((res, rej) => {
            resolve = res;
            reject = rej;
        });

        return {
            promise,
            resolve,
            reject,
        };
    };

    
     //A promise that never resolves.
     //Useful when a test is only interested in one of the hook's
     //two independent requests.
     
    const pending = <T,>() =>
        new Promise<T>(() => {});

    describe("initial state", () => {
        it("starts with loading state and empty data", () => {
            const fetchConfig = jest.fn(() =>
                pending<ServersideTableQueryConfig<TestData>>(),
            );

            const fetchData = jest.fn(() =>
                pending<ServersideTableQueryResult<TestData>>(),
            );

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            expect(result.current.data).toEqual([]);
            expect(result.current.total).toBe(0);
            expect(result.current.dataRowConfig).toEqual([]);
            expect(result.current.isLoading).toBe(true);
            expect(result.current.error).toBeNull();
        });
    });

    describe("configuration", () => {
        it("fetches the configuration once", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);

            const fetchData = jest.fn(() =>
                pending<ServersideTableQueryResult<TestData>>(),
            );

            renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            expect(fetchConfig).toHaveBeenCalledTimes(1);

            await act(async () => {
                configRequest.resolve(config);
            });

            expect(fetchConfig).toHaveBeenCalledTimes(1);
        });

        it("returns an empty dataRowConfig before config has loaded", () => {
            const fetchConfig = jest.fn(() =>
                pending<ServersideTableQueryConfig<TestData>>(),
            );

            const fetchData = jest.fn(() =>
                pending<ServersideTableQueryResult<TestData>>(),
            );

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            expect(result.current.dataRowConfig).toEqual([]);
        });

        it("makes sortable columns sortable according to server config", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);

            const fetchData = jest.fn(() =>
                pending<ServersideTableQueryResult<TestData>>(),
            );

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await act(async () => {
                configRequest.resolve(config);
            });

            const nameConfig = result.current.dataRowConfig.find(
                x => x.prop === "name",
            );

            expect(nameConfig?.sortable).toBe(true);
            expect(nameConfig?.sort).toBeUndefined();
        });

        it("does not make columns sortable when they are not allowed by the server", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);

            const fetchData = jest.fn(() =>
                pending<ServersideTableQueryResult<TestData>>(),
            );

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await act(async () => {
                configRequest.resolve(config);
            });

            const idConfig = result.current.dataRowConfig.find(
                x => x.prop === "id",
            );

            expect(idConfig?.sortable).toBeUndefined();
        });

        it("adds filter configuration according to server config", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);

            const fetchData = jest.fn(() =>
                pending<ServersideTableQueryResult<TestData>>(),
            );

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await act(async () => {
                configRequest.resolve(config);
            });

            const statusConfig = result.current.dataRowConfig.find(
                x => x.prop === "status",
            );

            expect(statusConfig?.filter).toBeDefined();
        });

        it("does not modify the original dataRowConfig", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);

            const fetchData = jest.fn(() =>
                pending<ServersideTableQueryResult<TestData>>(),
            );

            const originalConfig = dataRowConfig.map(item => ({
                ...item,
            }));

            renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await act(async () => {
                configRequest.resolve(config);
            });

            expect(dataRowConfig).toEqual(originalConfig);
        });
    });

    describe("data", () => {
        it("fetches data with empty query parameters initially", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const dataRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn<ReturnType<FetchConfig>, Parameters<FetchConfig>>(
                () => configRequest.promise,
            );

            const fetchData = jest.fn<ReturnType<FetchData>, Parameters<FetchData>>(
                () => dataRequest.promise,
            );

            renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            expect(fetchData).toHaveBeenCalledTimes(1);

            const queryParameters = fetchData.mock.calls[0][0];

            expect(queryParameters).toBeInstanceOf(URLSearchParams);
            expect(queryParameters.toString()).toBe("");

            await act(async () => {
                configRequest.resolve(config);
                dataRequest.resolve(data);
            });
        });

        it("returns the fetched data", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const dataRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);
            const fetchData = jest.fn(() => dataRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await act(async () => {
                configRequest.resolve(config);
                dataRequest.resolve(data);
            });

            expect(result.current.data).toEqual(data.Items);
            expect(result.current.total).toBe(data.TotalCount);
        });

        it("returns empty data before config has loaded", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const dataRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);
            const fetchData = jest.fn(() => dataRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(1);
            });

            await act(async () => {
                dataRequest.resolve(data);
            });

            // Data has arrived, but config has not.
            expect(result.current.data).toEqual([]);
            expect(result.current.total).toBe(0);

            await act(async () => {
                configRequest.resolve(config);
            });

            expect(result.current.data).toEqual(data.Items);
            expect(result.current.total).toBe(data.TotalCount);
        });
    });

    describe("loading state", () => {
        it("is not loading once config and data have finished", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const dataRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);
            const fetchData = jest.fn(() => dataRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            expect(result.current.isLoading).toBe(true);

            await act(async () => {
                configRequest.resolve(config);
                dataRequest.resolve(data);
            });

            expect(result.current.isLoading).toBe(false);
        });

        it("remains loading while config is loading", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);

            const fetchData = jest.fn(() =>
                pending<ServersideTableQueryResult<TestData>>(),
            );

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            expect(result.current.isLoading).toBe(true);

            // Config is still pending, so loading must remain true.
            await act(async () => {
                await Promise.resolve();
            });

            expect(result.current.isLoading).toBe(true);

            // Resolve it so the test doesn't leave an active promise.
            await act(async () => {
                configRequest.resolve(config);
            });
        });

        it("remains loading while data is loading", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const dataRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);
            const fetchData = jest.fn(() => dataRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await act(async () => {
                configRequest.resolve(config);
            });

            expect(result.current.isLoading).toBe(true);

            await act(async () => {
                dataRequest.resolve(data);
            });

            expect(result.current.isLoading).toBe(false);
        });
    });

    describe("onFilterUpdate", () => {
        it("fetches data again when table options change", async () => {
            const firstRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const secondRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn().mockResolvedValue(config);

            const fetchData = jest
                .fn()
                .mockImplementationOnce(() => firstRequest.promise)
                .mockImplementationOnce(() => secondRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(1);
            });

            await act(async () => {
                firstRequest.resolve(data);
            });

            act(() => {
                result.current.onFilterUpdate({
                    searchTerm: "john",
                    sort: undefined,
                    pagination: {
                        page: 1,
                        perPage: 10,
                    },
                    columnFilters: {},
                });
            });

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(2);
            });

            await act(async () => {
                secondRequest.resolve(data);
            });
        });

        it("passes the updated search term to fetchData", async () => {
            const firstRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const secondRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn().mockResolvedValue(config);

            const fetchData = jest
                .fn()
                .mockImplementationOnce(() => firstRequest.promise)
                .mockImplementationOnce(() => secondRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(1);
            });

            await act(async () => {
                firstRequest.resolve(data);
            });

            act(() => {
                result.current.onFilterUpdate({
                    searchTerm: "john",
                    sort: undefined,
                    pagination: {
                        page: 2,
                        perPage: 25,
                    },
                    columnFilters: {},
                });
            });

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(2);
            });

            const queryParameters = fetchData.mock.calls[1][0];

            expect(queryParameters.get("searchterm")).toBe("john");
            expect(queryParameters.get("pagination.page")).toBe("2");
            expect(queryParameters.get("pagination.perpage")).toBe("25");

            await act(async () => {
                secondRequest.resolve(data);
            });
        });

        it("passes sorting parameters to fetchData", async () => {
            const firstRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const secondRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn().mockResolvedValue(config);

            const fetchData = jest
                .fn()
                .mockImplementationOnce(() => firstRequest.promise)
                .mockImplementationOnce(() => secondRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(1);
            });

            await act(async () => {
                firstRequest.resolve(data);
            });

            act(() => {
                result.current.onFilterUpdate({
                    searchTerm: "",
                    sort: {
                        prop: "name",
                        order: "desc",
                    },
                    pagination: {
                        page: 1,
                        perPage: 10,
                    },
                    columnFilters: {},
                });
            });

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(2);
            });

            const queryParameters = fetchData.mock.calls[1][0];

            expect(queryParameters.get("sort.property")).toBe("name");
            expect(queryParameters.get("sort.order")).toBe("desc");

            await act(async () => {
                secondRequest.resolve(data);
            });
        });

        it("passes column filters to fetchData", async () => {
            const firstRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const secondRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn().mockResolvedValue(config);

            const fetchData = jest
                .fn()
                .mockImplementationOnce(() => firstRequest.promise)
                .mockImplementationOnce(() => secondRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(1);
            });

            await act(async () => {
                firstRequest.resolve(data);
            });

            act(() => {
                result.current.onFilterUpdate({
                    searchTerm: "",
                    sort: undefined,
                    pagination: {
                        page: 1,
                        perPage: 10,
                    },
                    columnFilters: {
                        status: {
                            operator: "equals",
                            value: "active",
                        },
                    },
                });
            });

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(2);
            });

            const queryParameters = fetchData.mock.calls[1][0];

            expect(
                queryParameters.get("columnfilter.status.operator"),
            ).toBe("equals");

            expect(queryParameters.getAll("columnfilter.status.values")).toEqual(["active"]);

            await act(async () => {
                secondRequest.resolve(data);
            });
        });
    });

    describe("errors", () => {
        it("returns config error", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const dataRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);
            const fetchData = jest.fn(() => dataRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            const error = new Error("Failed to fetch config");

            await act(async () => {
                configRequest.reject(error);
                dataRequest.resolve(data);
            });

            expect(result.current.error).toBe(error);
            expect(result.current.isLoading).toBe(false);
        });

        it("returns data error", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const dataRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);
            const fetchData = jest.fn(() => dataRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            const error = new Error("Failed to fetch data");

            await act(async () => {
                configRequest.resolve(config);
                dataRequest.reject(error);
            });

            expect(result.current.error).toBe(error);
            expect(result.current.isLoading).toBe(false);
        });

        it("prefers the config error when both requests fail", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const dataRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);
            const fetchData = jest.fn(() => dataRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            const configError = new Error("Failed to fetch config");
            const dataError = new Error("Failed to fetch data");

            await act(async () => {
                configRequest.reject(configError);
                dataRequest.reject(dataError);
            });

            expect(result.current.error).toBe(configError);
            expect(result.current.isLoading).toBe(false);
        });
    });

    describe("cancellation", () => {
        it("does not update config after unmount", async () => {
            const configRequest = deferred<
                ServersideTableQueryConfig<TestData>
            >();

            const fetchConfig = jest.fn(() => configRequest.promise);

            const fetchData = jest.fn(() =>
                pending<ServersideTableQueryResult<TestData>>(),
            );

            const { result, unmount } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            unmount();

            await act(async () => {
                configRequest.resolve(config);
            });

            expect(result.current.dataRowConfig).toEqual([]);
        });

        it("does not update data after unmount", async () => {
            const dataRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const fetchConfig = jest.fn().mockResolvedValue(config);
            const fetchData = jest.fn(() => dataRequest.promise);

            const { result, unmount } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(1);
            });

            unmount();

            await act(async () => {
                dataRequest.resolve(data);
            });

            expect(result.current.data).toEqual([]);
            expect(result.current.total).toBe(0);
        });

        it("ignores a stale data response when a newer request has started", async () => {
            const firstRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const secondRequest = deferred<
                ServersideTableQueryResult<TestData>
            >();

            const firstResult: ServersideTableQueryResult<TestData> = {
                TotalCount: 1,
                Items: [
                    {
                        id: 1,
                        name: "Old",
                        status: "active",
                    },
                ],
            };

            const secondResult: ServersideTableQueryResult<TestData> = {
                TotalCount: 1,
                Items: [
                    {
                        id: 2,
                        name: "New",
                        status: "active",
                    },
                ],
            };

            const fetchConfig = jest.fn().mockResolvedValue(config);

            const fetchData = jest
                .fn()
                .mockImplementationOnce(() => firstRequest.promise)
                .mockImplementationOnce(() => secondRequest.promise);

            const { result } = renderHook(() =>
                useServersideTableQuery(
                    fetchConfig,
                    fetchData,
                    dataRowConfig,
                ),
            );

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(1);
            });

            act(() => {
                result.current.onFilterUpdate({
                    searchTerm: "new",
                    sort: undefined,
                    pagination: {
                        page: 1,
                        perPage: 10,
                    },
                    columnFilters: {},
                });
            });

            await waitFor(() => {
                expect(fetchData).toHaveBeenCalledTimes(2);
            });

            // New request finishes first.
            await act(async () => {
                secondRequest.resolve(secondResult);
            });

            expect(result.current.data).toEqual(secondResult.Items);
            expect(result.current.total).toBe(secondResult.TotalCount);

            // Old request finishes afterwards.
            await act(async () => {
                firstRequest.resolve(firstResult);
            });

            // The stale response must not overwrite the newer result.
            expect(result.current.data).toEqual(secondResult.Items);
            expect(result.current.total).toBe(secondResult.TotalCount);
        });
    });
});