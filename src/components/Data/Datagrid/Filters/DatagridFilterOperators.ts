import { DatagridColumnFilterType } from "./DatagridColumnFilter";

export const textOperators = [
    { label: "Bevat", value: "contains" },
    { label: "Bevat geen", value: "notContains" },
    { label: "Gelijk aan", value: "equals" },
    { label: "Ongeljk aan", value: "notEquals" },
    { label: "Begint met", value: "beginsWith" },
    { label: "Eindigd met", value: "endsWith" },
    { label: "Leeg", value: "blank" },
    { label: "Niet leeg", value: "notBlank" },
];

export const numberOperators = [
    { label: "Gelijk aan", value: "equals" },
    { label: "Ongeljk aan", value: "notEquals" },
    { label: "Groter dan", value: "greaterThan" },
    { label: "Groter dan of gelijk aan", value: "greaterThanOrEqual" },
    { label: "Kleiner dan", value: "lessThan" },
    { label: "Kleiner dan of gelijk aan", value: "lessThanOrEqual" },
    { label: "Tussen", value: "between" },
    { label: "Leeg", value: "blank" },
    { label: "Niet leeg", value: "notBlank" },
];

export const dateOperators = [
    { label: "Gelijk aan", value: "equals" },
    { label: "Ongeljk aan", value: "notEquals" },
    { label: "Voor", value: "before" },
    { label: "Na", value: "after" },
    { label: "Tussen", value: "between" },
    { label: "Leeg", value: "blank" },
    { label: "Niet leeg", value: "notBlank" },
];

export function getOperators(type: DatagridColumnFilterType) {
    switch (type) {
        case "number":
            return numberOperators;

        case "date":
            return dateOperators;

        case "text":
        default:
            return textOperators;
    }
}