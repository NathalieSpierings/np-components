
import type { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { MemoryRouter } from 'react-router';
import { SvgSprite } from '../../../../assets/SvgSprite';
import { defaultProductColumns, filterProductColumns } from '../../../../lib/testdata/mock';
import { getProductsQuery, getProductsWithOrdersQuery, ProductGetModel, ProductMetOrdersModel } from '../../../../lib/testdata/models';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import { EventStopper } from '../../../Base/EventStopper';
import SearchInput from '../../../Forms/SearchInput/SearchInput';
import Toggle from '../../../Forms/Toggle/Toggle';
import Fieldset from '../../../Typography/Fieldset/Fieldset';
import Subtitle from '../../../Typography/Subtitle/Subtitle';
import Title from '../../../Typography/Title/Title';
import Button from '../../../UI/Button/Button';
import ColumnLayout from '../../../UI/ColumnLayout/ColumnLayout';
import ColumnLayoutAside from '../../../UI/ColumnLayout/ColumnLayoutAside';
import ColumnLayoutContent from '../../../UI/ColumnLayout/ColumnLayoutContent';
import ColumnLayoutMain from '../../../UI/ColumnLayout/ColumnLayoutMain';
import ContentItem from '../../../UI/ContentItem/ContentItem';
import Icon from '../../../UI/Icons/Icon/Icon';
import Tooltip from '../../../UI/Tooltip/Tooltip';
import { DatagridGetDataArguments } from '../Config/DatagridData';
import Datagrid, { DatagridRowActionsPosition, DatagridSidebarPosition, DatagridTabberPosition } from '../Datagrid';
import { useTableQueryClientFilter } from '../Hooks/useTableQueryClientFilter';
import { PaginationInfoPosition } from '../Pagination';
import ProductDetails from './ProductDetails';
import { ProductOrders } from './ProductOrdersTable';
import { ProductOrdersNested } from './ProductOrdersNested';
import { ProductWithOrdersNested } from './ProductWithOrdersNested';

const queryClient = new QueryClient();

const meta: Meta<typeof Datagrid> = {
    title: 'Data/Datagrid',
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



interface SidebarContentProps {
    item: ProductGetModel | null;
}
function renderSidebarContent({ item }: SidebarContentProps) {
    if (!item) {
        return <div>Selecteer een rij</div>;
    }

    return <ProductDetails item={item} />;
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
            collapsibleRowData={ProductOrders}
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

export const StickyHeader: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (

        <>
            <p>Ze de pager op een groter aantal rows zodat je kan scrollen.</p>

            <Datagrid
                localStorageKey="dg-column-sticky"
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                enableStickyHeader
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
                tableHeaderContent={(<span>DatagridTable header content goes here... </span>)}
                tableFooterContent={(<span>DatagridTable footer content goes here...</span>)}
                footerContent={(<span>Datagrid footer content goes here...</span>)}
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
        <>
            <p>De pager in de nested table staat altijd inside table. De info staat standaard links, dit voorkomt dat als je veel kolommen hebt je helemaal naar rechts moet scrollen om de pager info te zien.</p>
            <p>Mogelijk wil je de pager van de master in de table hebben zodat er in de footer meer ruimte over is voor andere content zoals bijv. totalen. Dit wordt nu nog niet gebruikt maar mogelijk wel in de toekomst. </p>

            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                toolbarTitle={<Title size="md">All products</Title>}
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
        </>
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
                icon: <Tooltip content="Verwijder"><Icon icon={IconDefinitions.bin} hover={true} iconCss="pointer" /></Tooltip>,
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
                content: ({ item }) => renderSidebarContent({ item }),
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
                    content: ({ item }) => renderSidebarContent({ item }),
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

    const [enableFullHeight, setEnableFullHeight] = useState(false);
  
 return (

        <Datagrid
            fullHeight={enableFullHeight}
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
            tableHeaderContent={<Title size="xs">Alle products table</Title>}
            toolbarTitle={<Title size="md">Alle products</Title>}
            toolbarBorderBottom={true}
            toolbarPrefixItems={[
                <Button key="fullHeight" onClick={() => setEnableFullHeight(!enableFullHeight)}>{enableFullHeight === false ? "Enable" : "Disable"} full height</Button>,
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
                content: ({ item }) => renderSidebarContent({ item }),
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

export const All: StoryFn = () => {

    // Datagrid options 
    const [enableTotalRow, setEnableTotalRow] = useState(true);

    // tabs
    const [enableTabber, setEnableTabber] = useState(true);
    const [tabsDirection, setTabsDirection] = useState<DatagridTabberPosition>("right");
    const [enableTabFilters, setEnableTabFilters] = useState(true);
    const [enableTabColumnVisibility, setEnableTabColumnVisibility] = useState(true);

    // sidebar
    const [enableSidebar, setEnableSidebar] = useState(true);
    const [sidebarDirection, setSidebarDirection] = useState<DatagridSidebarPosition>("right");

    // Paging
   const [paginationInfoPosition, setPaginationInfoPosition] = useState<PaginationInfoPosition>("right");


    // Datagrid table options
    const [enableCheckboxes, setEnableCheckboxes] = useState(true);
    const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [checkedItems, setCheckedItems] = useState<ProductGetModel[]>([]);
    const [actionsPosition, setActionsPosition] = useState<DatagridRowActionsPosition>('right');

    // Datagrid column options
    const [enableColumnFilter, setEnableColumnFilter] = useState(true);
    const [enableStickyColumn, setEnableStickyColumn] = useState(true);
    const [enableColumnMenu, setEnableColumnMenu] = useState(true);
    const [enableColumnMenuColumnVisibility, setEnableColumnMenuColumnVisibility] = useState(true);


    const [enableSorting, setEnableSorting] = useState(true);
    const [enableColumnResize, setEnableColumnResize] = useState(true);
    const [enableColumnReorder, setEnableColumnReorder] = useState(true);
    const [enableColumnVisibility, setEnableColumnVisibility] = useState(true);
    const [enableColumnPinning, setEnableColumnPinning] = useState(true);


    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const toggleActionsPosition = () => {
        const nextPosition = actionsPosition === "right" ? "left" : "right";
        setActionsPosition(nextPosition);
    };

    const toggleSidebarPosition = () => {
        const nextPosition = sidebarDirection === "right" ? "left" : "right";
        setSidebarDirection(nextPosition);
    };

    const toggleTabberPosition = () => {
        const nextPosition = tabsDirection === "right" ? "left" : "right";
        setTabsDirection(nextPosition);
    };


    const togglePagerInfoPosition = () => {
        const nextPosition = paginationInfoPosition === "right" ? "left" : "right";
        setPaginationInfoPosition(nextPosition);
    };

    const [headerSearch, setHeaderSearch] = useState("");
    const searchAndNavigate = (term: string) => {
        if (!term.trim()) return;

        const lower = term.toLowerCase();

        const matches = dataRaw.filter(x =>
            x.naam?.toLowerCase().includes(lower) ||
            x.omschrijving?.toLowerCase().includes(lower)
        );

        if (matches.length === 1) {
            alert('Match gevonden')
            return;
        }

        // Wat ga ik hier doen. nu standaard naar 1e gevonden item
        if (matches.length > 1) {
            alert('Meerdere matches gevonden');          
        }
    };

    return (
        <ColumnLayout>
            <ColumnLayoutAside>
                <ColumnLayoutContent>
                    <Fieldset legend="Column options" borderColor={ColorDefinitions.Surface}>
                        <Button key="enableSorting" onClick={() => setEnableSorting(!enableSorting)}>{enableSorting === false ? "Enable" : "Disible"} sorting</Button>
                        <Button key="enableColumnResize" onClick={() => setEnableColumnResize(!enableColumnResize)}>{enableColumnResize === false ? "Enable" : "Disible"} column resize</Button>
                        <Button key="enableColumnReorder" onClick={() => setEnableColumnReorder(!enableColumnReorder)}>{enableColumnReorder === false ? "Enable" : "Disible"} column reorder</Button>
                        <Button key="enableColumnVisibility" onClick={() => setEnableColumnVisibility(!enableColumnVisibility)}>{enableColumnVisibility === false ? "Enable" : "Disible"} column visibility</Button>
                        <Button key="enableColumnPinning" onClick={() => setEnableColumnPinning(!enableColumnPinning)}>{enableColumnPinning === false ? "Enable" : "Disible"} column pinning</Button>
                        <Button key="enableStickyColumn" onClick={() => setEnableStickyColumn(!enableColumnFilter)}>{enableStickyColumn === false ? "Enable" : "Disible"} column fixed</Button>
                        <Button key="headerFilters" onClick={() => setEnableColumnFilter(!enableColumnFilter)}>{enableColumnFilter === false ? "Enable" : "Disible"} column filters</Button>
                        <Button key="enableColumnMenu" onClick={() => setEnableColumnMenu(!enableColumnMenu)}>{enableColumnMenu === false ? "Enable" : "Disible"} column menu</Button>
                        <Button key="enableColumnMenuColumnVisibility" onClick={() => setEnableColumnMenuColumnVisibility(!enableColumnMenuColumnVisibility)}>{enableColumnMenuColumnVisibility === false ? "Enable" : "Disible"} column menu column visibility</Button>
                    </Fieldset>
                    <Fieldset legend="Tab options" borderColor={ColorDefinitions.Surface}>
                        <Button key="tabberEnabler" onClick={() => setEnableTabber(!enableTabber)}> {enableTabber === false ? "Enable" : "Disible"} tabs</Button>
                        <Button key="tabber" disabled={!enableTabber} onClick={toggleTabberPosition}>Tabs naar {tabsDirection === "right" ? "links" : "rechts"}</Button>
                        <Button key="enableTabFilters" onClick={() => setEnableTabFilters(!enableTabFilters)}>{enableTabFilters === false ? "Enable" : "Disible"} tab filters</Button>
                        <Button key="enableTabColumnVisibility" onClick={() => setEnableTabColumnVisibility(!enableTabColumnVisibility)}>{enableTabColumnVisibility === false ? "Enable" : "Disible"} column tab column visibility</Button>
                    </Fieldset>
                    <Fieldset legend="Row options" borderColor={ColorDefinitions.Surface}>
                        <Button key="enableTotalRow" onClick={() => setEnableTotalRow(!enableTotalRow)}>{enableTotalRow === false ? "Enable" : "Disible"} total row</Button>
                    </Fieldset>
                    <Fieldset legend="Sidebar options" borderColor={ColorDefinitions.Surface}>
                        <Subtitle>To open sidebar double click a row</Subtitle>
                        <Button key="sidebarEnabler" onClick={() => setEnableSidebar(!enableSidebar)}>{enableSidebar === false ? "Enable" : "Disible"} sidebar</Button>
                        <Button key="sidebar" disabled={!enableSidebar} onClick={toggleSidebarPosition}>Sidebar naar {sidebarDirection === "right" ? "links" : "rechts"}</Button>
                    </Fieldset>
                </ColumnLayoutContent>
            </ColumnLayoutAside>
            <ColumnLayoutMain>
                <ColumnLayoutContent>

                    <div className="grid" style={{ gap: '1rem' }}>
                        <SearchInput
                            name="Searcher"
                            value={headerSearch}
                            onTextInput={setHeaderSearch}
                            onSubmit={() => searchAndNavigate(headerSearch)}
                            placeholder="Zoeken..."
                            style={{ minWidth: '480px' }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    searchAndNavigate(headerSearch);
                                }
                            }}
                        />
                    </div>

                    <Datagrid
                        data={data || []}
                        dataRaw={dataRaw}
                        total={total || 0}
                        loading={status === "pending"}
                        onFilterUpdate={setTableOptions}
                        enableRowHover
                        enableSummaryRow={enableTotalRow}

                        toolbarTitle={<Title size="md">All products</Title>}
                        toolbarBorderBottom={true}
                        toolbarPrefixItems={[
                            <Button key="actions" onClick={toggleActionsPosition}>Actions naar {actionsPosition === "right" ? "links" : "rechts"}</Button>,
                            <Button key="enableCheckboxes" onClick={() => setEnableCheckboxes(!enableCheckboxes)}> {enableCheckboxes === false ? "Enable" : "Disible"} checkboxes</Button>,
                            <Button key="pager" onClick={togglePagerInfoPosition}>Pager info naar {paginationInfoPosition === "right" ? "left" : "right"}</Button>,

                        ]}
                        toolbarPostfixItems={[
                            <Button key="download" onClick={() => alert('Create')}>
                                <Icon icon={IconDefinitions.file_csv} />
                                Export
                            </Button>
                        ]}

                        enableCompactView={true}
                        enableColumnReorder={enableColumnReorder}
                        enableColumnResize={enableColumnResize}
                        enableColumnVisibility={enableColumnVisibility}
                        enableColumnPinning={enableColumnPinning}

                        // Sticky columns
                        enableStickyHeader={enableStickyColumn}
                        // Table info
                        enableTableInfo={checkedItems.length > 0}
                        // Column filters
                        enableFiltersInHeader={enableColumnFilter}
                        // Column menu
                        enableColumnMenu={enableColumnMenu}
                        enableColumnMenuColumnVisibility={enableColumnMenuColumnVisibility}

                        // Sidebar
                        enableSidebar={enableSidebar}
                        sidebarPosition={sidebarDirection}
                        sidebar={{
                            header: {
                                content: "Product details",
                                borderColor: ColorDefinitions.Surface,
                            },
                            content: ({ item }) => renderSidebarContent({ item }),
                            footer: {
                                content: <Button>Opslaan</Button>,
                                borderColor: ColorDefinitions.Surface,
                            },
                        }}

                        // Tabs
                        enableTabs={enableTabber}
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

                        // Nested datagrid
                        collapsibleRowData={ProductOrders}
                        // Row selection
                        selectedRow={selected}
                        rowSingleClickAction={(row) => {
                            setSelected(row)
                            console.log(`Clicked row: `, row.naam);
                        }}
                        rowDoubleClickAction={(row) => {
                            setSelected(row)
                            console.log(`Dobule clicked row`, row.naam);
                        }}
                        // Checkboxes
                        enableCheckboxes={enableCheckboxes}
                        checkedItems={checkedItems}
                        onRowsChecked={setCheckedItems}

                        //pagination
                        paginationRowInfoPosition={paginationInfoPosition}
                        footerContent={(<span>Dit is een test</span>)}

                        properties={filterProductColumns() as any}
                        // Row actions
                        rowActionPosition={actionsPosition}
                        rowActions={[{
                            icon: <Tooltip content="Bekijk"><Icon icon={IconDefinitions.eye} hover={true} iconCss="pointer" /></Tooltip>,
                            action: (item) => { alert(`Bekijk order ${item.naam}`) }
                        },
                        {
                            icon: <Tooltip content="Verwijder"><Icon icon={IconDefinitions.bin} hover={true} iconCss="pointer" /></Tooltip>,
                            action: (item) => { alert(`Verwijder order ${item.naam}`) }
                        }]}
                    />

                </ColumnLayoutContent>
            </ColumnLayoutMain>
        </ColumnLayout>
    )
}

export const InEventstopper: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <EventStopper>
            <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            enableColumnReorder
            properties={defaultProductColumns() as any}
        />
        </EventStopper>
    )
}
