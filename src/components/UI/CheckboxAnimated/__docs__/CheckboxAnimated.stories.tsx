import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import Card from '../../Card/Card';
import { Collection } from '../../Collection';
import AnimatedCheckbox from '../CheckboxAnimated';

const meta: Meta<typeof AnimatedCheckbox> = {
    title: 'UI kit/AnimatedCheckbox',
    component: AnimatedCheckbox,
    parameters: {
        layout: 'padded',
    }
};

export default meta;
type Story = StoryObj<typeof AnimatedCheckbox>;

export const Default: StoryFn = () => {
    const [checked, setChecked] = React.useState(true);

    return (
        <div className="row">
            <div className="col-4">
                <Card>
                    <AnimatedCheckbox defaultChecked={checked} onChange={setChecked} />
                </Card>
            </div>
            <div className="col-4">
                <AnimatedCheckbox defaultChecked={checked} onChange={setChecked} />
            </div>
            <div className="col-4">
                <AnimatedCheckbox disabled={true} defaultChecked={checked} onChange={setChecked} />
            </div>
        </div>
    );
};

export const CheckboxList: StoryFn = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Collection
            items={[
                {
                    id: '1',
                    content: {
                        prefix: <AnimatedCheckbox defaultChecked={checked} onChange={setChecked} />,
                        content: (
                            <>
                                <span>Call Mr. Markstrom</span>
                                <span>Review the project initial wireframes</span>
                            </>
                        ),
                    }
                },
                {
                    id: '2',
                    content: {
                        prefix: <AnimatedCheckbox defaultChecked={checked} onChange={setChecked} />,
                        content: (
                            <>
                                <span>Call Mr. Markstrom</span>
                                <span>Review the project initial wireframes</span>
                            </>
                        ),
                    }
                },
                {
                    id: '3',
                    content: {
                        prefix: <AnimatedCheckbox defaultChecked={checked} onChange={setChecked} />,
                        content: (
                            <>
                                <span>Call Mr. Markstrom</span>
                                <span>Review the project initial wireframes</span>
                            </>
                        ),
                    }
                },
            ]}
        />
    );
};

export const Color: StoryFn = () => {
    const [checked, setChecked] = React.useState(true);

    return <AnimatedCheckbox defaultChecked={checked} onChange={setChecked} accentColor={ColorDefinitions.Green} />;
};
