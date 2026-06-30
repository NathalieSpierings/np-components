import moment from "moment";
import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import useDatagridQueryClientFilter from "../../../components/Data/Datagrid/Hooks/useDatagridQueryClientFilter";
import Toggle from "../../../components/Forms/Toggle/Toggle";
import Title from "../../../components/Typography/Title/Title";
import { Button } from "../../../components/UI/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions } from "../../../lib/utils/definitions";

const DatagridToolbarDemo: React.FC = () => {

    const [toggleChecked, setToggleChecked] = useState(true);

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useDatagridQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const wrapPrice = (item: ProductGetModel) => {
        return <>€  {item.prijs.toFixed(2)}</>
    }

    return (

        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}

            toolbarTitle={<Title size="md">Alle orders</Title>}
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
            properties={[
                { prop: "sku", title: "SKU", sortable: true, visible: true },
                { prop: "naam", title: "Product", sortable: true, visible: true },
                { prop: "omschrijving", title: "Omschrijving", sortable: true, visible: true },
                { prop: "categorie", title: "Categorie", sortable: true, visible: true },
                { prop: "prijs", title: "Prijs (€)", sortable: true, visible: true, wrapValue: wrapPrice },
                { prop: "merk", title: "Merk", sortable: true, visible: true },
                { prop: "status", title: "Status", sortable: true, visible: true },
                { prop: "voorraad", title: "Voorraad", sortable: true, visible: true },
                { prop: "beschikbaar", title: "Beschikbaar", sortable: true, visible: true },
                { prop: "beschikbaarVanaf", title: "Beschikbaar vanaf", sortable: true, visible: true, transformValue: (value) => value ? moment(value as Date).locale("nl").format("DD-MM-YYYY") : "", },
                { prop: "gewicht", title: "Gewicht", sortable: true, visible: true },
                { prop: "kleur", title: "Kleur", sortable: true, visible: true },
                { prop: "materiaal", title: "Materiaal", sortable: true, visible: true },
                { prop: "kortingspercentage", title: "Kortingspercentage", sortable: true, visible: true },
                { prop: "garantiemaanden", title: "Garantie", sortable: true, visible: true },
                { prop: "minOrderAantal", title: "Min order", sortable: true, visible: true },
                { prop: "maxOrderAantal", title: "Max order", sortable: true, visible: true },
                { prop: "aanbevolen", title: "Uitgelicht", sortable: true, },
                { prop: "rating", title: "Rating", sortable: true, visible: true },
                { prop: "aantalReviews", title: "Aantal reviews", sortable: true, visible: true },
                { prop: "prioriteit", title: "Prioriteit", filter: { type: 'text' } },
                { prop: "leverancier", title: "Leverancier", sortable: true, },
                { prop: "leverancierEmail", title: "Email leverancier", sortable: true, },
                { prop: "landVanAfkomst", title: "Herkomst", sortable: true, },
                { prop: "warehouseLocatie", title: "Warehouse locatie", sortable: true, },
                { prop: "barcode", title: "Barcode", sortable: true, },
                { prop: "serialNummer", title: "Serialnummer", sortable: true, },
                { prop: "batchNummer", title: "Batch nummer", sortable: true, },
            ]}
        />
    )
}

export default DatagridToolbarDemo;