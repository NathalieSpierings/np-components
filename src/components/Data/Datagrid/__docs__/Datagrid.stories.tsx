
import type { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { MemoryRouter } from 'react-router';
import { SvgSprite } from '../../../../assets/SvgSprite';
import { defaultProductColumns, filterProductColumns } from '../../../../lib/testdata/mock';
import { getProductsQuery, getProductsWithOrdersQuery, ProductGetModel, ProductMetOrdersModel } from '../../../../lib/testdata/models';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import SearchInput from '../../../Forms/SearchInput/SearchInput';
import Toggle from '../../../Forms/Toggle/Toggle';
import Title from '../../../Typography/Title/Title';
import Button from '../../../UI/Button/Button';
import ContentItem from '../../../UI/ContentItem/ContentItem';
import Icon from '../../../UI/Icons/Icon/Icon';
import Tooltip from '../../../UI/Tooltip/Tooltip';
import DatagridClearFiltersButton from '../Addons/DatagridClearFiltersButton';
import { ColumnFilters, DatagridGetDataArguments } from '../Config/DatagridData';
import Datagrid, { DatagridRowActionsPosition, DatagridSidebarPosition, DatagridTabberPosition } from '../Datagrid';
import { hasActiveColumnFilters } from '../Filters/DatagridColumnFilter';
import { useTableQueryClientFilter } from '../Hooks/useTableQueryClientFilter';
import { PaginationInfoPosition } from '../Pagination';
import ProductDetails from './ProductDetails';
import { ProductOrdersNested } from './ProductOrdersNested';
import { ProductOrdersWithDetails } from './ProductOrdersNestedTable';
import { ProductOrders } from './ProductOrdersTable';
import { ProductWithOrdersNested } from './ProductWithOrdersNested';
import { useExternalProductSearch } from './useExternalProductSearch';

const queryClient = new QueryClient();

const meta: Meta<typeof Datagrid> = {
    title: 'Data/Datagrid',
    component: Datagrid,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <SvgSprite />
                <QueryClientProvider client={queryClient}>
                    <div className="centered centered--wide mt-5">
                        <Story />
                    </div>
                </QueryClientProvider>
            </MemoryRouter>
        ),
    ]
};

export default meta;


function ProductSidebarContent({ item }: Readonly<{ item?: Readonly<{ naam: string; sku: string; prijs: number; categorie: string }> | null }>) {
    if (!item) {
        return <div>Selecteer een rij</div>;
    }

    return (
        <div>
            <h3>{item.naam}</h3>
            <p>SKU: {item.sku}</p>
            <p>Prijs: € {item.prijs}</p>
            <p>Categorie: {item.categorie}</p>
        </div>
    );
}

export const Default: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            enableColumnReorder
            properties={defaultProductColumns() as any}
        />
    )
}

export const Nested: StoryFn = () => {

    const [selected, setSelected] = useState<ProductMetOrdersModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductMetOrdersModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsWithOrdersQuery(),
        filters: tableOptions
    });

    return (

        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            collapsibleRowData={ProductOrdersNested}
            hasCollapsibleRow={(product) =>
                product.orders.length > 0
            }
            initialPageSize={10}
            enableColumnPinning
            enableColumnVisibility
            enableColumnMenu
            enableColumnMenuColumnVisibility
            enableCompactView
            enableColumnReorder
            enableColumnResize
            enableStickyHeader
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: ${row.naam}`);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Double clicked row ${row.naam}`);
            }}
            properties={defaultProductColumns() as any}
        />
    )
}

export const NestedWithSummaryRow: StoryFn = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (

        <>
            <p>enableSummaryRow prop is added and on the table properties 'summary: true' is set. </p>
            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                collapsibleRowData={ProductOrdersNested}
                initialPageSize={10}
                enableCompactView
                enableSummaryRow
                enableRowHover
                enableStickyHeader
                enableColumnReorder
                enableColumnResize
                enableColumnPinning
                enableColumnVisibility
                enableColumnMenu
                enableColumnMenuColumnVisibility
                selectedRow={selected}
                rowSingleClickAction={(row) => {
                    setSelected(row)
                    console.log(`Clicked row: ${row.naam}`);
                }}
                rowDoubleClickAction={(row) => {
                    setSelected(row)
                    console.log(`Double clicked row ${row.naam}`);
                }}
                properties={defaultProductColumns() as any}
            />
        </>
    )
}

