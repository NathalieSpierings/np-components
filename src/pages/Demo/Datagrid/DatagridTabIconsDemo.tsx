import React, { useState } from "react";
import { EventStopper } from "../../../components";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid, { DatagridTabberPosition, DatagridTabsDisplay } from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { Title } from "../../../components/Typography/Title";
import Select from "../../../components/Forms/Select/Select";
import Button from "../../../components/UI/Button/Button";
import { Icon } from "../../../components/UI/Icons/Icon";
import { filterProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { ProductOrders } from "./ProductOrdersTable";


const DatagridTabIconsDemo: React.FC = () => {

    const [selected, setSelected] = useState<ProductGetModel | undefined>();

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const [tabsDirection, setTabsDirection] = useState<DatagridTabberPosition>("right");
    const [enableTabFilters, setEnableTabFilters] = useState(false);
    const [enableTabColumnVisibility, setEnableTabColumnVisibility] = useState(false);

    // Aantal rijen en weergave van de tabs instelbaar om "auto", "labels" en "icons" te testen
    const [rowCount, setRowCount] = useState(1);
    const [tabsDisplay, setTabsDisplay] = useState<DatagridTabsDisplay>("auto");
    const visibleRows = (data ?? []).slice(0, rowCount);

    const rowOptions = [1, 5, 10, 25];

    const displayOptions: { value: DatagridTabsDisplay; label: string }[] = [
        { value: "auto", label: "Auto" },
        { value: "labels", label: "Labels" },
        { value: "icons", label: "Icons" },
    ];

    const toggleTabberPosition = () => {
        const nextPosition = tabsDirection === "right" ? "left" : "right";
        setTabsDirection(nextPosition);
    };

    return (
        <EventStopper>
            <p>Deze datagrid heeft geen fullHeight. Met "auto" tonen de tabs alleen een icoon als de labels niet in de hoogte van de tabel passen (het label zie je dan in een tooltip). Met "labels" zie je altijd volledige tabs, met "icons" altijd alleen iconen. Wissel het aantal rijen en de weergave met de knoppen.</p>

            <Datagrid
                data={visibleRows}
                dataRaw={dataRaw}
                total={visibleRows.length}
                fullHeight={false}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                collapsibleRowData={ProductOrders}
                toolbarTitle={<Title size="md">Alle products</Title>}
                toolbarBorderBottom={true}
                toolbarPrefixItems={[
                    <Button key="tabber" onClick={toggleTabberPosition}>Tabs naar {tabsDirection === "right" ? "links" : "rechts"}</Button>,
                    <Button key="enableTabFilters" onClick={() => setEnableTabFilters(!enableTabFilters)}>{enableTabFilters === false ? "Enable" : "Disible"} tab filters</Button>,
                    <Select
                        key="rows"
                        label="Aantal rijen"
                        small
                        value={String(rowCount)}
                        onValueChange={(value) => setRowCount(Number(value))}
                    >
                        {rowOptions.map((count) => (
                            <option key={count} value={count}>{count}</option>
                        ))}
                    </Select>,
                    ...displayOptions.map((option) => (
                        <Button
                            key={option.value}
                            color={tabsDisplay === option.value ? ColorDefinitions.Primary : undefined}
                            onClick={() => setTabsDisplay(option.value)}
                        >
                            {option.label}
                        </Button>
                    )),
                    <Button key="enableTabColumnVisibility" onClick={() => setEnableTabColumnVisibility(!enableTabColumnVisibility)}>{enableTabColumnVisibility === false ? "Enable" : "Disible"} column tab column visibility</Button>
                ]}
                toolbarPostfixItems={[
                    <Icon key="icon" icon={IconDefinitions.file_csv} />
                ]}
                enableColumnReorder
                enableColumnResize
                enableStickyHeader
                enableColumnVisibility
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
                tabberPosition={tabsDirection}
                tabsDisplay={tabsDisplay}
                enableTabColumnVisibility={enableTabColumnVisibility}
                enableTabFilters={enableTabFilters}
                tabs={[
                    {
                        id: "tabInfo",
                        title: "Informatie",
                        icon: <Icon icon={IconDefinitions.info_circle} size={SizeDefinitions.Small} />
                    },
                    {
                        id: "tabHistory",
                        title: "Historie",
                        icon: <Icon icon={IconDefinitions.history} size={SizeDefinitions.Small} />
                    },
                    {
                        id: "tabSettings",
                        title: "Instellingen",
                        icon: <Icon icon={IconDefinitions.cog} size={SizeDefinitions.Small} />
                    }
                ]}
                tabPanes={[
                    {
                        tabId: "tabInfo",
                        content: (<span>Informatie over het geselecteerde product...</span>),
                        header: { content: "Informatie" }
                    },
                    {
                        tabId: "tabHistory",
                        content: (<span>Historie van het geselecteerde product...</span>),
                        header: { content: "Historie" }
                    },
                    {
                        tabId: "tabSettings",
                        content: (<span>Instellingen...</span>),
                        header: { content: "Instellingen" }
                    }
                ]}
                properties={filterProductColumns() as any}
            />
        </EventStopper>
    )
}

export default DatagridTabIconsDemo;