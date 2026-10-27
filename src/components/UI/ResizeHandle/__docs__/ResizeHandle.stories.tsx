import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { CSSProperties, ReactNode } from 'react';
import { ResizeSide, useResizableAside } from '../../../../lib/hooks/useResizableAside';
import ResizeHandle from '../ResizeHandle';

const meta: Meta<typeof ResizeHandle> = {
    title: 'UI kit/ResizeHandle',
    component: ResizeHandle,
    parameters: {
        layout: 'padded',
    },
};

export default meta;

/** A panel next to some content, resizable with a `ResizeHandle` on the edge facing the content. */
const ResizablePanel = ({ side, style, children }: { side: ResizeSide; style?: CSSProperties; children: ReactNode }) => {
    // Default 300px, between 200px and 500px
    const { width, resizing, startResize } = useResizableAside(300, 200, 500, side);

    const panel = (
        <div style={{ position: 'relative', flex: `0 0 ${width}px`, padding: '1.5rem', border: '1px solid var(--color-border)', ...style }}>
            {/* A panel on the right is resized at its left edge, and the other way around */}
            <ResizeHandle edge={side === 'right' ? 'left' : 'right'} resizing={resizing} onResizeStart={startResize} />
            <p>{children}</p>
            <p>Breedte: {width}px</p>
        </div>
    );

    const content = <div style={{ flex: '1 1 0', padding: '1.5rem' }}>Inhoud</div>;

    return (
        <div style={{ display: 'flex', height: '20rem' }}>
            {side === 'left' ? panel : content}
            {side === 'left' ? content : panel}
        </div>
    );
};

/** A panel on the right, resized at its left edge (like the datagrid's sidebar). */
export const PanelRight: StoryFn = () => <ResizablePanel side="right">Sleep de linkerrand.</ResizablePanel>;

/** A panel on the left, resized at its right edge. */
export const PanelLeft: StoryFn = () => <ResizablePanel side="left">Sleep de rechterrand.</ResizablePanel>;

/** The border shown on hover and while resizing uses `--resize-handle-color`, e.g. to match the surrounding borders. */
export const CustomColor: StoryFn = () => (
    <ResizablePanel side="right" style={{ '--resize-handle-color': 'var(--color-primary)' } as CSSProperties}>
        Sleep de linkerrand: de rand is in de primaire kleur.
    </ResizablePanel>
);
