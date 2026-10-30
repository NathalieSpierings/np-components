import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import styled from 'styled-components';
import { ArtDefinitions, ColorDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Art from '../Art';
import { useState } from 'react';
import Button from '../../../UI/Button/Button';

const meta: Meta<typeof Art> = {
    title: 'UI kit/Art',
    component: Art,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof Art>;


const STATUS_ARTS: ArtDefinitions[] = [
    ArtDefinitions.EmptyData,
    ArtDefinitions.Forbidden,
    ArtDefinitions.NotFound,
    ArtDefinitions.ServerError,
];

const ALL_ARTS = Object.values(ArtDefinitions);
const PRODUCT_ARTS = ALL_ARTS.filter((art) => !STATUS_ARTS.includes(art));

const SIZES: { size: SizeDefinitions; tile: string }[] = [
    { size: SizeDefinitions.ExtraSmall, tile: '12rem' },
    { size: SizeDefinitions.Small, tile: '16rem' },
    { size: SizeDefinitions.Medium, tile: '24rem' },
    { size: SizeDefinitions.Large, tile: '30rem' },
    { size: SizeDefinitions.ExtraLarge, tile: '36rem' },
    { size: SizeDefinitions.ExtraLarge2, tile: '46rem' },
    { size: SizeDefinitions.ExtraLarge3, tile: '68rem' },
];

const ArtGrid = ({ arts, size, tile }: { arts: ArtDefinitions[]; size: SizeDefinitions; tile: string }) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${tile}), 1fr))`,
            gap: 'var(--page-padding-sm)',
        }}
    >
        {arts.map((art) => (
            <div
                key={art}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--page-padding-2xs)',
                    padding: 'var(--page-padding-sm)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                }}
            >
                <Art art={art} size={size} />
                <strong>{art}</strong>
                <code>ArtDefinitions.{art}</code>
            </div>
        ))}
    </div>
);


export const Default: StoryFn = (args) => {
    const [size, setSize] = useState<SizeDefinitions>(SizeDefinitions.Medium);
    const tile = SIZES.find((s) => s.size === size)?.tile ?? '24rem';


    return (
        <>
            <h3>Art</h3>
            <p>Alle illustraties uit <code>ArtDefinitions</code> ({ALL_ARTS.length}).</p>

            <div className="gap-2 mb-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {SIZES.map(({ size: s }) => (
                    <Button key={s} variant={s === size ? undefined : 'outline'} onClick={() => setSize(s)}>
                        {s}
                    </Button>
                ))}
            </div>

            <h4 className="mt-4">Product</h4>
            <ArtGrid arts={PRODUCT_ARTS} size={size} tile={tile} />

            <h4 className="mt-4">Status</h4>
            <ArtGrid arts={STATUS_ARTS} size={size} tile={tile} />
        </>
    );
};