export const NoArrowIfNoNestedRecords: StoryFn = () => {

    const [selected, setSelected] = useState<ProductMetOrdersModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductMetOrdersModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsWithOrdersQuery(),
        filters: tableOptions
    });

    return (

        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            collapsibleRowData={ProductWithOrdersNested}
            hasCollapsibleRow={(product) =>
                product.orders.length > 0
            }
            initialPageSize={10}
            enableColumnPinning
            enableColumnVisibility
            enableColumnMenu
            enableColumnMenuColumnVisibility
            enableCompactView
            enableColumnReorder
            enableColumnResize
            enableStickyHeader
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: ${row.naam}`);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Double clicked row ${row.naam}`);
            }}
            properties={defaultProductColumns() as any}
        />
    )
}


export const ColumnFilter: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            localStorageKey="dg-column-filter"
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            enableFiltersInHeader
            properties={filterProductColumns() as any}
        />
    )
}

export const ColumnPinning: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            localStorageKey="dg-column-pinning"
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            enableColumnPinning
            enableColumnMenu
            properties={defaultProductColumns() as any}
        />
    )
}

export const ColumnReorder: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <>
            <p>Sleep een kolom om hem te verplaatsen</p>

            <Datagrid
                localStorageKey="dg-column-reorder"
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                enableColumnReorder
                properties={defaultProductColumns() as any}
            />
        </>
    )
}

export const ColumnResize: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (

        <>
            <p>Hover over een kolom om met de griphandle de kolom breedte te wijzigen </p>
            <p>Het menu bevat een autosize kolommen optie. Deze brengt de kolom weer terug naar zijn oorspronkelijke breedte.</p>
            <p>De menu optie reset kolommen zet alle kolommen terug naar zijn default waardes qua breedte en volgorde en zichtbaarheid.</p>
            <Datagrid
                localStorageKey="dg-column-resize"
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                enableColumnResize
                enableColumnMenu
                properties={defaultProductColumns() as any}
            />
        </>
    )
}

export const ColumnVisibility: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (

        <>
            <p>Kies een kolom om aan of uit te zetten in het menu</p>

            <Datagrid
                localStorageKey="dg-column-visibiltiy"
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                enableColumnVisibility
                enableColumnMenu
                enableColumnMenuColumnVisibility
                properties={filterProductColumns() as any}
            />
        </>
    )
}

export const Checkboxes: StoryFn = () => {

    const [checkedItems, setCheckedItems] = useState<ProductGetModel[]>([]);

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (

        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            enableCheckboxes
            checkedItems={checkedItems}
            onRowsChecked={setCheckedItems}
            properties={filterProductColumns() as any}
        />
    )
}

export const RowKey: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            getRowKey={(item) => `${item.naam}-${item.id}`}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            enableColumnReorder
            properties={defaultProductColumns() as any}
        />
    )
}

export const RowHover: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            enableColumnReorder
            enableRowHover
            properties={defaultProductColumns() as any}
        />
    )
}

export const HeaderFooter: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (

        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            toolbarTitle={<Title size="md">All products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="create" onClick={() => alert('Create')}>
                    <Icon icon={IconDefinitions.plus} />
                    Toevoegen
                </Button>
            ]}
            collapsibleRowData={ProductOrders}
            tableHeaderContent={(<span>Table header content goes here... Hier kan later bijv. column grouping in als we dit maken of een externe zoekbalk of iets dergelijkst </span>)}
            tableFooterContent={(<span>Table footer content goes here... Hier kan later bijv. rij totalen in of iets anders </span>)}
            footerContent={(<span>Footer content goes here... Denk aan bijv. totalen of andere beschrijvingen</span>)}
            properties={defaultProductColumns() as any}
        />

    )
}

