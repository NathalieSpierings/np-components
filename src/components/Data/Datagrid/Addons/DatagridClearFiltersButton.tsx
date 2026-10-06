import { ColorDefinitions, IconDefinitions } from "../../../../lib/utils/definitions";
import Button, { ButtonProps } from "../../../UI/Button/Button";
import Icon from "../../../UI/Icons/Icon/Icon";
import Tooltip from "../../../UI/Tooltip/Tooltip";

export type DatagridClearFiltersButtonButtonProps = Omit<ButtonProps, "children" | "onClick">;

export interface DatagridClearFiltersButtonProps {
    onClick: () => void;
    label?: string;
    color?: ColorDefinitions;   
    showTooltip?: boolean;
    tooltipContent?: string;
    buttonProps?: DatagridClearFiltersButtonButtonProps;
}

// "Filter wissen" button. Used by the Datagrid itself (toolbar / table info), but can also be placed anywhere on the page (filterInfoPosition="none").
const DatagridClearFiltersButton = ({
    onClick,
    label = "Filter wissen",
    color,
    showTooltip = true,
    tooltipContent = "Alle filters wissen",
    buttonProps
}: DatagridClearFiltersButtonProps) => {

    const button = (
        <Button color={color} {...buttonProps} onClick={onClick}>
            <Icon icon={IconDefinitions.funnel_cross} position="left" />
            {label}
        </Button>
    );

    if (!showTooltip) {
        return button;
    }

    return (
        <Tooltip content={tooltipContent} direction="top-left">
            {button}
        </Tooltip>
    );
};

export default DatagridClearFiltersButton;
