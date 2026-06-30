import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid, { DatagridRowActionsPosition } from "../../../components/Data/Datagrid/Datagrid";
import useDatagridQueryClientFilter from "../../../components/Data/Datagrid/Hooks/useDatagridQueryClientFilter";
import Title from "../../../components/Typography/Title/Title";
import Button from "../../../components/UI/Button/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { OrderGetModel, ProductGetModel, getOrdersForProduct, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import moment from "moment";
import Tooltip from "../../../components/UI/Tooltip/Tooltip";
import { DatagridTabberPosition } from "../../../components/Data/Datagrid/DatagridTabs";
import { DatagridSidebarPosition } from "../../../components/Data/Datagrid/DatagridSidebar";
import { Subtitle } from "../../../components/Typography/Subtitle";
import { Fieldset } from "../../../components/Typography/Fieldset";
import { PaginationInfoPosition, PaginationPosition } from "../../../components/Data/Datagrid/Pagination";

const ProductOrdersTable = ({ productId }: { productId: string }) => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<OrderGetModel> | null>(null);
    const [dataRaw, data, total, status] = useDatagridQueryClientFilter({
        queryFn: getOrdersForProduct(productId),
        filters: tableOptions
    });

    const [selected, setSelected] = useState<OrderGetModel | undefined>();


    return (
        <Datagrid
            variant="nested"
            paginationPosition="inside table"
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            paginationRowInfoPosition="left"
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row)
                console.log(`Clicked row: `, row.achternaam);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row)
                console.log(`Dobule clicked row`, row.achternaam);
            }}
            properties={[
                { prop: "id", title: "Id", sortable: true, visible: true, width: 150, filter: { type: 'text' } },
                { prop: "productId", title: "Product id", sortable: true, width: 150, visible: true, },
                { prop: "voornaam", title: "Voornaam", sortable: true, visible: true, },
                { prop: "tussenvoegsel", title: "Tussenvoegsel", sortable: true, visible: true, },
                { prop: "achternaam", title: "Achternaam", sortable: true, visible: true, },
                { prop: "straat", title: "Straat", sortable: false, visible: true, },
                { prop: "huisnummer", title: "Huisnummer", sortable: false, visible: true, },
                { prop: "postcode", title: "Postcode", sortable: false, visible: true, },
                { prop: "plaats", title: "Plaats", sortable: false, visible: true, },
                { prop: "land", title: "Land", sortable: false, },
                { prop: "telefoonnummer", title: "Telefoonnummer", sortable: false, },
                { prop: "email", title: "Email", sortable: false, },
                { prop: "besteldatum", title: "Besteldatum", transformValue: (value) => value ? moment(value as Date).locale("nl").format("DD-MM-YYYY") : "" },
                { prop: "aantal", title: "Aantal", sortable: false, },
                { prop: "vervoerder", title: "Vervoerder", sortable: true, },
                { prop: "status", title: "Status", sortable: true, },
                { prop: "betaalMethode", title: "BetaalMethode", sortable: true, },
                { prop: "kortingToegepast", title: "Korting toegepast", sortable: true, },
                { prop: "terugkerendeKlant", title: "Terugkerende klant", sortable: true, },
                { prop: "nieuwsbrief", title: "Nieuwsbrief", sortable: true, },
                { prop: "aangemaaktOp", title: "Aangemaakt", transformValue: (value) => value ? moment(value as Date).locale("nl").format("DD-MM-YYYY") : "" },
                { prop: "gewijzigdOp", title: "Gewijzigd", transformValue: (value) => value ? moment(value as Date).locale("nl").format("DD-MM-YYYY") : "" },
                { prop: "aangemaaktDoor", title: "Aangemaakt door", sortable: true, },
                { prop: "gewijzigdDoor", title: "Gewijzigd door", sortable: true, },
            ]}
        />
    );
};


