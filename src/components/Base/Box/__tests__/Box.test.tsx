import { render, screen } from '@testing-library/react';
import React from 'react';
import { ColorDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Box from '../Box';

describe('Box', () => {
    it('renders children', () => {
        render(
            <Box>
                Test content
            </Box>
        );

        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders as a div by default', () => {
        render(
            <Box data-testid="box">
                Content
            </Box>
        );

        expect(screen.getByTestId('box').tagName).toBe('DIV');
    });

    it('renders with the specified element type', () => {
        render(
            <Box renderAs="span" data-testid="box">
                Content
            </Box>
        );

        expect(screen.getByTestId('box').tagName).toBe('SPAN');
    });

    it('renders as a fieldset', () => {
        render(
            <Box renderAs="fieldset" data-testid="box">
                Content
            </Box>
        );

        expect(screen.getByTestId('box').tagName).toBe('FIELDSET');
    });

    it('applies the provided className', () => {
        render(
            <Box className="custom-class" data-testid="box">
                Content
            </Box>
        );

        expect(screen.getByTestId('box')).toHaveClass('custom-class');
    });

    it('creates classes from color properties', () => {
        render(
            <Box
                color={ColorDefinitions.Primary}
                colorMute={ColorDefinitions.Mute}
                background={ColorDefinitions.Primary}
                borderColor={ColorDefinitions.Primary}
                data-testid="box"
            >
                Content
            </Box>
        );

        expect(screen.getByTestId('box')).toHaveClass(
            'text-primary',
            'text-mute',
            'bg-primary',
            'border-primary'
        );
    });

    it('creates classes from shadow properties', () => {
        render(
            <Box
                shadowColor={ColorDefinitions.Primary}
                data-testid="box"
            >
                Content
            </Box>
        );

        expect(screen.getByTestId('box')).toHaveClass(
            'shadow-primary'
        );
    });

    it('creates hover classes', () => {
        render(
            <Box
                hoverColor={ColorDefinitions.Primary}
                hoverBackground={ColorDefinitions.Primary}
                hoverBorderColor={ColorDefinitions.Primary}
                hoverShadowColor={ColorDefinitions.Primary}
                data-testid="box"
            >
                Content
            </Box>
        );

        expect(screen.getByTestId('box')).toHaveClass(
            'hover:text-primary',
            'hover:bg-primary',
            'hover:border-primary',
            'hover:shadow-primary',
        );
    });

    it('creates rounded and dashed classes', () => {
        render(
            <Box
                rounded={SizeDefinitions.Medium}
                dashed
                data-testid="box"
            >
                Content
            </Box>
        );

        expect(screen.getByTestId('box')).toHaveClass(
            'rounded-md',
            'dashed'
        );
    });

    it('creates ring classes', () => {
        render(
            <Box
                ring
                ringSize="ring-2"
                ringColor={ColorDefinitions.Primary}
                ringOffsetColor={ColorDefinitions.Primary}
                ringHoverColor={ColorDefinitions.Primary}
                ringOffset="ring-offset-4"
                data-testid="box"
            >
                Content
            </Box>
        );

        expect(screen.getByTestId('box')).toHaveClass(
            'ring',
            'ring-2',
            'ring-primary',
            'ring-offset-primary',
            'ring-hover-primary',
            'ring-offset-4'
        );
    });

    it('applies css classes', () => {
        render(
            <Box css="custom-css-class" data-testid="box">
                Content
            </Box>
        );

        expect(screen.getByTestId('box')).toHaveClass('custom-css-class');
    });

    it('combines className and generated classes', () => {
        render(
            <Box
                className="custom-class"
                color={ColorDefinitions.Primary}
                background={ColorDefinitions.Primary}
                rounded={SizeDefinitions.Medium}
                dashed
                data-testid="box"
            >
                Content
            </Box>
        );

        expect(screen.getByTestId('box')).toHaveClass(
            'custom-class',
            'text-primary',
            'bg-primary',
            'rounded-md',
            'dashed'
        );
    });

    it('passes style to the element', () => {
        render(
            <Box
                style={{ marginTop: '10px' }}
                data-testid="box"
            >
                Content
            </Box>
        );

        expect(screen.getByTestId('box')).toHaveStyle({
            marginTop: '10px',
        });
    });

    it('passes HTML attributes to the element', () => {
        render(
            <Box
                id="my-box"
                title="Test box"
                data-testid="box"
            >
                Content
            </Box>
        );

        const box = screen.getByTestId('box');

        expect(box).toHaveAttribute('id', 'my-box');
        expect(box).toHaveAttribute('title', 'Test box');
    });


    it('forwards ref to the rendered element', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <Box ref={ref} data-testid="box">
                Content
            </Box>
        );

        expect(ref.current).toBe(screen.getByTestId('box'));
    });
});