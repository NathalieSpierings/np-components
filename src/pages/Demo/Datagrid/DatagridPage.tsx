import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import useDatagridQueryClientFilter from "../../../components/Data/Datagrid/Hooks/useDatagridQueryClientFilter";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const DatagridPage: React.FC = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useDatagridQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <>
            <p> Welcome to the datagrid demo page</p>

            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
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
                footerContent={(<span>Dit is een test</span>)}

                enableTabs
                tabs={[
                    { id: "tabMenu", title: "Menu", icon: <Icon icon={IconDefinitions.burger} size={SizeDefinitions.Small}/> },
                    { id: "tabColumns", title: "Kolommen", icon: <Icon icon={IconDefinitions.window} size={SizeDefinitions.Small}/>  },
                ]}
                tabPanes={[
                    {
                        tabId: "tabMenu",
                        content: (<span>Content....</span>),
                        header:{
                            content: "Menu"
                        }
                    },
                    {
                        tabId: "tabColumns",
                        content: (
                            <span>Content....</span>
                        ),
                         header:{
                            content: "Kolommen"
                        }
                    },
                ]}
            />
        </>
    )
}
export default DatagridPage;