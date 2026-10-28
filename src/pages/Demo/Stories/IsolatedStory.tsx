import { ComponentType, ReactElement, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

/**
 * Rendert een story in een eigen React-root, in een vak dat ook `position: fixed` binnen zich houdt.
 * Voor schermvullende layouts met een eigen router: de eigen root neemt de router en contexts van de app niet over.
 */
const IsolatedStory = ({ Story, height = '60rem' }: { Story: ComponentType; height?: string }): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const root = createRoot(ref.current);
        root.render(<Story />);
        // Asynchroon unmounten: niet tijdens het renderen van de app
        return () => { setTimeout(() => root.unmount()); };
    }, [Story]);

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                height,
                overflow: 'hidden',
                transform: 'translateZ(0)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
            }}
        />
    );
};

export default IsolatedStory;
