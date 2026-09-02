import type { DatagridColumnFilterConfig } from "../../Filters/DatagridColumnFilter";
import type { DatagridColumnFilterTypeServer } from "./types";

/**
 * Map a server type -> client type
 */
const serverToClientColumnFilterTypeMap = {
    number: {
        type: "number",
    },
    text: {
        type: "text",
    },
    date: {
        type: "date",
    },
    singleSelect: {
        type: "select",
        multiSelect: false,
    },
    multiSelect: {
        type: "select",
        multiSelect: true,
    },
} as const satisfies Record<
    DatagridColumnFilterTypeServer,
    DatagridColumnFilterConfig<unknown>
>;

export default serverToClientColumnFilterTypeMap;