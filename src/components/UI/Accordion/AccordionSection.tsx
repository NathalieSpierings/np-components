import React, { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';

export interface ExternalAccordionSectionProps extends PropsWithChildren {
    title: string;
    headerBackground?: ColorDefinitions;
    contentBackground?: ColorDefinitions;
}

export interface InternalAccordionSectionProps extends ExternalAccordionSectionProps {
    index: number;
    isActive: boolean;
    setActiveIndex(index: number): void;
}

const ExternalAccordionSection = (props: ExternalAccordionSectionProps) : ReactNode => {
    // Ignores props, props are retrieved from DOM in the accordion
    return <>{props.children}</>;
}

const InternalAccordionSection: React.FC<InternalAccordionSectionProps> = ({
    index,
    isActive,
    setActiveIndex,
    title,
    headerBackground,
    contentBackground,
    children,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    const handleHeight = () => {
        if (contentRef.current) {
            const newHeight = contentRef.current.scrollHeight || 0;
            setHeight(newHeight);
        }
    };

    useEffect(() => {
        handleHeight();

        const timeoutId = globalThis.setTimeout(() => {
            handleHeight();
        }, 333);

        window.addEventListener('resize', handleHeight);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleHeight);
        };
    }, []);

    const innerStyle = {
        height: `${isActive ? height : 0}px`,
    };

    return (
        <div className={`accordion__item ${headerBackground ? "border-" + headerBackground : ''}`} aria-expanded={isActive}>
            <button 
            type="button"
            className={`accordion__header ${headerBackground ? "bg-" + headerBackground : ''}`}
                onClick={() => setActiveIndex(index)}
            >
                {title}
            </button>
            <div
                ref={contentRef}
                className={`accordion__content ${contentBackground ? "bg-" + contentBackground : ''}`}
                style={innerStyle}
                aria-hidden={!isActive}
            >
                <div className="accordion__content__container">{children}</div>
            </div>
        </div>
    );
};

export { InternalAccordionSection, ExternalAccordionSection as AccordionSection };
