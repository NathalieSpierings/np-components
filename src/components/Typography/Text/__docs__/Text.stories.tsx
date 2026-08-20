import { Meta, StoryObj } from '@storybook/react-webpack5';
import Text from '../Text';


const meta: Meta<typeof Text> = {
    title: 'Typography/Text',
    component: Text,
   
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sapien vitae justo facilisis posuere. Sed sit amet turpis vitae metus fermentum imperdiet. Curabitur non risus in lacus aliquet ultricies. Integer ut leo eget libero faucibus tincidunt. Praesent eget ex ac augue tincidunt pretium. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
};


export const PositionLeft: Story = {
    args: {
        textAlign: 'left',
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sapien vitae justo facilisis posuere. Sed sit amet turpis vitae metus fermentum imperdiet. Curabitur non risus in lacus aliquet ultricies. Integer ut leo eget libero faucibus tincidunt. Praesent eget ex ac augue tincidunt pretium. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
};

export const PositionCenter: Story = {
    args: {
        textAlign: 'center',
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sapien vitae justo facilisis posuere. Sed sit amet turpis vitae metus fermentum imperdiet. Curabitur non risus in lacus aliquet ultricies. Integer ut leo eget libero faucibus tincidunt. Praesent eget ex ac augue tincidunt pretium. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
};

export const PositionRight: Story = {
    args: {
        textAlign: 'right',
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sapien vitae justo facilisis posuere. Sed sit amet turpis vitae metus fermentum imperdiet. Curabitur non risus in lacus aliquet ultricies. Integer ut leo eget libero faucibus tincidunt. Praesent eget ex ac augue tincidunt pretium. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
};

export const Muted: Story = {
    args: {
        muted: true,
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sapien vitae justo facilisis posuere. Sed sit amet turpis vitae metus fermentum imperdiet. Curabitur non risus in lacus aliquet ultricies. Integer ut leo eget libero faucibus tincidunt. Praesent eget ex ac augue tincidunt pretium. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
};

export const OneLine: Story = {
    args: {
        lines: 1,
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sapien vitae justo facilisis posuere. Sed sit amet turpis vitae metus fermentum imperdiet. Curabitur non risus in lacus aliquet ultricies. Integer ut leo eget libero faucibus tincidunt. Praesent eget ex ac augue tincidunt pretium. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
};


export const TwoLines: Story = {
    args: {
        lines: 2,
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sapien vitae justo facilisis posuere. Sed sit amet turpis vitae metus fermentum imperdiet. Curabitur non risus in lacus aliquet ultricies. Integer ut leo eget libero faucibus tincidunt. Praesent eget ex ac augue tincidunt pretium. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
};


export const ThreeLines: Story = {
    args: {
        lines: 3,
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sapien vitae justo facilisis posuere. Sed sit amet turpis vitae metus fermentum imperdiet. Curabitur non risus in lacus aliquet ultricies. Integer ut leo eget libero faucibus tincidunt. Praesent eget ex ac augue tincidunt pretium. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
};


export const OneLineWithTooltip: Story = {
    args: {
        lines: 1,
        showTooltip: true,
        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sapien vitae justo facilisis posuere. Sed sit amet turpis vitae metus fermentum imperdiet. Curabitur non risus in lacus aliquet ultricies. Integer ut leo eget libero faucibus tincidunt. Praesent eget ex ac augue tincidunt pretium. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
};