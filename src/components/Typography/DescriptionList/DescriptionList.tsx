import React, { ReactElement } from 'react';

export interface DescriptionListItem {
    id?: string | number;
    label: string | ReactElement;
    content: string | ReactElement;
    scrollableContent?: boolean;
}
export interface DescriptionListProps {
    data: DescriptionListItem[];
    enableColon?: boolean;
    columnGap?: string;
    rowGap?: string;
    css?: string;
}

const DescriptionList: React.FC<DescriptionListProps> = ({ data, enableColon, columnGap, rowGap, css = '' }) => {
    return (
        <dl className={`description-list ${enableColon ? 'description-list--colon' : ''} ${css} `}
        style={{
        columnGap: columnGap,
        rowGap: rowGap
      }}>
            {data.map((item, idx) => (
                <React.Fragment key={item.id || idx}>
                    <dt>{item.label}</dt>
                    <dd className={item.scrollableContent ? 'scrollable' : ''}>
                        {item.content}
                    </dd>
                </React.Fragment>
            ))}
        </dl>
    );
};

export default DescriptionList;
