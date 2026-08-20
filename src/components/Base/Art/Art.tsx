import React from 'react';
import { ArtMap } from './ArtMap';
import { ArtDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';

type ArtProps = {
    art: ArtDefinitions;
    artCss?: string;
    svgCss?: string;
    size?: SizeDefinitions;
};

const Art: React.FC<ArtProps> = ({ art, size, artCss = '', svgCss = '', ...rest }) => {
    const ArtComponent = ArtMap[art];

    if (!ArtComponent) {
        console.warn(`Icon "${art}" not found in ArtMap`);
        return null;
    }

    return (
        <div className={`art ${size ? "art-" + size : null} ${artCss}`}>
            <ArtComponent className={svgCss} {...rest} />
        </div>
    );
};

export default Art;