export const Loading: StoryFn = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={loading}
            onFilterUpdate={setTableOptions}
            toolbarTitle={<Title size="md">Alle products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="loadingEnabler" onClick={() => setLoading(!loading)}> {loading === false ? "Enable" : "Disable"} loading</Button>,
            ]}
            toolbarPostfixItems={[
                <Icon key="download" icon={IconDefinitions.file_csv} />
            ]}
            collapsibleRowData={ProductOrders}
            properties={defaultProductColumns() as any}
        />
    )
}

export const Pager: StoryFn = () => {

    // Paging
    const [paginationInfoPosition, setPaginationInfoPosition] = useState<PaginationInfoPosition>("right");

    const pageSizesDefaults = [5, 10, 25, 50, 100];
    const pageSizesExtended = [5, 10, 25, 50, 100, 250, 500, 1000];
    const [extendedPageSizes, setExtendedPageSizes] = useState(false);
    const pageSizes = extendedPageSizes ? pageSizesExtended : pageSizesDefaults;


    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const togglePagerInfoPosition = () => {
        const nextPosition = paginationInfoPosition === "right" ? "left" : "right";
        setPaginationInfoPosition(nextPosition);
    };

    const togglePageSizes = () => {
        setExtendedPageSizes(current => !current);
    };


    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            toolbarTitle="All products"
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="pager" onClick={togglePagerInfoPosition}>Pager info naar {paginationInfoPosition === "right" ? "left" : "right"}</Button>,
                <Button key="pagesizes" onClick={togglePageSizes}>Pagesizes {extendedPageSizes ? "extended" : "default"}</Button>
            ]}
            collapsibleRowData={ProductOrders}

            //pagination
            paginationRowInfoPosition={paginationInfoPosition}
            pageSizeOptions={pageSizes}
            footerContent={(<span>Dit is een test</span>)}
            properties={defaultProductColumns() as any}
        />
    )
}

export const PagerInitialSize: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (

        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            toolbarTitle={<Title size="md">All products</Title>}
            toolbarBorderBottom={true}
            collapsibleRowData={ProductOrders}
            initialPageSize={5}
            footerContent={(<span>Dit is een test</span>)}
            properties={defaultProductColumns() as any}
        />

    )
}

export const RowActions: StoryFn = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [actionsPosition, setActionsPosition] = useState<DatagridRowActionsPosition>('right');

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });


    const toggleActionsPosition = () => {
        const nextPosition = actionsPosition === "right" ? "left" : "right";
        setActionsPosition(nextPosition);
    };

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            toolbarTitle={<Title size="md">Alle products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[

                <Button key="actions" onClick={toggleActionsPosition}>Actions naar {actionsPosition === "right" ? "links" : "rechts"}</Button>,

            ]}
            toolbarPostfixItems={[
                <Icon key="icon" icon={IconDefinitions.file_csv} />
            ]}


            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: ${row.naam}`);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Double clicked row ${row.naam}`);
            }}
            properties={defaultProductColumns() as any}
            rowActionPosition={actionsPosition}
            rowActions={[{
                icon: <Tooltip content="Bekijk"><Icon icon={IconDefinitions.eye} hover={true} iconCss="pointer" /></Tooltip>,
                action: (item) => { alert(`Bekijk order ${item.naam}`) }
            },
            {
                icon: <Tooltip content="Verwijder"><Icon icon={IconDefinitions.bin} color={ColorDefinitions.Red} hover={true} iconCss="pointer" /></Tooltip>,
                action: (item) => { alert(`Verwijder order ${item.naam}`) }
            }]}
        />
    )
}

export const SelectedRow: StoryFn = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <>
            <p>Bekijk de console om de klik acties te zien</p>
            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                collapsibleRowData={ProductOrders}
                selectedRow={selected}
                rowSingleClickAction={(row) => {
                    setSelected(row)
                    console.log(`Clicked row: ${row.naam}`);
                }}
                rowDoubleClickAction={(row) => {
                    setSelected(row)
                    console.log(`Double clicked row ${row.naam}`);
                }}
                properties={defaultProductColumns() as any}
            />
        </>
    )
}

