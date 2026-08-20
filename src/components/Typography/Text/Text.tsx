import React, { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import Tooltip from '../../UI/Tooltip/Tooltip';

interface TextProps extends PropsWithChildren {
    textAlign?: 'left' | 'center' | 'right';
    muted?: boolean;
    lines?: number;
    showTooltip?: boolean;
    tooltipContent?: ReactNode | string;
    tooltipArrow?: boolean;
    tooltipColor?: ColorDefinitions;
}

const Text: React.FC<TextProps> = ({
    textAlign = 'left',
    muted,
    lines = 0,
    showTooltip = false,
    tooltipContent,
    tooltipArrow = false,
    tooltipColor = ColorDefinitions.Theme100,
    children,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        if (!lines) return;

        const element = ref.current;
        if (!element) return;

        const containerHeight = element.clientHeight;
        const containerStyles = globalThis.getComputedStyle(element);
        const containerFontSize = Number.parseFloat(containerStyles.fontSize || '0');
        const containerLineHeight = Number.parseFloat(containerStyles.lineHeight || '0');
        const lineHeight = containerLineHeight === containerFontSize ? containerFontSize * 1.2 : containerLineHeight; // Fallback to a default line height if line height is set to "normal"

        const result = containerHeight > lines * lineHeight;

        setIsTruncated(result);
    }, [children, lines]);

    let content: ReactNode;

    if (isTruncated) {
        if (showTooltip) {
            content = (
                <Tooltip
                    arrow={tooltipArrow}
                    background={tooltipColor}
                    content={tooltipContent ? tooltipContent : children}
                    disabled={!isTruncated}
                    direction="bottom"
                >
                    <div
                        ref={ref}
                        className={`tdata ${muted ? 'text-mute' : ''}`}
                        style={{
                            textAlign: textAlign,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: lines,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: '1.5em',
                            position: 'relative',
                        }}
                    >
                        {children}
                    </div>
                </Tooltip>
            );
        } else {
            content = (
                <div
                    ref={ref}
                    className={`tdata ${muted ? 'text-mute' : ''}`}
                    style={{
                        textAlign: textAlign,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: lines,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.5em',
                        position: 'relative',
                    }}
                >
                    {children}
                </div>
            );
        }
    } else {
        content = (
            <div
                ref={ref}
                className={`tdata ${muted ? 'text-mute' : ''}`}
                style={{
                    textAlign: textAlign,
                    lineHeight: '1.5em',
                    position: 'relative',
                }}
            >
                {children}
            </div>
        );
    }

    return content;
};

export default Text;
