import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';

describe('Search', () => {
    it('renders the search input', () => {
        render(
            <Search
                value=""
                onChange={jest.fn()}
            />
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders the provided value', () => {
        render(
            <Search
                value="test value"
                onChange={jest.fn()}
            />
        );

        expect(screen.getByRole('textbox')).toHaveValue('test value');
    });

    it('uses the provided placeholder', () => {
        render(
            <Search
                value=""
                onChange={jest.fn()}
                placeholder="Zoek naar een klant"
            />
        );

        expect(
            screen.getByPlaceholderText('Zoek naar een klant')
        ).toBeInTheDocument();
    });

    it('uses the default placeholder when none is provided', () => {
        render(
            <Search
                value=""
                onChange={jest.fn()}
            />
        );

        expect(
            screen.getByPlaceholderText('Zoeken...')
        ).toBeInTheDocument();
    });

    it('calls onChange with the new value', () => {
        const onChange = jest.fn();

        render(
            <Search
                value=""
                onChange={onChange}
            />
        );

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'test' },
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith('test');
    });

    it('renders the provided input type', () => {
        render(
            <Search
                value=""
                onChange={jest.fn()}
                type="number"
            />
        );

        expect(screen.getByRole('spinbutton')).toHaveAttribute(
            'type',
            'number'
        );
    });

    it('renders a date input', () => {
        render(
            <Search
                value=""
                onChange={jest.fn()}
                type="date"
            />
        );

        expect(screen.getByDisplayValue('')).toHaveAttribute(
            'type',
            'date'
        );
    });

    it('renders a search input', () => {
        render(
            <Search
                value=""
                onChange={jest.fn()}
                type="search"
            />
        );

        expect(screen.getByRole('searchbox')).toHaveAttribute(
            'type',
            'search'
        );
    });


    it('applies the provided css class', () => {
        const { container } = render(
            <Search
                value=""
                onChange={jest.fn()}
                css="custom-search"
            />
        );

        expect(container.firstChild).toHaveClass(
            'search',
            'custom-search'
        );
    });

    it('stops click event propagation', () => {
        const parentClick = jest.fn();

        render(
            <div onClick={parentClick}>
                <Search
                    value=""
                    onChange={jest.fn()}
                />
            </div>
        );

        fireEvent.click(screen.getByRole('textbox'));

        expect(parentClick).not.toHaveBeenCalled();
    });
});