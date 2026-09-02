
import React, { memo, useCallback, useEffect, useState } from "react";
import EventStopper from "../../../components/Base/EventStopper/EventStopper";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import Breadcrumb from "../../../components/Page/Navigation/Breadcrumb/Breadcrumb";
import { useLayoutContext } from "../../../components/Providers/LayoutContext/LayoutContext";
import { Subtitle } from "../../../components/Typography/Subtitle";
import Title from "../../../components/Typography/Title/Title";
import ColumnLayout from "../../../components/UI/ColumnLayout/ColumnLayout";
import ColumnLayoutContent from "../../../components/UI/ColumnLayout/ColumnLayoutContent";
import ColumnLayoutHeader from "../../../components/UI/ColumnLayout/ColumnLayoutHeader";
import ColumnLayoutMain from "../../../components/UI/ColumnLayout/ColumnLayoutMain";
import ContentItem from "../../../components/UI/ContentItem/ContentItem";
import Drawer from "../../../components/UI/Drawer/Drawer";
import Tabs from "../../../components/UI/Tabs/Tabs";
import Toolbar from "../../../components/UI/Toolbar/Toolbar";
import { defaultOrderColumns, defaultProductColumns } from "../../../lib/testdata/mock";
import { OrderGetModel, ProductGetModel, getOrdersForProduct, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import ProductDetails from "./ProductDetails";
import Detailgrid from "../../../components/Data/Detailgrid/Detailgrid";
import Button from "../../../components/UI/Button/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import Tooltip from "../../../components/UI/Tooltip/Tooltip";

const ProductOrdersNestedTable = ({ productId }: { productId: string }) => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<OrderGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getOrdersForProduct(productId),
        filters: tableOptions
    });

    const [selectedItem, setSelectedItem] = useState<OrderGetModel>();
    const [drawerOpen, setDrawerOpen] = useState<boolean | null>(false);
    const [checkedItems, setCheckedItems] = useState<OrderGetModel[]>([]);

    // Event handlers for single and double click on a row
    const handleSingleClick = (item: OrderGetModel) => {
        if (drawerOpen) {
            // Drawer is already open so load new data
            setSelectedItem(item);
        }
    }

    const handleDoubleClick = (item: OrderGetModel) => {
        setSelectedItem(item);
        setDrawerOpen(true);
    }

    return (
        <>
            {selectedItem && (
                <EventStopper>
                    <Drawer
                        title="Details"
                        open={drawerOpen}
                        openDrawer={setDrawerOpen}
                        useOverlay={false}>
                        {selectedItem.klantNaam}
                    </Drawer>
                </EventStopper>
            )}

            <EventStopper>
                <Detailgrid
                    localStorageKey="gridNested"
                    data={data || []}
                    dataRaw={dataRaw}
                    total={total || 0}
                    loading={status === "pending"}
                    onFilterUpdate={setTableOptions}
                    enableColumnResize
                    enableColumnReorder
                    enableColumnVisibility
                    enableColumnMenuColumnVisibility
                    enableColumnMenu
                    enableColumnPinning
                    selectedRow={selectedItem}
                    rowSingleClickAction={handleSingleClick}
                    rowDoubleClickAction={handleDoubleClick}
                    properties={defaultOrderColumns() as any}
                    enableCheckboxes={true}
                    checkedItems={checkedItems}
                    onRowsChecked={setCheckedItems}
                    enableTableInfo={checkedItems.length > 0}
                    tableInfoContent={
                        <ContentItem item={{
                            id: '1',
                            content: <div>U heeft <span className="bold text-red">{checkedItems.length}</span> {checkedItems.length === 1 ? "bestand" : "bestanden"} {" "} geselecteerd</div>,
                            postfix: (
                                <Button
                                    variant="ghost"
                                    color={ColorDefinitions.Blue}
                                    onClick={() =>
                                        console.log(`Download ${checkedItems.length} bestanden`)
                                    }
                                >
                                    <Icon icon={IconDefinitions.cloud_download} position="left" size={SizeDefinitions.Medium} />
                                    Downloaden
                                </Button>)
                        }} />
                    }
                    rowActionPosition="left"
                    rowActions={[{
                        icon: <Tooltip content="Details"><Icon icon={IconDefinitions.eye} hover={true} /></Tooltip>,
                        action: (item) => { handleDoubleClick(item) }
                    }]}
                />
            </EventStopper>
        </>
    );
};

