import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../lib/utils/definitions';
import Icon from '../../UI/Icons/Icon/Icon';

export interface SliderProps extends PropsWithChildren { }

const SCROLL_AMOUNT = 160;

const Slider: React.FC<SliderProps> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        containerRef.current?.scrollBy({
            left: -SCROLL_AMOUNT,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        containerRef.current?.scrollBy({
            left: SCROLL_AMOUNT,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                scrollLeft();
            } else if (e.key === 'ArrowRight') {
                scrollRight();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="slider">
            <button onClick={scrollLeft}>
                <Icon
                    icon={IconDefinitions.angle_left}
                    background={ColorDefinitions.SurfaceLight}
                    ringSize="ring-1"
                    ring
                    rounded={SizeDefinitions.Full}
                    ringHoverColor={ColorDefinitions.Primary}
                    ringOffsetColor={ColorDefinitions.Theme100}
                    color={ColorDefinitions.Primary}
                />

            </button>

            <div className="slider__container" ref={containerRef}>
                {children}
            </div>
            <button onClick={scrollRight}>
                <Icon
                    icon={IconDefinitions.angle_right}
                    rounded={SizeDefinitions.Full}
                    background={ColorDefinitions.SurfaceLight}
                    ringSize="ring-1"
                    ring
                    ringHoverColor={ColorDefinitions.Primary}
                    ringOffsetColor={ColorDefinitions.Theme100}
                    color={ColorDefinitions.Primary}
                />
            </button>

        </div>
    );
};

export default Slider;
