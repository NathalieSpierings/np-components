import { Meta, StoryFn } from "@storybook/react-webpack5";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Datagrid from "../../../Datagrid";
import { MemoryRouter } from "react-router";
import { SvgSprite } from "../../../../../../assets/SvgSprite";
import { defaultProductColumns, serversideQueryConfig } from "../../../../../../lib/testdata/mock";
import { ProductGetModel, generateProducts } from "../../../../../../lib/testdata/models";
import useServersideTableQuery, { ApplyConfigToTable } from "../useServersideTableQuery";
import type { ServersideTableQueryConfig, ServersideTableQueryResult } from "../types";
import { getDatagridGetDataArguments } from "../useServersideTableQueryParams";
import { filterDataTable } from "../../useTableQueryClientFilter";

const queryClient = new QueryClient();

const meta: Meta<typeof Datagrid> = {
    title: 'Data/useServerSideTableQuery',
    component: Datagrid,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <SvgSprite />
                <QueryClientProvider client={queryClient}>
                    <Story />
                </QueryClientProvider>
            </MemoryRouter>
        ),
    ]
};

export default meta;

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

// Setup some fake-fetch functions, which emulate the server
const products = generateProducts(500);

const fetchConfig = async () : Promise<ServersideTableQueryConfig<ProductGetModel>> => {
        // Wait a second to simulate call to server /config-endpoint
    await timeout(1000);

    return serversideQueryConfig
}

const fetchQuery = async (queryParameters: URLSearchParams) : Promise<ServersideTableQueryResult<ProductGetModel>> => {
    // Wait a second to simulate call to server endpoint
    await timeout(1000); 

    try {
        // Use filterDataTable to emulate server (Not all filters will work though)
        const filters = getDatagridGetDataArguments<ProductGetModel>(queryParameters);

        // Let old client-side filter emulate the server
        const [items, totalCount] = filterDataTable(products, {
            ...filters,
            propertyConfigs: ApplyConfigToTable(serversideQueryConfig, defaultProductColumns() as any)
        });

        return {
            Items: items,
            TotalCount: totalCount,
        }
    } catch (e) {
        console.error("Caught exception in fake fetchQuery", e);
        throw e;
    }
}

export const Default: StoryFn = () => {
    const {data, total, isLoading, onFilterUpdate, dataRowConfig } = useServersideTableQuery(
        fetchConfig,
        fetchQuery,
        defaultProductColumns() as any,
    );

    return (
        <Datagrid
            data={data || []}
            total={total}
            loading={isLoading}
            onFilterUpdate={onFilterUpdate}
            enableFiltersInHeader
            enableTabs
            enableTabFilters
            properties={dataRowConfig}
        />
    )
}