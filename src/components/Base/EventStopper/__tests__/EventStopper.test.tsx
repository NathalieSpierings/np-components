import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventStopper from '../EventStopper';

describe('EventStopper', () => {
    it('renders children', () => {
        render(
            <EventStopper>
                Test content
            </EventStopper>
        );

        expect(screen.getByText('Test content')).toBeInTheDocument();
    });   

    it('stops click event propagation', () => {
        const parentClick = jest.fn();

        render(
            <div onClick={parentClick}>
                <EventStopper>
                    Test content
                </EventStopper>
            </div>
        );

        fireEvent.click(screen.getByText('Test content'));

        expect(parentClick).not.toHaveBeenCalled();
    });

    it('allows children to receive the click event', () => {
        const childClick = jest.fn();

        render(
            <EventStopper>
                <button onClick={childClick}>Click me</button>
            </EventStopper>
        );

        fireEvent.click(screen.getByRole('button', { name: 'Click me' }));

        expect(childClick).toHaveBeenCalledTimes(1);
    });
});