const DatagridDemo: React.FC = () => {

    const [enableCheckboxes, setEnableCheckboxes] = useState(false);
    const [enableSidebar, setEnableSidebar] = useState(false);
    const [enableTabber, setEnableTabber] = useState(false);
    const [enableColumnFilter, setEnableColumnFilter] = useState(false);
    const [enableStickyColumn, setEnableStickyColumn] = useState(false);
    const [enableColumnMenu, setEnableColumnMenu] = useState(false);
    const [enableColumnMenuColumnVisibility, setEnableColumnMenuColumnVisibility] = useState(false);
    const [enableTabColumnVisibility, setEnableTabColumnVisibility] = useState(false);
    const [enableTabFilters, setEnableTabFilters] = useState(false);
  
    const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [checkedItems, setCheckedItems] = useState<ProductGetModel[]>([]);
    const [actionsPosition, setActionsPosition] = useState<DatagridRowActionsPosition>('right');
    const [tabsDirection, setTabsDirection] = useState<DatagridTabberPosition>("right");
    const [sidebarDirection, setSidebarDirection] = useState<DatagridSidebarPosition>("right");
    const [paginationPosition, setPaginationPosition] = useState<PaginationPosition>("outside table");
    const [paginationInfoPosition, setPaginationInfoPosition] = useState<PaginationInfoPosition>("right");


    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useDatagridQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const wrapPrice = (item: ProductGetModel) => {
        return <>€  {item.prijs.toFixed(2)}</>
    }

    const collapsibeRowData = (item: ProductGetModel) => {
        return <ProductOrdersTable productId={item.id.toString()} />
    }

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
    return (
        <>

            <div className="grid" style={{ gap: '1rem' }}>
                <div>
                    <Fieldset legend="Column options" borderColor={ColorDefinitions.Surface}>
                        
                            <Button key="enableStickyColumn" onClick={() => setEnableStickyColumn(!enableColumnFilter)}>{enableStickyColumn === false ? "Enable" : "Disible"} column fixed</Button>
                            <Button key="headerFilters" onClick={() => setEnableColumnFilter(!enableColumnFilter)}>{enableColumnFilter === false ? "Enable" : "Disible"} column filters</Button>
                            <Button key="enableColumnMenu" onClick={() => setEnableColumnMenu(!enableColumnMenu)}>{enableColumnMenu === false ? "Enable" : "Disible"} column menu</Button>
                            <Button key="enableColumnMenuColumnVisibility" onClick={() => setEnableColumnMenuColumnVisibility(!enableColumnMenuColumnVisibility)}>{enableColumnMenuColumnVisibility === false ? "Enable" : "Disible"} column menu column visibility</Button>
                       
                    </Fieldset>
                </div>
                <div>
                    <Fieldset legend="Sidebar options" borderColor={ColorDefinitions.Surface}>
                        <Subtitle>To open sidebar double click a row</Subtitle>
                       
                           <Button key="sidebarEnabler" onClick={() => setEnableSidebar(!enableSidebar)}>{enableSidebar === false ? "Enable" : "Disible"} sidebar</Button>
                           <Button key="sidebar" disabled={!enableSidebar} onClick={toggleSidebarPosition}>Sidebar naar {sidebarDirection === "right" ? "links" : "rechts"}</Button>
                       
                    </Fieldset>
                </div>
                <div>
                    <Fieldset legend="Tab options" borderColor={ColorDefinitions.Surface}>

                            <Button key="tabberEnabler" onClick={() => setEnableTabber(!enableTabber)}> {enableTabber === false ? "Enable" : "Disible"} tabs</Button>
                            <Button key="tabber" disabled={!enableTabber} onClick={toggleTabberPosition}>Tabs naar {tabsDirection === "right" ? "links" : "rechts"}</Button>
                            <Button key="enableTabFilters" onClick={() => setEnableTabFilters(!enableTabFilters)}>{enableTabFilters === false ? "Enable" : "Disible"} tab filters</Button>
                            <Button key="enableTabColumnVisibility" onClick={() => setEnableTabColumnVisibility(!enableTabColumnVisibility)}>{enableTabColumnVisibility === false ? "Enable" : "Disible"} column tab column visibility</Button>
                      
                    </Fieldset>
                </div>
            </div>


            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}

                toolbarTitle={<Title size="md">Alle orders</Title>}
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
                enableColumnReorder
                enableColumnResize
                enableColumnVisibility

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
                    content: (item) => {
                        if (!item) return <div>Selecteer een rij</div>;

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
                collapsibleRowData={collapsibeRowData}
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

                properties={[
                    { prop: "sku", title: "SKU", sortable: true, visible: true, width: 150, filter: { type: 'text' } },
                    { prop: "naam", title: "Product", sortable: true, visible: true, width: 200, filter: { type: 'text' } },
                    { prop: "omschrijving", title: "Omschrijving", visible: true, width: 300, sortable: true, filter: { type: 'text' } },
                    {
                        prop: "categorie", title: "Categorie", sortable: true, width: 200, visible: true,
                        filter: {
                            type: 'select',
                            options: [
                                { label: "Elektronica", value: "Elektronica" },
                                { label: "Kantoor", value: "Kantoor" },
                                { label: "Meubels", value: "Meubels" },
                                { label: "Software", value: "Software" },
                                { label: "Voeding", value: "Voeding" },
                                { label: "Kleding", value: "Kleding" },
                                { label: "Sport", value: "Sport" },
                                { label: "Tuin", value: "Tuin" },
                                { label: "Auto", value: "Auto" },
                                { label: "Gezondheid", value: "Gezondheid" },
                            ]
                        }
                    },
                    { prop: "prijs", title: "Prijs (€)", sortable: true, visible: true, width: 150, filter: { type: 'number' }, wrapValue: wrapPrice },
                    { prop: "merk", title: "Merk", sortable: true, visible: true, width: 200, filter: { type: 'text' } },
                    {
                        prop: "status", title: "Status", sortable: true, width: 200,
                        filter: {
                            type: 'select',
                            options: [
                                { label: "Active", value: "Active" },
                                { label: "Pending", value: "Pending" },
                                { label: "Archived", value: "Archived" },
                                { label: "Draft", value: "Draft" },
                            ]
                        }
                    },
                    { prop: "voorraad", title: "Voorraad", sortable: true, filter: { type: 'text' } },
                    { prop: "beschikbaar", title: "Beschikbaar", sortable: true, filter: { type: 'text' } },
                    { prop: "beschikbaarVanaf", title: "Beschikbaar vanaf", sortable: true, filter: { type: 'date' }, transformValue: (value: unknown) => value ? moment(value as Date).locale("nl").format("DD-MM-YYYY") : "", },
                    { prop: "gewicht", title: "Gewicht", sortable: true, filter: { type: 'number' } },
                    {
                        prop: "kleur", title: "Kleur", sortable: true,
                        filter: {
                            type: 'select',
                            options: [
                                { label: "Geel", value: "Geel" },
                                { label: "Roze", value: "Roze" },
                                { label: "Zwart", value: "Zwart" },
                                { label: "Wit", value: "Wit" },
                                { label: "Blauw", value: "Blauw" },
                                { label: "Groen", value: "Groen" },
                                { label: "Bruin", value: "Bruin" },
                                { label: "Rood", value: "Rood" },
                                { label: "Oranje", value: "Oranje" },
                                { label: "Paars", value: "Paars" },
                            ]
                        }
                    },
                    {
                        prop: "materiaal", title: "Materiaal", sortable: true,
                        filter: {
                            type: 'select',
                            options: [
                                { label: "Plastic", value: "Plastic" },
                                { label: "Metaal", value: "Metaal" },
                                { label: "Hout", value: "Hout" },
                                { label: "Glas", value: "Glas" },
                                { label: "Leder", value: "Leder" },
                                { label: "Stof", value: "Stof" },
                                { label: "Kunstof", value: "Kunstof" },
                            ]
                        }
                    },
                    { prop: "kortingspercentage", title: "Kortingspercentage", sortable: true, filter: { type: 'number' } },
                    { prop: "garantiemaanden", title: "Garantie", sortable: true, filter: { type: 'text' } },
                    { prop: "minOrderAantal", title: "Min order", sortable: true, filter: { type: 'number' } },
                    { prop: "maxOrderAantal", title: "Max order", sortable: true, filter: { type: 'number' } },
                    { prop: "aanbevolen", title: "Uitgelicht", sortable: true, filter: { type: 'text' } },
                    { prop: "rating", title: "Rating", sortable: true, filter: { type: 'number' } },
                    { prop: "aantalReviews", title: "Aantal reviews", sortable: true, filter: { type: 'number' } },
                    {
                        prop: "prioriteit", title: "Prioriteit", sortable: true,
                        filter: {
                            type: 'select',
                            options: [
                                { label: "Laag", value: "Laag" },
                                { label: "Medium", value: "Medium" },
                                { label: "Hoog", value: "Hoog" },
                                { label: "kritiek", value: "kritiek" },
                            ]
                        }
                    },
                    { prop: "leverancier", title: "Leverancier", sortable: true, filter: { type: 'text' } },
                    { prop: "leverancierEmail", title: "Email leverancier", sortable: true, filter: { type: 'text' } },
                    { prop: "landVanAfkomst", title: "Herkomst", sortable: true, filter: { type: 'text' } },
                    { prop: "warehouseLocatie", title: "Warehouse locatie", sortable: true, filter: { type: 'text' } },
                    { prop: "barcode", title: "Barcode", sortable: true, filter: { type: 'text' } },
                    { prop: "serialNummer", title: "Serialnummer", sortable: true, filter: { type: 'text' } },
                    { prop: "batchNummer", title: "Batch nummer", sortable: true, filter: { type: 'text' } },

                ]}
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
        </>
    )
}

export default DatagridDemo;