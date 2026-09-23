import React, { useState, useEffect } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid, { DatagridHeight } from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { Title } from "../../../components/Typography/Title";
import Button from "../../../components/UI/Button/Button";
import { Icon } from "../../../components/UI/Icons/Icon";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { ProductOrders } from "../Datagrid/ProductOrdersTable";
import ColumnLayout from "../../../components/UI/ColumnLayout/ColumnLayout";
import ColumnLayoutMain from "../../../components/UI/ColumnLayout/ColumnLayoutMain";
import ColumnLayoutHeader from "../../../components/UI/ColumnLayout/ColumnLayoutHeader";
import ContentItem from "../../../components/UI/ContentItem/ContentItem";
import Breadcrumb from "../../../components/Page/Navigation/Breadcrumb/Breadcrumb";
import { useLayoutContext } from "../../../components/Providers/LayoutContext/LayoutContext";
import ColumnLayoutContent from "../../../components/UI/ColumnLayout/ColumnLayoutContent";

const ColumnLayoutDemo: React.FC = () => {

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


    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [datagridHeight, setDatagridHeight] = useState<DatagridHeight>("default");

    const toggleHeight = () => {
        setDatagridHeight(current => current === "default" ? "full" : "default");
    };

    const title = `Column layout demo`;
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: `Column layout demo`, href: "/demo/columnlayout" },
    ];

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
                    <fieldset className="fieldset">
                        <dl className="description-list description-list--colon  ">
                            <dt>Naam</dt>
                            <dd className="">Test organisatie edms 01 (4486) (4486)</dd>
                            <dt>AGB-code onderneming</dt>
                            <dd className="">98098352</dd>
                        </dl>
                    </fieldset>

                    <Datagrid
                        height={datagridHeight}
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
                            <Button key="height" onClick={toggleHeight}>{datagridHeight === 'default' ? "full" : "default"} height</Button>

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
                            content: ({ item }) => {
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
                            },
                            footer: {
                                content: <Button>Opslaan</Button>,
                                borderColor: ColorDefinitions.Surface,
                            },
                        }}

                    />
                </ColumnLayoutContent>
            </ColumnLayoutMain>

        </ColumnLayout>
    )
}

export default ColumnLayoutDemo;