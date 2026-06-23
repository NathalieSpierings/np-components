import React, {
    FC,
    PropsWithChildren,
    ReactNode,
    RefObject,
    useEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ColorDefinitions } from '../../../lib/utils/definitions';

export type TooltipDirection =
    | 'left'
    | 'right'
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'bottom-left'
    | 'bottom'
    | 'bottom-right';

type TooltipPosition = {
    top: number;
    left: number;
    transform: string;
};

export interface TooltipBaseProps {
    delay?: number;
    direction?: TooltipDirection;
    content?: ReactNode;
    background?: ColorDefinitions;
    disabled?: boolean;
    arrow?: boolean;
    overflowTooltip?: boolean;
    renderHtml?: boolean;
    distance?: number;
    gap?: number;
}

export interface DefaultTooltipProps extends TooltipBaseProps, PropsWithChildren {
    mode?: 'default';
}

export interface AnchoredTooltipProps extends TooltipBaseProps {
    mode: 'anchored';
    anchorRef: RefObject<HTMLElement | null>;
    enabled: boolean;
}

export type TooltipProps = DefaultTooltipProps | AnchoredTooltipProps;

const MOBILE_BREAKPOINT = '(max-width: 768px)';

const mobileDirectionMap: Partial<Record<TooltipDirection, TooltipDirection>> = {
    right: 'left',
    'top-right': 'top-left',
    'bottom-right': 'bottom-left',
	 left: 'right',
    'top-left': 'top-right',
    'bottom-left': 'right',
};

const getPosition = (
    gap: number,
    rect: DOMRect,
    direction: TooltipDirection
): TooltipPosition => {
    const positions: Record<TooltipDirection, TooltipPosition> = {
        left: {
            top: rect.top + rect.height / 2,
            left: rect.left - gap,
            transform: 'translate(-100%, -50%)',
        },
        right: {
            top: rect.top + rect.height / 2,
            left: rect.right + gap,
            transform: 'translateY(-50%)',
        },
        'top-left': {
            top: rect.top - gap,
            left: rect.left,
            transform: 'translate(-75%, -100%)',
        },
        top: {
            top: rect.top - gap,
            left: rect.left + rect.width / 2,
            transform: 'translate(-50%, -100%)',
        },
        'top-right': {
            top: rect.top - gap,
            left: rect.right,
            transform: 'translate(-25%, -100%)',
        },
        'bottom-left': {
            top: rect.bottom + gap,
            left: rect.left,
            transform: 'translateX(-75%)',
        },
        bottom: {
            top: rect.bottom + gap,
            left: rect.left + rect.width / 2,
            transform: 'translateX(-50%)',
        },
        'bottom-right': {
            top: rect.bottom + gap,
            left: rect.right,
            transform: 'translateX(-25%)',
        },
    };

    return positions[direction];
};

const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = globalThis.matchMedia(MOBILE_BREAKPOINT);

        setIsMobile(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return isMobile;
};

const getEffectiveDirection = (
    direction: TooltipDirection,
    isMobile: boolean
): TooltipDirection => {
    return isMobile ? mobileDirectionMap[direction] ?? direction : direction;
};

const getTooltipClassName = (
    isAnchored: boolean,
    background: ColorDefinitions | undefined,
    overflowTooltip: boolean,
    arrow: boolean,
    direction: TooltipDirection
): string => {
    return [
        'tooltip',
        isAnchored ? 'tooltip--anchored' : '',
        background && !overflowTooltip ? `tooltip-${background}` : '',
        arrow && !overflowTooltip ? 'tooltip--arrow' : '',
        overflowTooltip ? 'tooltip--overflow' : '',
        `tooltip--${direction}`,
    ]
        .filter(Boolean)
        .join(' ');
};

const getDefaultChildren = (props: TooltipProps): ReactNode => {
    return props.mode === 'anchored' ? null : props.children;
};

const getTooltipContent = (
    props: TooltipProps,
    isAnchored: boolean,
    overflowTooltip: boolean,
    content: ReactNode
): ReactNode => {
    if (overflowTooltip && !isAnchored && content == null) {
        return getDefaultChildren(props);
    }

    return content;
};

