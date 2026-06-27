import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import useDatagridQueryClientFilter from "../../../components/Data/Datagrid/Hooks/useDatagridQueryClientFilter";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { ContentItem } from "../../../components/UI/ContentItem";
import { Button } from "../../../components/UI/Button";
import moment from "moment";

const DatagridFilterToolbarPage: React.FC = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useDatagridQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [tableInfoVisible, setTableInfoVisible] = useState(true);
    const [checkedItems, setCheckedItems] = useState<ProductGetModel[]>([]);

    return (
        <>
            <p> Welcome to the datagrid checkboxes demo page</p>

            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                enableFilterToolbar
                filterbarEnableInfoPopover
                filterbarInfoPopoverContent={
                    <>
                        Gebruik spaties om op meerdere termen tegelijk te zoeken (werkt als EN).
                        <br /> <br />
                        Speciale filters:
                        <ul className="list">
                            <li><strong>+a</strong>(ctief) </li>
                            <li><strong>/!a</strong>(actief) </li>
                            <li><strong>+i</strong>(issues) </li>
                            <li><strong>!i</strong>(issues) </li>
                        </ul>
                    </>
                }
                filterbarInfoPopoverToggleIcon={IconDefinitions.info_square}


                properties={[
                    { prop: "sku", title: "SKU", sortable: true, filter: { type: 'text' }, visible: true },
                    { prop: "naam", title: "Product", sortable: true, filter: { type: 'text' }, visible: true },
                    { prop: "omschrijving", title: "Omschrijving", sortable: true, filter: { type: 'text' }, visible: true },
                    { prop: "categorie", title: "Categorie", sortable: true, visible: true,
                        filter: {
                            type: 'select',
                            multiSelect: true,
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
                    { prop: "prijs", title: "Prijs (€)", sortable: false, wrapValue: (item) => { return <>€  {item.prijs.toFixed(2)}</> } },
                    { prop: "merk", title: "Merk", sortable: true, filter: { type: 'text' } },
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
                    { prop: "beschikbaarVanaf", title: "Beschikbaar vanaf", sortable: true, filter: { type: 'date' }, transformValue: (value) => value ? moment(value as Date).locale("nl").format("DD-MM-YYYY") : "", },
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
                    { prop: "kortingspercentage", title: "Kortingspercentage", sortable: true, filter: { type: 'number' } },
                    { prop: "garantiemaanden", title: "Garantie", sortable: true, filter: { type: 'number' } },
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
                footerContent={(<span>Dit is een test</span>)}
                enableColumnReorder
                enableColumnResize
                enableColumnVisibility
                enableMenuOptionsInHeader
                enableMenuOptionColumnChooser
                enableTabs
                enableTabColumnChooser
                tabs={[
                    { id: "tabTest", title: "Test", icon: <Icon icon={IconDefinitions.eye} size={SizeDefinitions.Small} /> },
                ]}
                tabPanes={[
                    {
                        tabId: "tabTest",
                        content: (<span>Content....</span>),
                        header: {
                            content: "Test"
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
                enableCheckboxes={true}
                checkedItems={checkedItems}
                onRowsChecked={setCheckedItems}
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
            />
        </>
    )
}

export default DatagridFilterToolbarPage;