export const SidebarAndTabs: StoryFn = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [tabsDirection, setTabsDirection] = useState<DatagridTabberPosition>("right");
    const [enableTabFilters, setEnableTabFilters] = useState(false);
    const [enableTabColumnVisibility, setEnableTabColumnVisibility] = useState(false);
    const [sidebarDirection, setSidebarDirection] = useState<DatagridSidebarPosition>("right");

    const toggleTabberPosition = () => {
        const nextPosition = tabsDirection === "right" ? "left" : "right";
        setTabsDirection(nextPosition);
    };

    const toggleSidebarPosition = () => {
        const nextPosition = sidebarDirection === "right" ? "left" : "right";
        setSidebarDirection(nextPosition);
    };

    return (

        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            collapsibleRowData={ProductOrders}
            toolbarTitle={<Title size="md">Alle products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="tabber" onClick={toggleTabberPosition}>Tabs naar {tabsDirection === "right" ? "links" : "rechts"}</Button>,
                <Button key="enableTabFilters" onClick={() => setEnableTabFilters(!enableTabFilters)}>{enableTabFilters === false ? "Enable" : "Disible"} tab filters</Button>,
                <Button key="enableTabColumnVisibility" onClick={() => setEnableTabColumnVisibility(!enableTabColumnVisibility)}>{enableTabColumnVisibility === false ? "Enable" : "Disible"} column tab column visibility</Button>,
                <Button key="sidebar" onClick={toggleSidebarPosition}>Sidebar naar {sidebarDirection === "right" ? "links" : "rechts"}</Button>

            ]}
            toolbarPostfixItems={[
                <Icon key="icon" icon={IconDefinitions.file_csv} />
            ]}


            enableColumnReorder
            enableColumnResize
            enableStickyHeader
            enableColumnVisibility
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: ${row.naam}`);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Double clicked row ${row.naam}`);
            }}

            enableTabs
            tabberPosition={tabsDirection}
            enableTabColumnVisibility={enableTabColumnVisibility}
            enableTabFilters={enableTabFilters}
            tabs={[{
                id: "tabTest",
                title: "Test",
                icon: <Icon icon={IconDefinitions.info_circle} size={SizeDefinitions.Small} />
            },
            ]}
            tabPanes={[
                {
                    tabId: "tabTest",
                    content: (<span>Custom content goes here...</span>),
                    header: {
                        content: "Test tab"
                    }
                },

            ]}

            enableSidebar
            sidebarPosition={sidebarDirection}
            sidebar={{
                header: {
                    content: "Product details",
                    borderColor: ColorDefinitions.Surface,
                },
                content: ProductSidebarContent,
                footer: {
                    content: <Button>Opslaan</Button>,
                    borderColor: ColorDefinitions.Surface,
                },
            }}
            properties={filterProductColumns() as any}
        />
    )
}



export const Sidebar: StoryFn = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [sidebarDirection, setSidebarDirection] = useState<DatagridSidebarPosition>("right");

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const toggleSidebarPosition = () => {
        const nextPosition = sidebarDirection === "right" ? "left" : "right";
        setSidebarDirection(nextPosition);
    };

    return (
        <>
            <p>Dubbel klik op een rij om de sidebar te openen. Je kan de sidebar ook groter maken door aan de zijkant midden te slepen. Default is de sidebar 400 breed. De min size is 280 en de max side 600. Dit kan je ook aanpassen</p>
            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                collapsibleRowData={ProductOrders}
                toolbarTitle={<Title size="md">Alle products</Title>}
                toolbarBorderBottom={true}
                toolbarPrefixItems={[
                    <Button key="sidebar" onClick={toggleSidebarPosition}>Sidebar naar {sidebarDirection === "right" ? "links" : "rechts"}</Button>
                ]}
                toolbarPostfixItems={[
                    <Icon key="icon" icon={IconDefinitions.file_csv} />
                ]}
                enableColumnReorder
                enableColumnResize
                enableStickyHeader
                enableColumnVisibility
                selectedRow={selected}
                rowSingleClickAction={(row) => {
                    setSelected(row)
                    console.log(`Clicked row: ${row.naam}`);
                }}
                rowDoubleClickAction={(row) => {
                    setSelected(row)
                    console.log(`Double clicked row ${row.naam}`);
                }}

                enableSidebar
                sidebarPosition={sidebarDirection}
                sidebar={{
                    header: {
                        content: "Product details",
                        borderColor: ColorDefinitions.Surface,
                    },
                    content: ProductSidebarContent,
                    footer: {
                        content: <Button>Opslaan</Button>,
                        borderColor: ColorDefinitions.Surface,
                    },
                }}

                properties={filterProductColumns() as any}
            />
        </>
    )
}

