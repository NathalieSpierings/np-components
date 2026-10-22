import { fireEvent, render, screen } from '@testing-library/react';
import PanelLayout from '../PanelLayout';
import { usePanelLayout } from '../PanelLayoutContext';

/** Buttons in the main pane that call the `usePanelLayout()` API. */
const Controls = ({ ids }: { ids: string[] }) => {
    const { open, close, isOpen } = usePanelLayout();

    return (
        <>
            {ids.map((id) => (
                <button key={id} type="button" onClick={() => open(id)}>
                    open {id}
                </button>
            ))}
            <button type="button" onClick={() => close()}>
                close all
            </button>
            <span data-testid="open">{ids.filter(isOpen).join(',')}</span>
        </>
    );
};

describe('PanelLayout', () => {
    it('renders the main pane, and hides a closable aside while collapsed', () => {
        render(
            <PanelLayout>
                <PanelLayout.Main>Main content</PanelLayout.Main>
                <PanelLayout.Aside id="details" label="Details">
                    Details content
                </PanelLayout.Aside>
            </PanelLayout>,
        );

        expect(screen.getByText('Main content')).toBeVisible();
        expect(screen.getByText('Details content')).not.toBeVisible();
    });

    it('expands a collapsible aside when it is clicked', () => {
        const onExpandedAsidesChange = jest.fn();

        render(
            <PanelLayout onExpandedAsidesChange={onExpandedAsidesChange}>
                <PanelLayout.Main>Main content</PanelLayout.Main>
                <PanelLayout.Aside id="details" label="Details" header="Details header" mode="collapsible">
                    Details content
                </PanelLayout.Aside>
            </PanelLayout>,
        );

        // A collapsed aside that expands on click acts as a button
        fireEvent.click(screen.getByRole('button', { name: 'Details' }));

        expect(onExpandedAsidesChange).toHaveBeenLastCalledWith(['details']);
        expect(screen.getByRole('button', { name: 'Details inklappen' })).toBeInTheDocument();
    });

    it('expands at most one aside of a group', () => {
        const onExpandedAsidesChange = jest.fn();

        render(
            <PanelLayout onExpandedAsidesChange={onExpandedAsidesChange}>
                <PanelLayout.Main>
                    <Controls ids={['details', 'history']} />
                </PanelLayout.Main>
                <PanelLayout.Group>
                    <PanelLayout.Aside id="details">Details</PanelLayout.Aside>
                    <PanelLayout.Aside id="history">History</PanelLayout.Aside>
                </PanelLayout.Group>
            </PanelLayout>,
        );

        fireEvent.click(screen.getByText('open details'));
        fireEvent.click(screen.getByText('open history'));

        expect(onExpandedAsidesChange).toHaveBeenLastCalledWith(['history']);
        expect(screen.getByTestId('open')).toHaveTextContent(/^history$/);
    });

    it('never collapses a persistent aside', () => {
        render(
            <PanelLayout collapseOnMainClick>
                <PanelLayout.Main>
                    <Controls ids={['info']} />
                </PanelLayout.Main>
                <PanelLayout.Aside id="info" mode="persistent">
                    Info content
                </PanelLayout.Aside>
            </PanelLayout>,
        );

        fireEvent.click(screen.getByText('close all'));
        fireEvent.keyDown(screen.getByText('Info content'), { key: 'Escape' });

        expect(screen.getByText('Info content')).toBeVisible();
        expect(screen.getByTestId('open')).toHaveTextContent('info');
    });

    it('collapses all asides on Escape with collapseOnMainClick', () => {
        const onExpandedAsidesChange = jest.fn();

        render(
            <PanelLayout collapseOnMainClick defaultExpandedAsides={['details']} onExpandedAsidesChange={onExpandedAsidesChange}>
                <PanelLayout.Main>Main content</PanelLayout.Main>
                <PanelLayout.Aside id="details">Details content</PanelLayout.Aside>
            </PanelLayout>,
        );

        fireEvent.keyDown(screen.getByText('Main content'), { key: 'Escape' });

        expect(onExpandedAsidesChange).toHaveBeenLastCalledWith([]);
        expect(screen.getByText('Details content')).not.toBeVisible();
    });

    it('leaves out the mobile open button of an aside with mobileButton={false}', () => {
        render(
            <PanelLayout>
                <PanelLayout.Main header="Main header">Main content</PanelLayout.Main>
                <PanelLayout.Aside id="details" label="Details">
                    Details content
                </PanelLayout.Aside>
                <PanelLayout.Aside id="notes" label="Notities" mobileButton={false}>
                    Notes content
                </PanelLayout.Aside>
            </PanelLayout>,
        );

        expect(screen.getByRole('button', { name: 'Details openen' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Notities openen' })).not.toBeInTheDocument();
    });

    it('only collapses closable asides to nothing, so a strip in a persistent aside keeps its width', () => {
        const { container } = render(
            <PanelLayout>
                <PanelLayout.Main>Main content</PanelLayout.Main>
                <PanelLayout.Aside id="closable">Closable</PanelLayout.Aside>
                <PanelLayout.Aside id="persistent" mode="persistent">
                    <PanelLayout.Strip>Icon</PanelLayout.Strip>
                </PanelLayout.Aside>
            </PanelLayout>,
        );

        const collapsedWidth = (id: string) =>
            (container.querySelector(`[data-pane="${id}"]`) as HTMLElement).style.getPropertyValue('--panel-layout-collapsed-width');

        expect(collapsedWidth('closable')).toBe('0px');
        expect(collapsedWidth('persistent')).toBe('');
    });

    it('reports a percentage width, which is not supported', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

        render(
            <PanelLayout>
                <PanelLayout.Main>Main content</PanelLayout.Main>
                <PanelLayout.Aside id="details" width="max(400px, 30%)">
                    Details content
                </PanelLayout.Aside>
            </PanelLayout>,
        );

        expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('contains a percentage'));
        consoleError.mockRestore();
    });

    it('expands an aside whose mobile screen is shown from outside', () => {
        const onExpandedAsidesChange = jest.fn();

        render(
            <PanelLayout mobileScreen="details" onExpandedAsidesChange={onExpandedAsidesChange}>
                <PanelLayout.Main>Main content</PanelLayout.Main>
                <PanelLayout.Aside id="details">Details content</PanelLayout.Aside>
            </PanelLayout>,
        );

        expect(onExpandedAsidesChange).toHaveBeenLastCalledWith(['details']);
        expect(screen.getByText('Details content')).toBeVisible();
    });
});
