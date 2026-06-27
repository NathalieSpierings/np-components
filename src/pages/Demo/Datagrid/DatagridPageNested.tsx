import moment from "moment";
import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid, { DatagridRowActionsPosition } from "../../../components/Data/Datagrid/Datagrid";
import useDatagridQueryClientFilter from "../../../components/Data/Datagrid/Hooks/useDatagridQueryClientFilter";
import { Button } from "../../../components/UI/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import Tooltip from "../../../components/UI/Tooltip/Tooltip";
import { OrderGetModel, ProductGetModel, getOrdersForProduct, getProductsQuery } from "../../../lib/testdata/models";
import { IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

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
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            paginationPosition="inside table"
            paginationRowInfoPosition="left"
            selectedRow={selected}
            rowSingleClickAction={(row) => {
                setSelected(row);
                console.log("Clicked row:", row.achternaam);
            }}
            rowDoubleClickAction={(row) => {
                setSelected(row);
                console.log("Double clicked row:", row.achternaam);
            }}
            properties={[
                { prop: "id", title: "Id", sortable: true, visible: true },
                { prop: "productId", title: "Product id", sortable: true, visible: true },
                { prop: "voornaam", title: "Voornaam", sortable: true, visible: true },
                { prop: "tussenvoegsel", title: "Tussenvoegsel", sortable: true, visible: true },
                { prop: "achternaam", title: "Achternaam", sortable: true, visible: true },
                { prop: "straat", title: "Straat" , visible: true},
                { prop: "huisnummer", title: "Huisnummer", visible: true },
                { prop: "postcode", title: "Postcode", visible: true },
                { prop: "plaats", title: "Plaats", visible: true },
                { prop: "land", title: "Land", visible: true },
                { prop: "telefoonnummer", title: "Telefoonnummer", visible: true },
                { prop: "email", title: "Email", visible: true },
                {
                    prop: "besteldatum",
                    title: "Besteldatum",
                    visible: true,
                    transformValue: (value) =>
                        value ? moment(value as Date).locale("nl").format("DD-MM-YYYY") : "",
                },
                { prop: "aantal", title: "Aantal", visible: true },
                { prop: "vervoerder", title: "Vervoerder", sortable: true, visible: true },
                { prop: "status", title: "Status", sortable: true, visible: true },
            ]}
        />
    );
};


const DatagridPageNested: React.FC = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useDatagridQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [selected, setSelected] = useState<ProductGetModel | undefined>();
    const [checkedItems, setCheckedItems] = useState<ProductGetModel[]>([]);
    const [actionsPosition, setActionsPosition] = useState<DatagridRowActionsPosition>('right');

    const collapsibeRowData = (item: ProductGetModel) => {
        return <ProductOrdersTable productId={item.id.toString()} />
    }
    return (
        <>
            <p> Welcome to the datagrid checkboxes demo page</p>


            <Button onClick={() => setActionsPosition('left')}>Move actions to left side</Button>
            <Button onClick={() => setActionsPosition('right')}>Move actions to right side</Button>

            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                collapsibleRowData={collapsibeRowData}
                properties={[
                    { prop: "sku", title: "SKU", sortable: true, },
                    { prop: "naam", title: "Naam", sortable: true, },
                    { prop: "omschrijving", title: "Omschrijving", sortable: true, },
                    { prop: "categorie", title: "Categorie", sortable: true, },
                    { prop: "prijs", title: "Prijs", sortable: true, transformValue: (value: unknown) => `€ ${value}`, },
                    { prop: "merk", title: "Merk", sortable: true, },
                    { prop: "status", title: "Status", sortable: true, },
                    { prop: "voorraad", title: "Voorraad", sortable: true, },
                    { prop: "beschikbaar", title: "Beschikbaar", sortable: true, },
                    { prop: "kleur", title: "Kleur", sortable: true, },
                    { prop: "materiaal", title: "Materiaal", sortable: true, },
                    { prop: "garantiemaanden", title: "Garantiemaanden", sortable: true, },
                    { prop: "minOrderAantal", title: "Min Order Aantal", sortable: true, },
                    { prop: "maxOrderAantal", title: "Max Order Aantal", sortable: true, },
                ]}
                rowActionPosition={actionsPosition}
                rowActions={[
                    {
                        icon: <Tooltip content="Bekijk">
                            <Icon icon={IconDefinitions.eye} iconCss="pointer" />
                        </Tooltip>,
                        action: (item) => { alert(`Bekijk order ${item.naam}`) }
                    },
                    {
                        icon: <Tooltip content="Verwijder">
                            <Icon icon={IconDefinitions.bin} iconCss="pointer" />
                        </Tooltip>,
                        action: (item) => { alert(`Verwijder order ${item.naam}`) }
                    },
                ]}
                footerContent={(<span>Dit is een test</span>)}
                enableColumnReorder
                enableColumnResize
                enableColumnVisibility
                enableStickyHeader
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
                enableTableInfo={checkedItems.length > 0}
            />
        </>
    )
}
export default DatagridPageNested;