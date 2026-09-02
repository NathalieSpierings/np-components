import { FC, PropsWithChildren } from "react";
import { useColumnLayout } from "../../../components/UI/ColumnLayout/ColumnLayoutContext";
import { ColorDefinitions } from "../../../lib/utils/definitions";
import DismissButton from "../DismissButton/DismissButton";

export interface ColumnLayoutHeaderProps extends PropsWithChildren {
  enableFixedHeader?: boolean;
  borderColor?: ColorDefinitions;
  css?: string;
}

const ColumnLayoutHeader: FC<ColumnLayoutHeaderProps> = ({
  borderColor = ColorDefinitions.Surface,
  enableFixedHeader = false,
  children,
  css = ""
}) => {
  const { isShown, setIsShown, hasAside, hasMain, enableBurger } =  useColumnLayout();

  const hasToggle = hasAside && hasMain;
  const showBurger = hasToggle && !isShown;
  const showDismiss = hasToggle && isShown;

  return (
    <div className={`column-layout__header ${enableFixedHeader ? "column-layout__header--fixed" : ""} ${borderColor ? "border-" + borderColor : ""} ${css}`}>
      {children}

      {showBurger && enableBurger && (
        <button type="button" className="burger burger--sm" onClick={() => setIsShown(true)}  aria-label="Panel openen">
          <span className="burger__line" />
          <span className="burger__line" />
          <span className="burger__line" />
        </button>
      )}

      {showDismiss && (
        <DismissButton right={true} onClick={() => setIsShown(false)} aria-label="Panel sluiten"/>       
      )}
    </div>
  );
};

export default ColumnLayoutHeader;
