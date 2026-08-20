import React, { FC, useEffect, useState } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';

export type LoaderVariant = 'centered' | 'screen-overlay' | 'table' | 'table-overlay' ;
export interface LoaderProps {
    duration?: number;
    loading?: boolean;
    background?: ColorDefinitions;
    enableAnimation?: boolean;
    animationColor?: ColorDefinitions;
    enableLabels?: boolean;
    labels?: string[];
    labelColor?: ColorDefinitions;
    variant?: LoaderVariant;


}

const Loader: FC<LoaderProps> = ({
    duration = 2000,
    loading = false,
    background,
    enableAnimation = true,
    animationColor,
    enableLabels = true,
    labels = ['Gegevens ophalen', 'Een moment geduld'],
    labelColor,
    variant = 'centered',

}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % labels.length);
        }, duration);
        return () => clearInterval(interval);
    }, []);

    if (!loading) return null;


    const renderAnimation = () => {
        if (!enableAnimation) return null;

        const colorClass = animationColor ? "bg-" + animationColor : "";
        return (
            <div className="loader__object">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={'loader__object__item_' + i} className={`loader__object__item ${colorClass}`} />
                ))}
            </div>
        );
    };

    const renderLabels = () => {
        if (!enableLabels) return null;

        const textColor = labelColor ? "text-" + labelColor : "";
        const dotColor = labelColor ? "bg-" + labelColor : "";

        return (
            <div className="loader__info">
                <div className={`loader__info__container ${textColor}`}>
                    {labels[currentIndex]}
                    <div className="loader__dots">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <span key={'loader__dot_' + i} className={`loader__dot ${dotColor}`} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

  
    const loaderCss = [
    "loader",
    background && `bg-${background}`,
    `loader--${variant}`,
]
    .filter(Boolean)
    .join(" ");

    return (
        <div className={loaderCss}>
            <div className="loader__container">
                {renderAnimation()}
                {renderLabels()}
            </div>
        </div>
    )

};

export default Loader;
