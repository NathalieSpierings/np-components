import React, { FC, useEffect, useState } from 'react';
import { ColorDefinitions } from '../../../lib/utils/definitions';

export interface LoaderProps {
    duration?: number;
    loading?: boolean;
    background?: ColorDefinitions;
    labels?: string[];
    showLabels?: boolean;
    labelColor?: ColorDefinitions;
    showOverlay?: boolean;
    tableOverlay?: boolean;
    centered?: boolean;
    showAnimation?: boolean;
    animationColor?: ColorDefinitions;
}

const Loader: FC<LoaderProps> = ({
    duration = 2000,
    loading = false,
    background,
    labels = ['Gegevens ophalen', 'Een moment geduld'],
    labelColor,
    showLabels = true,
    showOverlay = false,
    tableOverlay,
    centered,
    showAnimation = true,
    animationColor,
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
        if (!showAnimation) return null;

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
        if (!showLabels) return null;

        const textColor = labelColor ? "text-" + labelColor : "";
        const dotColor = labelColor ? "bg-" + labelColor : "";
        const marginFix = showAnimation ? "" : "mt-none";

        return (
            <div className={`loader__content ${marginFix}`}>
                <div className={`loader__content__container ${textColor}`}>
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


    const css = [
        "loader",
        background && `bg-${background}`,
        showLabels && "has-labels",
    ]
        .filter(Boolean)
        .join(" ");


    return (
        tableOverlay ? (
            <div className={`${css} ${tableOverlay ? 'loader--table-overlay' : ''}  `}>
                <div className="loader--centered">
                    <div className="loader__container">
                        {renderAnimation()}
                        {renderLabels()}
                    </div>
                </div>
            </div>
        ) : (
            <div className={`${css} ${centered ? "loader--centered" : ''} ${showOverlay ? 'loader--overlay' : ''}  `}>
                <div className="loader__container">
                    {renderAnimation()}
                    {renderLabels()}
                </div>
            </div>
        )
    )
};

export default Loader;
