import React from 'react';

export interface BurgerButtonProps {
    onClick: () => void;
    /** Accessible name (and tooltip). Needed when there is no `caption`. */
    label?: string;
    /** Text shown below the lines, e.g. "Menu". Without it, the burger has three lines. */
    caption?: string;
    /** `"sm"` for a smaller burger, e.g. in a header. */
    size?: 'sm';
    className?: string;
}

/** A burger button (the lines, optionally with a caption). Only shown on mobile, see the `.burger` styles. */
export const BurgerButton: React.FC<BurgerButtonProps> = ({ onClick, label, caption, size, className }) => (
    <button
        type="button"
        className={['burger', size && `burger--${size}`, className].filter(Boolean).join(' ')}
        onClick={onClick}
        aria-label={label}
        title={label}
    >
        <span className="burger__line" />
        <span className="burger__line" />
        {caption ? <span className="burger__title">{caption}</span> : <span className="burger__line" />}
    </button>
);

export interface BurgerProps {
    hasSidebars: boolean | undefined;
    showSidebarMobile?: boolean;
    setShowSidebarMobile?: (shown: boolean) => void;
}

/** The burger that toggles the main menu on mobile. */
const Burger: React.FC<BurgerProps> = ({ hasSidebars, showSidebarMobile, setShowSidebarMobile }) => {
    let toggleMobileSidebars = () => {
        setShowSidebarMobile?.(!showSidebarMobile);
    };

    return hasSidebars ? <BurgerButton caption="Menu" onClick={toggleMobileSidebars} /> : null;
};

export default Burger;
