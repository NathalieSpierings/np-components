import React, { ReactNode } from "react";
import { IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import { Icon } from "../../UI/Icons/Icon";
import { StaticInputProps, StaticInput } from "../Input";

interface FromDisplayListPropsBase extends Omit<StaticInputProps, "value" | "addonPrefix" | "addonSuffix"> {
    noSingleItemList?: true;
    placeholder?: ReactNode;
}

type FromDisplayListProps =
    | (FromDisplayListPropsBase & {
        value: ReactNode[];
        children?: never;
    })
    | (FromDisplayListPropsBase & {
        value?: never;
        children: ReactNode;
    });

const FormDisplayList = ({
    value: valueParams,
    children,
    placeholder,
    noSingleItemList,
    ...staticInputProps
}: FromDisplayListProps): ReactNode => {
    const value = valueParams ?? React.Children.toArray(children);

    if (value.length === 0 && placeholder !== undefined) {
        value.push(placeholder);
    }

    const firstItem: ReactNode = value?.[0] ?? placeholder;

    const valueForStaticInput: ReactNode =
        noSingleItemList && value.length < 2 ? (
            firstItem
        ) : (
            <ul className="form-display-list">
                {value.map((e, i) => (
                    <li key={i} className="form-display-list__item">
                        <Icon icon={IconDefinitions.angle_right} size={SizeDefinitions.Small} />
                        <span className="form-display-list__item__content">{e}</span>
                    </li>
                ))}
            </ul>
        );

    return <StaticInput value={valueForStaticInput} {...staticInputProps} />;
};

export default FormDisplayList;
export { FromDisplayListProps }