export const TableInfo: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [tableInfoVisible, setTableInfoVisible] = useState(true);


    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            toolbarTitle={<Title size="md">All products</Title>}
            toolbarPrefixItems={[
                <Button key="create" onClick={() => alert('Create')}>
                    <Icon icon={IconDefinitions.plus} />
                    Toevoegen
                </Button>
            ]}
            enableCompactView={true}
            enableTableInfo={tableInfoVisible}
            tableInfoContent={
                <ContentItem item={{
                    id: '1',
                    content: <div>U heeft een of meerdere <b>filters</b> ingesteld.</div>,
                    postfix: (
                        <Button variant="ghost" color={ColorDefinitions.SurfaceLight} onClick={() => setTableInfoVisible(false)}>
                            <Icon icon={IconDefinitions.funnel_cross} position="left" />
                            Filter wissen
                        </Button>)
                }} />
            }
            properties={defaultProductColumns() as any}
        />


    )
}

export const Tabs: StoryFn = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [tabsDirection, setTabsDirection] = useState<DatagridTabberPosition>("right");
    const [enableTabFilters, setEnableTabFilters] = useState(false);
    const [enableTabColumnVisibility, setEnableTabColumnVisibility] = useState(false);

    const toggleTabberPosition = () => {
        const nextPosition = tabsDirection === "right" ? "left" : "right";
        setTabsDirection(nextPosition);
    };


    return (

        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            collapsibleRowData={ProductOrders}
            toolbarTitle={<Title size="md">Alle products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="tabber" onClick={toggleTabberPosition}>Tabs naar {tabsDirection === "right" ? "links" : "rechts"}</Button>,
                <Button key="enableTabFilters" onClick={() => setEnableTabFilters(!enableTabFilters)}>{enableTabFilters === false ? "Enable" : "Disible"} tab filters</Button>,
                <Button key="enableTabColumnVisibility" onClick={() => setEnableTabColumnVisibility(!enableTabColumnVisibility)}>{enableTabColumnVisibility === false ? "Enable" : "Disible"} column tab column visibility</Button>,
            ]}
            toolbarPostfixItems={[
                <Icon key="icon" icon={IconDefinitions.file_csv} />
            ]}
            enableColumnReorder
            enableColumnResize
            enableStickyHeader
            enableColumnVisibility
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: ${row.naam}`);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Double clicked row ${row.naam}`);
            }}

            enableTabs
            tabberPosition={tabsDirection}
            enableTabColumnVisibility={enableTabColumnVisibility}
            enableTabFilters={enableTabFilters}
            tabs={[{
                id: "tabTest",
                title: "Test",
                icon: <Icon icon={IconDefinitions.info_circle} size={SizeDefinitions.Small} />
            },
            ]}
            tabPanes={[
                {
                    tabId: "tabTest",
                    content: (<span>Custom content goes here...</span>),
                    header: {
                        content: "Test tab"
                    }
                },

            ]}
            properties={filterProductColumns() as any}
        />
    )
}

