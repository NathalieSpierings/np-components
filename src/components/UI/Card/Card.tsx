import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import Box, { BoxProps } from '../../Base/Box/Box';
import Icon from '../../UI/Icons/Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';

export interface CardProps extends Omit<BoxProps, 'title'> {
    title?: string | ReactElement;
    tabs?: boolean;
    headerSticky?: boolean;
    headerActions?: ReactElement[];
    headerBoxProps?: BoxProps;
    imageUrl?: string;
    cardCss?: string;
    scrollPosition?: number;
    collapsible?: boolean;
    cardCollapsed?: boolean;
    setCardCollapsed?: (newValue: boolean) => void;
    scrollableContent?: boolean;
    fluidContent?: boolean;
    footerLeftContent?: ReactElement;
    footerRightContent?: ReactElement;
    footerBoxProps?: BoxProps;
}

const Card: React.FC<CardProps> = ({
    title,
    tabs = false,
    headerSticky = false,
    headerActions = [],
    headerBoxProps = {},
    imageUrl,
    cardCss = '',
    scrollPosition,
    collapsible,
    setCardCollapsed = undefined,
    cardCollapsed = false,
    scrollableContent = false,
    fluidContent = false,
    footerLeftContent,
    footerRightContent,
    footerBoxProps = {},
    children,
    ...boxProps
}) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    const [sticky, setSticky] = useState(false);
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    const checkHeaderSticky = () => {
        return headerSticky;
    };

    const checkScrollPosition = () => {
        return scrollPosition && scrollPosition > 50;
    };

    const handleScroll = () => {
        if (checkHeaderSticky() && checkScrollPosition()) {
            setSticky(true);

            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        } else {
            setSticky(false);
        }
    };

    useEffect(() => {
        handleScroll();
    }, [scrollPosition]);

    const [collapsed, setCollapsed] = useState(cardCollapsed);

    const actionIcons = collapsible
        ? [
            ...headerActions,
            <Tooltip content="Kaart in of uitklappen" key="tooltip-collapse-card">
                <Icon
                    icon={IconDefinitions.angle_down}
                    size={SizeDefinitions.Small}
                    variant="circle"
                    onClick={() => setCardCollapsed ? setCardCollapsed(!cardCollapsed) : setCollapsed(!collapsed)}
                />
            </Tooltip>,
        ]
        : [...headerActions];

    const cls = ['card', cardCss, tabs ? 'tabs' : '', collapsible ? 'card--collapsed' : ''].filter(Boolean).join(' ');

    return (
        <Box {...boxProps} css={cls} style={{ marginTop: sticky ? `${headerHeight}px` : '0' }}>
            {imageUrl ? (
                <div className="card__image">
                    <figure>
                        <img src={imageUrl} alt="" />
                    </figure>
                </div>
            ) : (
                <CardHeader
                    ref={headerRef}
                    {...headerBoxProps}
                    title={title}
                    sticky={sticky}
                    actions={actionIcons}
                />
            )}

            <AnimatePresence initial={false}>
                {!(setCardCollapsed ? cardCollapsed : collapsed) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div
                            className={`card__content ${fluidContent ? 'fluid' : ''} ${scrollableContent ? 'scroll' : ''}`}
                        >
                            {children}
                        </div>

                        {(footerLeftContent || footerRightContent) && (
                            <CardFooter
                                ref={footerRef}
                                {...footerBoxProps}
                                leftContent={footerLeftContent}
                                rightContent={footerRightContent}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default Card;
