import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { FC, PropsWithChildren, ReactElement } from 'react';
import ContentItem from '../ContentItem/ContentItem';

export interface CollapsibleProps extends PropsWithChildren {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    title?: string | ReactElement;
    collapseCss?: string;
}

const Collapsible: FC<CollapsibleProps> = ({ title, collapsed, setCollapsed, children, collapseCss = '' }) => {
    return (
        <div className={`collapsible ${collapsed ? 'shown' : ''} ${collapseCss}`}>
            <button type="button" className="collapsible__header" onClick={() => setCollapsed(!collapsed)} >
                <ContentItem item={{
                    id: 'collapsibleHeader',
                    content: <span>{title}</span>,
                    postfix: <motion.div
                        className="icon"
                        animate={{ rotate: collapsed ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="icon">▼</div>
                    </motion.div>
                }} />
                {' '}
            </button>

            <AnimatePresence initial={false}>
                {collapsed && (
                    <motion.div
                        className="collapsible__container"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div
                            className="collapsible__content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Collapsible;
