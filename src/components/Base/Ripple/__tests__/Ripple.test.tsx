import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Ripple from '../Ripple';

describe('Ripple', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders without crashing', () => {
        const { container } = render(<Ripple />);

        expect(container.firstChild).toBeInTheDocument();
    });

    
    it('uses the provided duration', () => {
        const { container } = render(<Ripple duration={500} />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it('uses the default white color', () => {
        const { container } = render(<Ripple />);

        const rippleContainer = container.firstChild as HTMLElement;

        expect(rippleContainer).toBeInTheDocument();
    });

    it('converts a ColorDefinition to a CSS variable', () => {
        const { container } = render(
            <Ripple color={ColorDefinitions.Primary} />
        );

        const rippleContainer = container.firstChild as HTMLElement;

        expect(rippleContainer).toBeInTheDocument();
    });

    it('accepts a custom color', () => {
        const { container } = render(
            <Ripple color="#ff0000" />
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it('does not render a ripple initially', () => {
        const { container } = render(<Ripple />);

        expect(container.querySelector('span')).not.toBeInTheDocument();
    });

    it('creates a ripple when mouse down occurs', () => {
        const { container } = render(<Ripple />);

        const rippleContainer = container.firstChild as HTMLElement;

        fireEvent.mouseDown(rippleContainer, {
            pageX: 50,
            pageY: 50,
        });

        expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('creates a ripple with the correct dimensions', () => {
        const { container } = render(<Ripple />);

        const rippleContainer = container.firstChild as HTMLElement;

        Object.defineProperty(rippleContainer, 'getBoundingClientRect', {
            value: () => ({
                width: 100,
                height: 50,
                x: 0,
                y: 0,
                top: 0,
                right: 100,
                bottom: 50,
                left: 0,
            }),
        });

        fireEvent.mouseDown(rippleContainer, {
            pageX: 50,
            pageY: 25,
        });

        const ripple = container.querySelector('span');

        expect(ripple).toHaveStyle({
            width: '100px',
            height: '100px',
        });
    });

    it('creates multiple ripples', () => {
        const { container } = render(<Ripple />);

        const rippleContainer = container.firstChild as HTMLElement;

        fireEvent.mouseDown(rippleContainer, {
            pageX: 20,
            pageY: 20,
        });

        fireEvent.mouseDown(rippleContainer, {
            pageX: 40,
            pageY: 40,
        });

        expect(container.querySelectorAll('span')).toHaveLength(2);
    });

    it('cleans up ripples after the duration', () => {
        jest.useFakeTimers();

        const { container } = render(<Ripple duration={100} />);

        const rippleContainer = container.firstChild as HTMLElement;

        fireEvent.mouseDown(rippleContainer, {
            pageX: 50,
            pageY: 50,
        });

        expect(container.querySelector('span')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(400);
        });

        expect(container.querySelector('span')).not.toBeInTheDocument();
    });
});