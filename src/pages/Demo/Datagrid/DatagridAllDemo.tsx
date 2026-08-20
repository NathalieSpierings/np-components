import React, { useState } from "react";
import { DatagridSidebarPosition } from "../../../components/Data/Datagrid/Addons/DatagridSidebar";
import { DatagridTabberPosition } from "../../../components/Data/Datagrid/Addons/DatagridTabs";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid, { DatagridRowActionsPosition } from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { PaginationInfoPosition, PaginationPosition } from "../../../components/Data/Datagrid/Pagination";
import SearchInput from "../../../components/Forms/SearchInput/SearchInput";
import { Fieldset } from "../../../components/Typography/Fieldset";
import { Subtitle } from "../../../components/Typography/Subtitle";
import Title from "../../../components/Typography/Title/Title";
import Button from "../../../components/UI/Button/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import Tooltip from "../../../components/UI/Tooltip/Tooltip";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { ProductOrders } from "./ProductOrdersTable";
import ColumnLayout from "../../../components/UI/ColumnLayout/ColumnLayout";
import { ColumnLayoutAside, ColumnLayoutContent, ColumnLayoutMain } from "../../../components";


const DatagridAllDemo: React.FC = () => {

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
    const [paginationPosition, setPaginationPosition] = useState<PaginationPosition>("outside table");
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

    const togglePagination = () => {
        const nextPosition = paginationPosition === "outside table" ? "inside table" : "outside table";
        setPaginationPosition(nextPosition);
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

        // Wat ga ik hier doen. nu standaard naar 1 gevonden org
        if (matches.length > 1) {
            alert('Meerdere matches gevonden')
            return;
        }
    };

    return (
        <>
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

                        <Datagrid localStorageKey="datagrid-all"
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
                                <Button key="pager" onClick={togglePagination}>Paginatie {paginationPosition === "outside table" ? "inside table" : "outside table"}</Button>,
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
                            paginationPosition={paginationPosition}
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






        </>
    )
}

export default DatagridAllDemo;