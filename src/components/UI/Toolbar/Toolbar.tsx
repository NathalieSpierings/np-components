import React, { ReactElement, ReactNode } from "react"
import { ColorDefinitions } from "../../../lib/utils/definitions";

export type ToolbarNavItemsPosition = 'left' | 'right' | 'after prefix actions';
export interface ToolbarProps {
    title?: string | ReactElement;
    navItems?: ReactNode;
    navItemsPosition?: ToolbarNavItemsPosition;
    showSeparator?: boolean;
    prefixItems?: ReactNode[];
    postfixItems?: ReactNode[];
    borderBottom?: boolean;
    borderColor?: ColorDefinitions;
    compact?: boolean;
    toolbarCss?: string;
}

const Toolbar = ({
    title,
    navItems,
    navItemsPosition = 'left',
    showSeparator = !!navItems,
    prefixItems = [],
    postfixItems = [],
    borderBottom = false,
    borderColor = ColorDefinitions.Surface,
    compact = false,
    toolbarCss = ''
}: ToolbarProps) => {

    const hasPrefixItems = prefixItems.length > 0;
    const hasPostfixItems = postfixItems.length > 0;
    const hasActions = hasPrefixItems || hasPostfixItems;
    const showTitleInActions = title && !hasPrefixItems && hasPostfixItems;
    const showTitleAsHeader = title && !showTitleInActions;

    return (
        <div className={`toolbar ${borderBottom ? 'border-' + borderColor : ''} ${compact ? 'toolbar--compact' : ''} ${toolbarCss}`}>

            {showTitleAsHeader && (
                <div className="toolbar__header">
                    {title}
                </div>
            )}

            <div className="toolbar__container">

                {navItemsPosition === 'left' && (
                    <>
                        {navItems && (
                            <div className="toolbar__nav">
                                {navItems}
                            </div>
                        )}

                        {showSeparator && (
                            <div className="toolbar__separator" />
                        )}
                    </>
                )}

                {hasActions && (
                    <div className="toolbar__actions">
                        {(hasPrefixItems || showTitleInActions) && (
                            <div className="toolbar__actions__prefix">
                                {hasPrefixItems ?
                                    <>
                                        {prefixItems.map((item, idx) => (
                                            <div key={`prefix_` + idx}>{item}</div>
                                        ))}

                                        {navItemsPosition === 'after prefix actions' && (
                                            <>
                                                {showSeparator && (
                                                    <div className="toolbar__separator" />
                                                )}

                                                {navItems && (
                                                    <div className="toolbar__nav">
                                                        {navItems}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </>
                                    : title
                                }
                            </div>
                        )}

                        {hasPostfixItems && (
                            <div className="toolbar__actions__postfix">
                                {postfixItems.map((item, idx) => (
                                    <div key={`prefix_` + idx}>{item}</div>
                                ))}
                            </div>
                        )}

                    </div>
                )}

                {navItemsPosition === 'right' && (
                    <>
                        {showSeparator && (
                            <div className="toolbar__separator" />
                        )}

                        {navItems && (
                            <div className="toolbar__nav">
                                {navItems}
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    )
}

export default Toolbar;