export const NestedRecords = memo(({ item }: { item: ProductGetModel }) => (
    <ProductOrdersNestedTable productId={item.id.toString()} />
)
);


interface SidebarContentProps {
    item: ProductGetModel | null;
}
function renderSidebarContent({ item }: SidebarContentProps) {
    if (!item) {
        return <div>Selecteer een rij</div>;
    }

    return <ProductDetails item={item} />;
}


const tabs = [
    { index: 0, label: "Alle producten" },
    { index: 1, label: "Alle orders" },
];

const DatagridDetailsAndNestedDetailsDemo: React.FC = () => {

    const { setFullscreen, setShowHeader, setHasSidebars, setShowSidebarMobile } = useLayoutContext();
    useEffect(() => {
        setFullscreen(true);
        setShowHeader(false);
        setHasSidebars(true);
        setShowSidebarMobile(true);

        return () => {
            setFullscreen(false);
            setShowHeader(true);
            setHasSidebars(true);
            setShowSidebarMobile(true);
        };
    }, [setFullscreen, setShowHeader, setHasSidebars, setShowSidebarMobile]);


    const [selectedItem, setSelectedItem] = useState<ProductGetModel | undefined>();
    const [selectedTab, setSelectedTab] = useState(0);

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const title = (
        <div className="flex flex-column">
            <Title size="sm">Alle products</Title>
            <Subtitle>Met onderliggende orders</Subtitle>
        </div>
    )

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: 'Demo', href: "/demo" },
    ];
    const handleTabChange = useCallback((index: number) => {
        setSelectedTab(index);
    }, []);

    return (
        <ColumnLayout>
            <ColumnLayoutMain>
                <ColumnLayoutHeader enableFixedHeader>
                    <ContentItem item={
                        {
                            id: '1',
                            content: (
                                <>
                                    <Title>{title}</Title>
                                    {breadcrumbItems.length > 0 ?
                                        <Breadcrumb items={breadcrumbItems} />
                                        : null}
                                </>
                            )
                        }
                    } />
                </ColumnLayoutHeader>
                 <ColumnLayoutContent>

                <Toolbar
                    borderBottom
                    compact
                    navItems={(
                        <Tabs
                            tabs={tabs}
                            selectedTab={selectedTab}
                            onClick={handleTabChange}
                            borderBottomColor={ColorDefinitions.None}
                        />
                    )} />

                <Datagrid
                    data={data || []}
                    dataRaw={dataRaw}
                    total={total || 0}
                    loading={status === "pending"}
                    onFilterUpdate={setTableOptions}
                    properties={defaultProductColumns() as any}
                    initialPageSize={10}
                    pageSizeOptions={[10, 25, 50, 100, 250, 500, 1000]}
                    toolbarPrefixItems={[
                        (<Title key="titleNlPrestaties" size="sm"> Alle products</Title>)
                    ]}
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
                    collapsibleRowData={NestedRecords}
                    selectedRow={selectedItem}
                    rowSingleClickAction={(item) => setSelectedItem(item)}
                    enableSidebar
                    sidebar={{
                        header: {
                            content: "Nederlandse prestatie details",
                            borderColor: ColorDefinitions.Surface,
                        },
                        content: renderSidebarContent
                    }}
                />
            </ColumnLayoutContent>
            </ColumnLayoutMain>           
        </ColumnLayout>
    )
}

export default DatagridDetailsAndNestedDetailsDemo;