const Tooltip: FC<TooltipProps> = props => {
    const {
        delay = 400,
        content,
        background,
        disabled = false,
        arrow = true,
        overflowTooltip = false,
        renderHtml = false,
        gap = 12,
    } = props;

    const direction: TooltipDirection = props.direction ?? (overflowTooltip ? 'bottom' : 'top');

    const internalAnchorRef = useRef<HTMLSpanElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [active, setActive] = useState(false);
    const [position, setPosition] = useState<TooltipPosition>({
        top: 0,
        left: 0,
        transform: '',
    });

    const isMobile = useIsMobile();
    const isAnchored = props.mode === 'anchored';
    const enabled = isAnchored ? props.enabled : false;
    const effectiveDirection = getEffectiveDirection(direction, isMobile);

    const tooltipContent = getTooltipContent(props, isAnchored, overflowTooltip, content);

    const getAnchorElement = (): HTMLElement | null => {
        return isAnchored ? props.anchorRef.current : internalAnchorRef.current;
    };

    const getPortalRoot = (): HTMLElement => {
        const anchor = getAnchorElement();

        return anchor?.ownerDocument.body ?? document.body;
    };

    const getAnchorRect = (): DOMRect | null => {
        const anchor = getAnchorElement();

        if (!anchor) {
            return null;
        }

        if (isAnchored) {
            return anchor.getBoundingClientRect();
        }

        const range = anchor.ownerDocument.createRange();
        range.selectNodeContents(anchor);

        const rect = range.getBoundingClientRect();

        return rect.width === 0 && rect.height === 0
            ? anchor.getBoundingClientRect()
            : rect;
    };

    const isTextOverflowing = (): boolean => {
        const anchor = getAnchorElement();

        if (!anchor) {
            return false;
        }

        const parent = anchor.parentElement;

        return anchor.scrollWidth > anchor.clientWidth ||
            !!parent && parent.scrollWidth > parent.clientWidth;
    };

    const updatePosition = () => {
        const rect = getAnchorRect();

        if (!rect) {
            return;
        }

        setPosition(getPosition(gap, rect, effectiveDirection));
    };

    const showTip = () => {
        if (disabled || tooltipContent == null) {
            return;
        }

        if (overflowTooltip && !isTextOverflowing()) {
            return;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            updatePosition();
            setActive(true);
        }, delay);
    };

    const hideTip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        setActive(false);
    };

    useEffect(() => {
        if (!isAnchored) {
            return;
        }

        if (enabled && !disabled && tooltipContent != null) {
            updatePosition();
            setActive(true);
            return;
        }

        hideTip();
    }, [isAnchored, enabled, disabled, effectiveDirection, tooltipContent]);

    useEffect(() => {
        if (!active) {
            return;
        }

        const handleUpdate = () => {
            updatePosition();
        };

        window.addEventListener('scroll', handleUpdate, true);
        window.addEventListener('resize', handleUpdate);

        return () => {
            window.removeEventListener('scroll', handleUpdate, true);
            window.removeEventListener('resize', handleUpdate);
        };
    }, [active, effectiveDirection]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (tooltipContent == null) {
        return isAnchored ? null : <>{props.children}</>;
    }

    const cls = getTooltipClassName(
        isAnchored,
        background,
        overflowTooltip,
        arrow,
        effectiveDirection
    );

    const tooltip = active
        ? createPortal(
              <div
                  className={cls}
                  style={{
                      position: 'fixed',
                      top: position.top,
                      left: position.left,
                      transform: position.transform,
                      zIndex: 99999,
                      pointerEvents: 'none',
                  }}
              >
                  <div className="tooltip__container">
                      {renderHtml && typeof tooltipContent === 'string' ? (
                          <div
                              className="tooltip__content"
                              dangerouslySetInnerHTML={{ __html: tooltipContent }}
                          />
                      ) : (
                          <div className="tooltip__content">{tooltipContent}</div>
                      )}
                  </div>
              </div>,
              getPortalRoot()
          )
        : null;

    if (isAnchored) {
        return tooltip;
    }

    return (
        <>
            <span
                ref={internalAnchorRef}
                className="tooltip-anchor"
                onMouseEnter={showTip}
                onMouseLeave={hideTip}
                onFocus={showTip}
                onBlur={hideTip}
                onTouchStart={showTip}
                onTouchEnd={hideTip}
            >
                {props.children}
            </span>

            {tooltip}
        </>
    );
};

export default Tooltip;