export const Toolbar: StoryFn = () => {

    const [toggleChecked, setToggleChecked] = useState(true);
    const [checkedItems, setCheckedItems] = useState<ProductGetModel[]>([]);

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            toolbarTitle={<Title size="md">All products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="create" onClick={() => alert('Create')}>
                    <Icon icon={IconDefinitions.plus} />
                    Toevoegen
                </Button>
            ]}
            toolbarPostfixItems={[
                <Toggle key="toggle"
                    color={ColorDefinitions.Primary}
                    label="Gearchiveerd verbergen"
                    checked={toggleChecked}
                    onChange={setToggleChecked}
                    labelPosition="left"
                />
            ]}
            enableCheckboxes
            checkedItems={checkedItems}
            onRowsChecked={setCheckedItems}
            enableTableInfo={checkedItems.length > 0}
            enableCompactView={true}
            properties={defaultProductColumns() as any}
        />
    )
}

export const FullHeight: StoryFn = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [fullHeight, setFullHeight] = useState(false);

    return (
        <Datagrid
            fullHeight={fullHeight}
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            properties={filterProductColumns() as any}
            collapsibleRowData={ProductOrders}
            initialPageSize={10}
            enableCompactView
            enableSummaryRow
            enableRowHover
            enableStickyHeader
            enableFiltersInHeader
            enableColumnReorder
            enableColumnResize
            enableColumnVisibility
            enableColumnPinning
            enableColumnMenu
            enableColumnMenuColumnVisibility
            tableHeaderContent="Alle products table"
            toolbarTitle="Alle products"
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="height" onClick={() => setFullHeight(!fullHeight)}>{fullHeight ? "default" : "full"} height</Button>
            ]}
            toolbarPostfixItems={[
                <Icon key="icon" icon={IconDefinitions.file_csv} />
            ]}
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: ${row.naam}`);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Double clicked row ${row.naam}`);
            }}
            enableTabs
            tabberPosition={"right"}
            enableTabColumnVisibility
            enableTabFilters
            tabs={[{
                id: "tabTest",
                title: "Test",
                icon: <Icon icon={IconDefinitions.info_circle} size={SizeDefinitions.Small} />
            },
            ]}
            tabPanes={[
                {
                    tabId: "tabTest",
                    content: (<span>Custom content goes here...</span>),
                    header: {
                        content: "Test tab"
                    }
                },

            ]}
            enableSidebar
            sidebarPosition={"right"}
            sidebar={{
                header: {
                    content: "Product details",
                    borderColor: ColorDefinitions.Surface,
                },
                content: ProductSidebarContent,
                footer: {
                    content: <Button>Opslaan</Button>,
                    borderColor: ColorDefinitions.Surface,
                },
            }}
        />
    )
}

export const RowSummary: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            initialPageSize={10}
            enableFiltersInHeader
            enableSummaryRow
            properties={filterProductColumns() as any}
        />
    )
}

export const GlobalSearch: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            properties={filterProductColumns() as any}
            enableFiltersInHeader
            toolbarTitle="Producten"
            enableSearch
            searchPlaceholder="Zoeken in alle kolommen..."
            clearFiltersButtonProps={{
                label: "Wis filters",
                buttonProps: { variant: "outline", color: ColorDefinitions.Accent }
            }}
        />
    )
}

export const ExternalFiltersInfoToolbar: StoryFn = () => {

    const s = useExternalProductSearch();

    return (
        <Datagrid
            {...s.gridProps}
            toolbarTitle="External filters – infotoolbar"
            filterInfoPosition="tableInfo"
            filterMessage={s.message}
            onClearFilters={s.resetSearch}
            clearFiltersButtonProps={{
                label: "Wis filters",
                buttonProps: { variant: "outline", color: ColorDefinitions.Olive }
            }}
            toolbarPrefixItems={[
                <SearchInput
                    key="search"
                    name="externalSearch"
                    value={s.search}
                    onTextInput={s.setSearch}
                    placeholder="Zoek op id, naam, SKU of EAN en druk op Enter..."
                    style={{ minWidth: "420px" }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") s.handleSearch();
                    }}
                />
            ]}
        />
    )
}

