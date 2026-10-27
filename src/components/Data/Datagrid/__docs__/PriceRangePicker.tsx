import { SizeDefinitions } from "../../../../lib/utils/definitions";
import Button from "../../../UI/Button/Button";
import { DatagridColumnFilterValue } from "../Filters/DatagridColumnFilter";
import { useDatagridFilter } from "../Filters/DatagridFilterContext";

const PRICE_RANGES: { label: string; filter: DatagridColumnFilterValue }[] = [
    { label: "Tot € 50", filter: { operator: "lessThan", value: "50" } },
    { label: "€ 50 - € 250", filter: { operator: "between", value: "50", valueTo: "250" } },
    { label: "Meer dan € 250", filter: { operator: "greaterThan", value: "250" } },
];

// Voorbeeld van een customPicker: vaste prijsklassen in plaats van de standaard getal-invoer.
export function PriceRangePicker() {
    const { value, setValue } = useDatagridFilter();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {PRICE_RANGES.map((range) => {
                const selected = value?.operator === range.filter.operator
                    && value?.value === range.filter.value
                    && value?.valueTo === range.filter.valueTo;

                return (
                    <Button
                        key={range.label}
                        size={SizeDefinitions.Small}
                        variant={selected ? undefined : "outline"}
                        onClick={() => setValue(selected ? undefined : range.filter)}
                    >
                        {range.label}
                    </Button>
                );
            })}
        </div>
    );
}
