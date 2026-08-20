import React, { useState } from "react";
import { DatagridGetDataArguments } from "../../../components/Data/Datagrid/Config/DatagridData";
import Datagrid from "../../../components/Data/Datagrid/Datagrid";
import { useTableQueryClientFilter } from "../../../components/Data/Datagrid/Hooks/useTableQueryClientFilter";
import { PaginationInfoPosition, PaginationPosition } from "../../../components/Data/Datagrid/Pagination";
import Title from "../../../components/Typography/Title/Title";
import Button from "../../../components/UI/Button/Button";
import { defaultProductColumns } from "../../../lib/testdata/mock";
import { ProductGetModel, getProductsQuery } from "../../../lib/testdata/models";
import { ProductOrders } from "./ProductOrdersTable";


const DatagridPagerDemo: React.FC = () => {

    // Paging
    const [paginationPosition, setPaginationPosition] = useState<PaginationPosition>("outside table");
    const [paginationInfoPosition, setPaginationInfoPosition] = useState<PaginationInfoPosition>("right");

    const pageSizesDefaults = [5, 10, 25, 50, 100];
    const pageSizesExtended = [5, 10, 25, 50, 100, 250, 500, 1000];
    const [extendedPageSizes, setExtendedPageSizes] = useState(false);
    const pageSizes = extendedPageSizes ? pageSizesExtended : pageSizesDefaults;


    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    const togglePagination = () => {
        const nextPosition = paginationPosition === "outside table" ? "inside table" : "outside table";
        setPaginationPosition(nextPosition);
    };

    const togglePagerInfoPosition = () => {
        const nextPosition = paginationInfoPosition === "right" ? "left" : "right";
        setPaginationInfoPosition(nextPosition);
    };

    const togglePageSizes = () => {
        setExtendedPageSizes(current => !current);
    };


    return (
        <>
            <p>De pager in de nested table staat altijd inside table. De info staat standaard links, dit voorkomt dat als je veel kolommen hebt je helemaal naar rechts moet scrollen om de pager info te zien.</p>
            <p>Mogelijk wil je de pager van de master in de table hebben zodat er in de footer meer ruimte over is voor andere content zoals bijv. totalen. Dit wordt nu nog niet gebruikt maar mogelijk wel in de toekomst. </p>

            <Datagrid
                data={data || []}
                dataRaw={dataRaw}
                total={total || 0}
                loading={status === "pending"}
                onFilterUpdate={setTableOptions}
                toolbarTitle={<Title size="md">All products</Title>}
                toolbarBorderBottom={true}
                toolbarPrefixItems={[
                    <Button key="pager-position" onClick={togglePagination}>Paginatie {paginationPosition === "outside table" ? "inside table" : "outside table"}</Button>,
                    <Button key="pager" onClick={togglePagerInfoPosition}>Pager info naar {paginationInfoPosition === "right" ? "left" : "right"}</Button>,
                    <Button key="pagesizes" onClick={togglePageSizes}>Pagesizes {extendedPageSizes ? "extended" : "default"}</Button>
                ]}
                collapsibleRowData={ProductOrders}

                //pagination
                paginationPosition={paginationPosition}
                paginationRowInfoPosition={paginationInfoPosition}
                pageSizeOptions={pageSizes}
                footerContent={(<span>Dit is een test</span>)}
                properties={defaultProductColumns() as any}
            />
        </>
    )
}

export default DatagridPagerDemo;