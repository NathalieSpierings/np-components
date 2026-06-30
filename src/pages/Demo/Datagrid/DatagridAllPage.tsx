import moment from "moment";
import React, { ReactElement, useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid, { DatagridRowActionsPosition } from "../../../components/Data/Datagrid/Datagrid";
import useDatagridQueryClientFilter from "../../../components/Data/Datagrid/Hooks/useDatagridQueryClientFilter";
import Toggle from "../../../components/Forms/Toggle/Toggle";
import { Title } from "../../../components/Typography/Title";
import { Button } from "../../../components/UI/Button";
import ContentItem from "../../../components/UI/ContentItem/ContentItem";
import { Icon } from "../../../components/UI/Icons/Icon";
import { Tooltip } from "../../../components/UI/Tooltip";
import { getOrdersForProduct, getProductsQuery, OrderGetModel, ProductGetModel } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { DatagridTabberPosition } from "../../../components/Data/Datagrid/DatagridTabs";
import { DatagridSidebarPosition } from "../../../components/Data/Datagrid/DatagridSidebar";

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


const DatagridAllPage = (): ReactElement => {


    const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [toggleChecked, setToggleChecked] = useState(true);
   
    const [enableCheckboxes, setEnableCheckboxes] = useState(false);   
    const [checkedItems, setCheckedItems] = useState<ProductGetModel[]>([]);

    const [actionsPosition, setActionsPosition] = useState<DatagridRowActionsPosition>('right');

    const [enableSidebar, setEnableSidebar] = useState(false);
    const [sidebarDirection, setSidebarDirection] = useState<DatagridSidebarPosition>("right");

    const [enableTabber, setEnableTabber] = useState(false);
    const [tabsDirection, setTabsDirection] = useState<DatagridTabberPosition>("right");

    const [headerFilters, setHeaderFilters] = useState(false);

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useDatagridQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

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

    return (
        <>
            <p> Welcome to the datagrid checkboxes demo page</p>

            <Datagrid
                toolbarTitle={<Title size="md">Alle products</Title>}
                toolbarBorderBottom={true}
                toolbarPrefixItems={[
                    <Button key="actions" onClick={toggleActionsPosition}>Actions naar {actionsPosition === "right" ? "links" : "rechts"}</Button>,
                    <Button key="enableCheckboxes" onClick={() => setEnableCheckboxes(!enableCheckboxes)}> {enableCheckboxes === false ? "Enable" : "Disible"} checkboxes</Button>,
                
                    
                    <Button key="sidebarEnabler" onClick={() => setEnableSidebar(!enableSidebar)}>{enableSidebar === false ? "Enable" : "Disible"} sidebar</Button>,
                    <Button key="sidebar" disabled={!enableSidebar} onClick={toggleSidebarPosition}>Sidebar naar {sidebarDirection === "right" ? "links" : "rechts"}</Button>,
                   
                    <Button key="tabberEnabler" onClick={() => setEnableTabber(!enableTabber)}> {enableTabber === false ? "Enable" : "Disible"} tabs</Button>,
                    <Button key="tabber" disabled={!enableTabber}  onClick={toggleTabberPosition}>Tabs naar {tabsDirection === "right" ? "links" : "rechts"}</Button>,

                    <Button key="headerFilters" onClick={() => setHeaderFilters(!headerFilters)}>{headerFilters === false ? "Enable" : "Disible"} header filters</Button>,

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
                enableTableInfo={checkedItems.length > 0}
                filterbarEnableInfoPopover
                filterbarInfoPopoverContent={
                    <>
                        <p>Gebruik spaties om op meerdere termen tegelijk te zoeken (werkt als EN).</p>
                        <Title size="xs" className="strong mt-2 mb-1">Speciale filteropties:</Title>
                        <ContentItem item={{
                            id: 'filtera',
                            content: <div>Gebruik <strong>+a</strong> of <strong>!a</strong> voor het filteren op actieve/inactieve accounts.</div>,
                        }} />
                        <br />
                        <ContentItem item={{
                            id: 'filteri',
                            content: <div>Gebruik <strong>+i</strong> of <strong>!i</strong> voor het filteren op accounts met/zonder problemen.</div>,
                        }} />
                    </>
                }
                filterbarInfoPopoverToggleIcon={IconDefinitions.info_square}

                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                enableCompactView

                enableColumnReorder
                enableColumnResize
                enableColumnVisibility
                enableStickyHeader

                enableFiltersInHeader={headerFilters}

                enableColumnMenu
                enableColumnMenuColumnVisibility

                enableTabs={enableTabber}
                tabberPosition={tabsDirection}
                enableTabColumnVisibility
                enableTabFilters
                tabs={[
                    { id: "tabTest", title: "Test", icon: <Icon icon={IconDefinitions.eye} size={SizeDefinitions.Small} /> },
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

                selectedRow={selected}
                rowSingleClickAction={(row) => {
                    setSelected(row)
                    console.log(`Clicked row: `, row.naam);
                }}
                rowDoubleClickAction={(row) => {
                    setSelected(row)
                    console.log(`Dobule clicked row`, row.naam);
                }}

                enableCheckboxes={enableCheckboxes}
                checkedItems={checkedItems}
                onRowsChecked={setCheckedItems}

                footerContent={(<span>Dit is een test</span>)}

                collapsibleRowData={collapsibeRowData}

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
                    { prop: "prijs", title: "Prijs (€)", sortable: true, width: 150, wrapValue: (item) => { return <>€  {item.prijs.toFixed(2)}</> } },
                    { prop: "merk", title: "Merk", sortable: true, width: 150, filter: { type: 'text' } },
                    {
                        prop: "status", title: "Status", sortable: true,
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
                    { prop: "gewicht", title: "Gewicht", sortable: true, filter: { type: 'text' } },
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
                    { prop: "kortingspercentage", title: "Kortingspercentage", sortable: true, filter: { type: 'text' } },
                    { prop: "garantiemaanden", title: "Garantie", sortable: true, filter: { type: 'text' } },
                    { prop: "minOrderAantal", title: "Min order", sortable: true, filter: { type: 'text' } },
                    { prop: "maxOrderAantal", title: "Max order", sortable: true, filter: { type: 'text' } },
                    { prop: "aanbevolen", title: "Uitgelicht", sortable: true, filter: { type: 'text' } },
                    { prop: "rating", title: "Rating", sortable: true, filter: { type: 'text' } },
                    { prop: "aantalReviews", title: "Aantal reviews", sortable: true, filter: { type: 'text' } },
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
                rowActionPosition={actionsPosition}
                rowActions={
                    [
                        {
                            icon: <Tooltip content="Bekijk"><Icon icon={IconDefinitions.eye} hover={true} iconCss="pointer" /></Tooltip>,
                            action: (item) => { alert(`Bekijk order ${item.naam}`) }
                        },
                        {
                            icon: <Tooltip content="Verwijder"><Icon icon={IconDefinitions.bin} hover={true} iconCss="pointer" /></Tooltip>,
                            action: (item) => { alert(`Verwijder order ${item.naam}`) }
                        },
                    ]
                }
            />
        </>
    )
}

export default DatagridAllPage;