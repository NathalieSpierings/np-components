import React, { ReactElement } from 'react';
import { SizeDefinitions } from '../../../lib/utils/definitions';
import { BoxProps } from '../../Base/Box';
import Box from '../../Base/Box/Box';
import ContentItem from '../ContentItem/ContentItem';

export interface WidgetProps extends BoxProps {
    onClick?: () => void;
    horizontal?: boolean;
    image?: string | ReactElement;
    imageSize?: SizeDefinitions;
    imageBackground?: string;
    imageCss?: string;
    widgetPrefix?: string | ReactElement;
    widgetContent?: string | ReactElement;
    widgetPostfix?: string | ReactElement;
    prefixItemPosition?:  'item-start' | 'item-center' | 'item-end';
    contentItemPosition?:  'item-start' | 'item-center' | 'item-end';
    contentJustifyPosition?: 'justify-start' | 'justify-center' | 'justify-end';
    postfixItemPosition?: 'item-start' | 'item-center' | 'item-end';
}

const Widget: React.FC<WidgetProps> = ({
    onClick,
    horizontal,
    image,
    imageSize,
    imageBackground,
    imageCss = '',
    widgetPrefix,
    prefixItemPosition,
    widgetContent,
    contentItemPosition,
    contentJustifyPosition,
    widgetPostfix,
    postfixItemPosition,
    children,
    ...boxProps
}) => {

    const imgCss = [
        'widget__image',
        imageSize ? "widget__image-" + imageSize : '',
        imageBackground ? "bg-" + imageBackground : '',
        imageCss,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Box {...boxProps} css={`widget ${horizontal ? 'widget--horizontal' : ''}`} onClick={onClick}>
            <div className="widget__container">
                {image ? (
                    <div className={imgCss}>
                        {image}
                    </div>
                ) : null}

                {widgetPrefix || widgetContent || widgetPostfix ? (
                    <ContentItem item={{
                        id: 'widget-content',
                        prefix: widgetPrefix,
                        prefixItemPosition: prefixItemPosition,                       
                        content: widgetContent,
                        contentItemPosition: contentItemPosition,
                        contentJustifyPosition: contentJustifyPosition,
                        postfix: widgetPostfix,
                        postfixItemPosition: postfixItemPosition,
                    }} />
                ) : (
                    <div className="widget__content">{children}</div>
                )}
            </div>
        </Box>
    );
};

export default Widget;
