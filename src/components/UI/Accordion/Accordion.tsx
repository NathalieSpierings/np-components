import React, { FC, PropsWithChildren, ReactElement, useState } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import { InternalAccordionSection, ExternalAccordionSectionProps } from './AccordionSection';

export interface AccordionProps extends PropsWithChildren {
    defaultOpenIndex?: number;
    accordionCss?: string;
    headerBackground?: ColorDefinitions;
    contentBackground?: ColorDefinitions;
    accentColor?: ColorDefinitions;
    children: ReactElement<Partial<ExternalAccordionSectionProps> | undefined>[];
}

const Accordion: FC<AccordionProps> = ({
    accordionCss = '',
    headerBackground,
    contentBackground,
    defaultOpenIndex = 0,
    accentColor,
    children,
}) => {
    const [activeIndex, setActiveIndex] = useState<number>(defaultOpenIndex);

    return (
        <div
            className={`accordion ${accordionCss}`}
            role="tablist"
            style={
                accentColor
                    ? ({
                          '--accordion-accent': `var(--color-${accentColor})`,
                      } as React.CSSProperties)
                    : undefined
            }
        >
            {children.map((c, i) => {
                return (
                    <InternalAccordionSection 
                        key={`accordionprops-${i}`}
                        index={i} 
                        isActive={i === activeIndex}                
                        setActiveIndex={setActiveIndex}
                        title={c.props?.title ?? ""}
                        headerBackground={c.props?.headerBackground ?? headerBackground}
                        contentBackground={c.props?.contentBackground ?? contentBackground}
                    >
                        {c.props?.children}
                    </InternalAccordionSection>
                );
            })}
        </div>
    );
};

export { AccordionSection } from './AccordionSection';
export default Accordion;
