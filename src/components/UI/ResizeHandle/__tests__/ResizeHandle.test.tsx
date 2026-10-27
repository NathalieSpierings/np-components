import { fireEvent, render } from '@testing-library/react';
import ResizeHandle from '../ResizeHandle';

describe('ResizeHandle', () => {
    it('sits on the given edge', () => {
        const { container } = render(<ResizeHandle edge="left" onResizeStart={jest.fn()} />);

        expect(container.firstChild).toHaveClass('resize-handle', 'resize-handle--left');
        expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    });

    it('shows when it is resizing', () => {
        const { container } = render(<ResizeHandle edge="right" resizing onResizeStart={jest.fn()} />);

        expect(container.firstChild).toHaveClass('is-resizing');
    });

    it('starts resizing on pointer down, without the default action', () => {
        const onResizeStart = jest.fn();
        const { container } = render(<ResizeHandle edge="left" onResizeStart={onResizeStart} />);

        // fireEvent returns false when the default action was prevented
        const notPrevented = fireEvent.pointerDown(container.firstChild as Element);

        expect(onResizeStart).toHaveBeenCalledTimes(1);
        expect(notPrevented).toBe(false);
    });
});
