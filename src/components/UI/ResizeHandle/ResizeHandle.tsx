import { FC, HTMLAttributes, PointerEvent } from 'react';
import { joinClasses } from '../../../lib/helpers/helpers';

export interface ResizeHandleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onPointerDown'> {
    /** The edge of the resizable element the handle sits on (for a sidebar on the right: `"left"`). */
    edge: 'left' | 'right';
    /** Whether a resize is in progress, e.g. `resizing` from `useResizableAside` / `useResizeDrag`. */
    resizing?: boolean;
    /** Called when the user starts dragging, e.g. with `startResize` from `useResizableAside` / `useResizeDrag`. */
    onResizeStart: (event: PointerEvent<HTMLDivElement>) => void;
}

/**
 * A drag handle on the edge of a resizable element (which needs `position: relative`). Pointer only.
 * Shows a border on hover and while resizing, in `--resize-handle-color` (defaults to `--color-border`).
 */
const ResizeHandle: FC<ResizeHandleProps> = ({ edge, resizing, onResizeStart, className, ...props }) => (
    <div
        aria-hidden="true"
        className={joinClasses('resize-handle', `resize-handle--${edge}`, resizing && 'is-resizing', className)}
        onPointerDown={(event) => {
            event.preventDefault();
            // Keep receiving pointer events while dragging outside the handle
            event.currentTarget.setPointerCapture?.(event.pointerId);
            onResizeStart(event);
        }}
        {...props}
    />
);

export default ResizeHandle;
