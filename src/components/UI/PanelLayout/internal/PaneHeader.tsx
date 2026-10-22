import { motion } from "framer-motion";
import { FC, ReactElement } from "react";
import { joinClasses } from "../../../../lib/helpers/helpers";
import { IconDefinitions } from "../../../../lib/utils/definitions";
import { BurgerButton } from "../../../Page/Burger/Burger";
import Button from "../../Button/Button";
import ContentItem from "../../ContentItem/ContentItem";
import DismissButton from "../../DismissButton/DismissButton";
import Icon from "../../Icons/Icon/Icon";
import { usePanelLayout } from "../PanelLayoutContext";
import { asideLabel, AsidePane, FADE_ON_CHANGE, fadeVariant, Pane, TRANSITION } from "./model";
import { SlotInfo } from "./slots";

/** A ghost icon button in a header, e.g. an aside's collapse arrow, or its open button on mobile. */
const HeaderButton: FC<{ icon: IconDefinitions | ReactElement; label: string; onClick: () => void; className: string }> = ({
    icon,
    label,
    onClick,
    className,
}) => (
    <Button variant="ghost" iconOnly css={className} aria-label={label} title={label} onClick={onClick}>
        {typeof icon === "string" ? <Icon icon={icon} renderAs="span" /> : icon}
    </Button>
);

/**
 * Buttons in the header of the screen shown on mobile: on the main screen a button per aside to open it
 * (its `icon`, or a burger), on an aside's screen a dismiss button to go back. Hidden on desktop by CSS.
 */
const MobileActions: FC<{ activePane?: Pane; openButtons: AsidePane[] }> = ({ activePane, openButtons }) => {
    const { open, close } = usePanelLayout();

    if (activePane?.kind === "aside") {
        return <DismissButton dismissCss="panel-layout__action--mobile" onClick={() => close(activePane.key)} />;
    }

    return (
        <>
            {openButtons.map((aside) => {
                const label = `${asideLabel(aside)} openen`;
                const { icon } = aside.props;

                return icon === undefined ? (
                    <BurgerButton key={aside.key} size="sm" label={label} onClick={() => open(aside.key)} className="panel-layout__action--mobile" />
                ) : (
                    <HeaderButton key={aside.key} icon={icon} label={label} onClick={() => open(aside.key)} className="panel-layout__action--mobile" />
                );
            })}
        </>
    );
};

/**
 * A pane's own header, or a `PanelLayout.Header` shared by several panes: a `pc-layout__header` with the (collapsed)
 * header content, the desktop collapse arrows and the mobile actions. Renders nothing when it has nothing to show.
 */
export const PaneHeader: FC<{ info: SlotInfo }> = ({ info }) => {
    const { close } = usePanelLayout();
    const { activePane, ownAside, collapsed, content, collapsibleAsides, openButtons } = info;

    if (!info.visibleOnDesktop && !info.visibleOnMobile) {
        return null;
    }

    const showsCollapsedHeader = collapsed && ownAside?.props.collapsedHeader !== undefined;

    const cssClass = joinClasses(
        "pc-layout__header",
        "panel-layout__header",
        showsCollapsedHeader && "panel-layout__header--collapsed",
        // An aside's header keeps its full width while the aside animates (clipped instead of reflowing)
        ownAside && !showsCollapsedHeader && "panel-layout__header--fixed-width",
        !info.visibleOnDesktop && "panel-layout__header--hidden-desktop",
        !info.visibleOnMobile && "panel-layout__header--hidden-mobile",
    );

    const actions = (
        <>
            {collapsibleAsides.map((aside) => (
                <HeaderButton
                    key={aside.key}
                    icon={aside.side === "left" ? IconDefinitions.angle_left : IconDefinitions.angle_right}
                    label={`${asideLabel(aside)} inklappen`}
                    onClick={() => close(aside.key)}
                    className="panel-layout__action--desktop"
                />
            ))}
            <MobileActions activePane={activePane} openButtons={openButtons} />
        </>
    );

    return (
        // The content changes between the header and the `collapsedHeader`: fade it in
        <motion.header className={cssClass} variants={FADE_ON_CHANGE} animate={fadeVariant(collapsed)} initial={false} transition={TRANSITION}>
            <ContentItem item={{ content, postfix: actions }} />
        </motion.header>
    );
};