export const ExternalFiltersToolbar: StoryFn = () => {

    const s = useExternalProductSearch();

    return (
        <Datagrid
            {...s.gridProps}
            toolbarTitle="External filters – toolbar"
            filterInfoPosition="toolbar"
            onClearFilters={s.resetSearch}
            clearFiltersButtonProps={{
                label: "Wis filters",
                buttonProps: { variant: "outline", color: ColorDefinitions.Primary }
            }}
            toolbarPrefixItems={[
                <SearchInput
                    key="search"
                    name="externalSearch"
                    value={s.search}
                    onTextInput={s.setSearch}
                    placeholder="Zoek op id, naam, SKU of EAN en druk op Enter..."
                    style={{ minWidth: "420px" }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") s.handleSearch();
                    }}
                />
            ]}
            toolbarPostfixItems={
                s.message
                    ? [<span key="message" className="text-muted">{s.message}</span>]
                    : []
            }
        />
    )
}

export const ExternalFiltersCustom: StoryFn = () => {

    const s = useExternalProductSearch();

    return (
        <>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                <SearchInput
                    name="externalSearch"
                    value={s.search}
                    onTextInput={s.setSearch}
                    placeholder="Zoek op id, naam, SKU of EAN en druk op Enter..."
                    style={{ minWidth: "420px" }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") s.handleSearch();
                    }}
                />

                {s.message && <span>{s.message}</span>}

                {hasActiveColumnFilters(s.filters) && (
                    <DatagridClearFiltersButton onClick={s.clearAll} />
                )}
            </div>

            <Datagrid
                {...s.gridProps}
                toolbarTitle="External filters – custom"
                filterInfoPosition="none"
            />
        </>
    )
}


export const CurstomPlacementClearFiltersButton: StoryFn = () => {

    const [filters, setFilters] = useState<ColumnFilters<ProductGetModel>>({});

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            localStorageKey="dg-column-filter"
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            enableFiltersInHeader
            properties={filterProductColumns() as any}

            toolbarBorderBottom
            toolbarTitle={(<Title key="titleBePrestaties" size="sm"> Alle producten</Title>)}
            filterInfoPosition="none"
            columnFilters={filters}
            onColumnFiltersChange={setFilters}
            clearFiltersButtonProps={{
                label: "Filters wissen",
                buttonProps: { color: ColorDefinitions.Accent }
            }}
            toolbarPrefixItems={[
                hasActiveColumnFilters(filters) && (
                    <DatagridClearFiltersButton
                        key="wis"
                        onClick={() => setFilters({})}
                        buttonProps={{ variant: "outline" }}
                    />
                ),
            ]}
        />
    )
}

export const NestedDetails: StoryFn = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            collapsibleRowData={ProductOrdersWithDetails}
            enableColumnPinning
            enableColumnVisibility
            enableColumnMenu
            enableColumnMenuColumnVisibility
            enableCompactView
            enableColumnReorder
            enableColumnResize
            enableStickyHeader
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: ${row.naam}`);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Double clicked row ${row.naam}`);
            }}
            properties={defaultProductColumns() as any}
        />
    )
}

export const DetailsAndNestedDetails: StoryFn = () => {

    const [selectedItem, setSelectedItem] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const sidebarContent = ({ item }: { item?: ProductGetModel | null }) =>
        item ? <ProductDetails item={item} /> : <div>Selecteer een rij</div>;

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            properties={defaultProductColumns() as any}
            initialPageSize={10}
            pageSizeOptions={[10, 25, 50, 100, 250, 500, 1000]}
            toolbarTitle="Alle producten"
            enableCompactView
            enableColumnReorder
            enableColumnResize
            enableColumnVisibility
            enableColumnPinning
            enableStickyHeader
            enableColumnMenu
            enableColumnMenuColumnVisibility
            enableFiltersInHeader
            enableSummaryRow
            enableTabs
            enableTabFilters
            enableTabColumnVisibility
            collapsibleRowData={ProductOrdersWithDetails}
            selectedRow={selectedItem}
            rowSingleClickAction={(item) => setSelectedItem(item)}
            enableSidebar
            sidebar={{
                header: {
                    content: "Nederlandse prestatie details",
                    borderColor: ColorDefinitions.Surface,
                },
                content: sidebarContent
            }}
        />
    )
}
