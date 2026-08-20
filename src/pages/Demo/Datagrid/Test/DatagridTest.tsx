import React, { ReactElement, useCallback, useEffect, useState } from "react";
import DatagridTest1 from "./DatagridTest1";
import DatagridTest2 from "./DatagridTest2";
import { useLayoutContext, ColumnLayout, ColumnLayoutMain, ColumnLayoutHeader, ContentItem, Title, Breadcrumb, ColumnLayoutContent, Toolbar, Tabs, TabPanes, TabPane, DatagridGetDataArguments } from "../../../../components";
import { ColorDefinitions } from "../../../../lib/utils/definitions";
import { getProductsForTest1Query, ProductGetModel } from "../../../../lib/testdata/models";
import { useQuery } from "@tanstack/react-query";


const title = 'Datagrid test';
const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: `Datagrid test`, href: "/demo/dg-test" },
];

const tabs = [
    { index: 0, label: "Test 1" },
    { index: 1, label: "Test 2" },
];

const DatagridTest = (): ReactElement => {

    const { setFullscreen, setShowHeader, setHasSidebars, setShowSidebarMobile } = useLayoutContext();
    const [selectedTab, setSelectedTab] = useState(0);
    const [tableOptionsTest1, setTableOptionsTest1] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);


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


    const handleTabChange = useCallback((index: number) => {
        setSelectedTab(index);
    }, []);

    const handleTableOptionsTest1Change = useCallback(
    (next: DatagridGetDataArguments<ProductGetModel>) => {
        setTableOptionsTest1((current) => {
            if (!current) {
                return next;
            }

            const isEqual =
                current.searchTerm === next.searchTerm &&
                current.sort?.prop === next.sort?.prop &&
                current.sort?.order === next.sort?.order &&
                current.pagination.page === next.pagination.page &&
                current.pagination.perPage === next.pagination.perPage &&
                JSON.stringify(current.columnFilters) ===
                    JSON.stringify(next.columnFilters);

            return isEqual ? current : next;
        });
    },
    []
);

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
                        navItems={(
                            <Tabs
                                tabs={tabs}
                                selectedTab={selectedTab}
                                onClick={handleTabChange}
                                borderBottomColor={ColorDefinitions.None}
                            />
                        )} />


                    <TabPanes
                        selectedTab={selectedTab}
                        keepMounted
                    >
                        <TabPane>
                            <DatagridTest1
                                tableOptions={tableOptionsTest1}
                                setTableOptions={handleTableOptionsTest1Change}
                            />
                        </TabPane>

                        <TabPane>
                            <DatagridTest2 />
                        </TabPane>
                    </TabPanes>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
        </ColumnLayout>

    )
}

export default DatagridTest;