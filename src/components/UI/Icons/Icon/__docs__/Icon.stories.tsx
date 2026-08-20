import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import styled from 'styled-components';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../../lib/utils/definitions';
import Icon from '../Icon';
import React from 'react';

const meta: Meta<typeof Icon> = {
    title: 'Foundation/Icons',
    component: Icon
};

export default meta;
type Story = StoryObj<typeof Icon>;

const Demo = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5rem;
    margin-bottom: 5rem;

    .demo__col {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        grid-template-rows: repeat(auto-fit, minmax(50px, 1fr));
        gap: 1rem;
    }

    .demo__item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--color-border);

        svg {
            width: 2em;
            height: 2em;
        }

        &:hover {
            h5 {
                position: absolute;
                display: block;
                padding: 0.5rem;
                bottom: 0;
                z-index: 5;
                border-radius: 5px;
                color: var(--color-offwhite);
                background: var(--color-dark);
            }
        }

        h5 {
            margin: 0;
            font-size: var(--fontsize-xs);
            display: none;
        }
    }
`;

const Flex = styled.div`
    display: flex;
    gap: 2rem;
    margin-bottom: 3rem;
`;

export const Default: StoryFn = (args) => {
    return <Icon icon={IconDefinitions.cog} duotone={true} />;
};

export const WithUtilityClasses: StoryFn = (args) => {
    return (
        <>
            <p className="mb-3">
                When choosing an icon variant and set an background, the border will automatically get the same color as
                the background. See Icon component.
            </p>

            <Flex>
                <Icon icon={IconDefinitions.cog} color={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.cog} background={ColorDefinitions.Blue} variant="square" />
                <Icon icon={IconDefinitions.cog} borderColor={ColorDefinitions.Blue} />
                <Icon
                    icon={IconDefinitions.cog}
                    shadowColor={ColorDefinitions.Blue}
                    borderColor={ColorDefinitions.Blue}
                    variant="circle"
                />
                <Icon
                    icon={IconDefinitions.cog}
                    duotone={true}
                    borderColor={ColorDefinitions.Blue}
                    shadowBeforeColor={ColorDefinitions.Blue}
                />
            </Flex>
        </>
    );
};

export const HoverStateWithUtiltiyClasses: StoryFn = (args) => {
    return (
        <Flex>
            <Icon icon={IconDefinitions.cog} hoverColor={ColorDefinitions.Blue} />
            <Icon icon={IconDefinitions.cog} hoverBackground={ColorDefinitions.Blue} variant="square" />
            <Icon icon={IconDefinitions.cog} hoverBorderColor={ColorDefinitions.Blue} />
            <Icon
                icon={IconDefinitions.cog}
                hoverShadowColor={ColorDefinitions.Blue}
                hoverBorderColor={ColorDefinitions.Blue}
                variant="circle"
            />
        </Flex>
    );
};

export const DashedWithUtilityClasses: StoryFn = (args) => {
    return (
        <Flex>
            <Icon icon={IconDefinitions.cog} dashed={true} hoverColor={ColorDefinitions.Blue} />
            <Icon
                icon={IconDefinitions.cog}
                dashed={true}
                hoverBackground={ColorDefinitions.Blue}
                variant="square"
            />
            <Icon icon={IconDefinitions.cog} dashed={true} hoverBorderColor={ColorDefinitions.Blue} />
            <Icon
                icon={IconDefinitions.cog}
                dashed={true}
                hoverShadowColor={ColorDefinitions.Blue}
                hoverBorderColor={ColorDefinitions.Blue}
                variant="circle"
            />
        </Flex>
    );
};

export const Ring: StoryFn = (args) => {
    return (
        <>
            <p className="mb-3">
                Puts a border around the icon. On hover and offset will be shown. You can choose between offset sizes{' '}
                <code>0, 1, 2, and 3 px</code> When choosing offset size: 0. Only the offset color will be shown. The
                ring border color can be set with the property <code>ringColor</code>. The ring offset border color can
                be set with the property <code>ringHoverColor</code>. The ring offset color default to{' '}
                <code>surface-0</code> can be set with the property <code>ringOffsetColor</code>. You can play around
                with the ring colors. Have fun :-).
            </p>

            <h3>Default ring</h3>
            <Flex>
                <Icon icon={IconDefinitions.cog} ring={true} ringSize="ring-1" />
                <Icon icon={IconDefinitions.cog} ring={true} ringSize="ring-2" />
                <Icon icon={IconDefinitions.cog} ring={true} ringSize="ring-3" />
            </Flex>

            <h3>Colored ring</h3>
            <Flex>
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-1"
                    ringHoverColor={ColorDefinitions.Blue}
                />
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-1"
                    ringHoverColor={ColorDefinitions.Blue}
                    color={ColorDefinitions.Blue}
                />
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-1"
                    ringColor={ColorDefinitions.Blue}
                />
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-1"
                    ringOffsetColor={ColorDefinitions.Blue20}
                    ringHoverColor={ColorDefinitions.Royalblue}
                />
            </Flex>

            <Flex>
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-2"
                    ringHoverColor={ColorDefinitions.Blue}
                />
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-2"
                    ringHoverColor={ColorDefinitions.Blue}
                    color={ColorDefinitions.Blue}
                />
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-2"
                    ringColor={ColorDefinitions.Blue}
                />
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-2"
                    ringOffsetColor={ColorDefinitions.Blue20}
                    ringHoverColor={ColorDefinitions.Royalblue}
                />
            </Flex>

            <Flex>
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-3"
                    ringHoverColor={ColorDefinitions.Blue}
                />
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-3"
                    ringHoverColor={ColorDefinitions.Blue}
                    color={ColorDefinitions.Blue}
                />
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize    ="ring-3"
                    ringColor={ColorDefinitions.Blue}
                />
                <Icon
                    icon={IconDefinitions.cog}
                    rounded={SizeDefinitions.Full}
                    ring={true}
                    ringSize="ring-3"
                    ringOffsetColor={ColorDefinitions.Blue20}
                    ringHoverColor={ColorDefinitions.Royalblue}
                />
            </Flex>
        </>
    );
};

export const Opacity: StoryFn = (args) => {
    return (
        <>
            <p className="mb-3">
                Shows the icon and border dimmed. On hover the opacity = 1; Use <code>icon--dimmed</code> class. To only
                dimm the icon you can use <code>icon--dimmed-icon</code> class.
            </p>
            <Flex>
                <Icon icon={IconDefinitions.cog} color={ColorDefinitions.Blue} dimmed={true} />
                <Icon
                    icon={IconDefinitions.cog}
                    background={ColorDefinitions.Blue}
                    variant="square"
                    dimmed={true}
                />
                <Icon icon={IconDefinitions.cog} borderColor={ColorDefinitions.Blue} dimmed={true} />
                <Icon
                    icon={IconDefinitions.cog}
                    shadowColor={ColorDefinitions.Blue}
                    variant="square"
                    dimmed={true}
                />
            </Flex>
        </>
    );
};

export const SvgDimmed: StoryFn = (args) => {
    return (
        <Flex>
            <Icon icon={IconDefinitions.cog} color={ColorDefinitions.Blue} dimmedSvg={true} />
            <Icon icon={IconDefinitions.cog} background={ColorDefinitions.Blue} variant="square" dimmedSvg={true} />
            <Icon icon={IconDefinitions.cog} borderColor={ColorDefinitions.Blue} dimmedSvg={true} />
            <Icon
                icon={IconDefinitions.cog}
                shadowColor={ColorDefinitions.Blue}
                variant="square"
                dimmedSvg={true}
            />
        </Flex>
    );
};

export const Hover: StoryFn = (args) => {
    return (
        <Flex>
            <Icon icon={IconDefinitions.cog} variant="circle" hover={true} />
            <Icon icon={IconDefinitions.cog} variant="square" hover={true} />
            <Icon icon={IconDefinitions.cog} hover={true} />
        </Flex>
    );
};

export const Sizes: StoryFn = (args) => {
    return (
        <>
            <Flex>
                <Icon icon={IconDefinitions.cog} size={SizeDefinitions.Tiny} />
                <Icon icon={IconDefinitions.cog} size={SizeDefinitions.ExtraSmall} />
                <Icon icon={IconDefinitions.cog} size={SizeDefinitions.Small} />
                <Icon icon={IconDefinitions.cog} size={SizeDefinitions.Medium} />
                <Icon icon={IconDefinitions.cog} size={SizeDefinitions.Large} />
                <Icon icon={IconDefinitions.cog} size={SizeDefinitions.ExtraLarge} />
                <Icon icon={IconDefinitions.cog} size={SizeDefinitions.ExtraLarge2} />
                <Icon icon={IconDefinitions.cog} size={SizeDefinitions.ExtraLarge3} />
            </Flex>

            <Flex>
                <Icon icon={IconDefinitions.cog} variant="square" size={SizeDefinitions.Tiny} />
                <Icon icon={IconDefinitions.cog} variant="square" size={SizeDefinitions.ExtraSmall} />
                <Icon icon={IconDefinitions.cog} variant="square" size={SizeDefinitions.Small} />
                <Icon icon={IconDefinitions.cog} variant="square" size={SizeDefinitions.Medium} />
                <Icon icon={IconDefinitions.cog} variant="square" size={SizeDefinitions.Large} />
                <Icon icon={IconDefinitions.cog} variant="square" size={SizeDefinitions.ExtraLarge} />
                <Icon icon={IconDefinitions.cog} variant="square" size={SizeDefinitions.ExtraLarge2} />
                <Icon icon={IconDefinitions.cog} variant="square" size={SizeDefinitions.ExtraLarge3} />
            </Flex>
            <Flex>
                <Icon icon={IconDefinitions.cog} variant="circle" size={SizeDefinitions.Tiny} />
                <Icon icon={IconDefinitions.cog} variant="circle" size={SizeDefinitions.ExtraSmall} />
                <Icon icon={IconDefinitions.cog} variant="circle" size={SizeDefinitions.Small} />
                <Icon icon={IconDefinitions.cog} variant="circle" size={SizeDefinitions.Medium} />
                <Icon icon={IconDefinitions.cog} variant="circle" size={SizeDefinitions.Large} />
                <Icon icon={IconDefinitions.cog} variant="circle" size={SizeDefinitions.ExtraLarge} />
                <Icon icon={IconDefinitions.cog} variant="circle" size={SizeDefinitions.ExtraLarge2} />
                <Icon icon={IconDefinitions.cog} variant="circle" size={SizeDefinitions.ExtraLarge3} />
            </Flex>
        </>
    );
};

export const Css: StoryFn = (args) => {
    return <Icon color={ColorDefinitions.Rose} icon={IconDefinitions.bulb} iconCss="text-pink" />;
};

export const Position: StoryFn = (args) => {

    return (
        <>
            <p>The position gives an extra space between the icon and the text on the button</p>
            <button>
                <Icon icon={IconDefinitions.calendar_day} position="left" /> button
            </button>
            <button>
                button
                <Icon icon={IconDefinitions.calendar_day} position="right" />{' '}
            </button>
        </>
    );
};

export const Sprite: StoryFn = () => {

 
    return (

        <Demo>
            <div className="demo__col">
                {Object.values(IconDefinitions).map((item, idx) => (
                    <div key={item} className="demo__item">
                        <Icon icon={item} />
                        <h5>{item}</h5>
                    </div>
                ))}
            </div>
            <div className="demo__col">
                {Object.values(IconDefinitions).map((item, idx) => (
                    <div key={item} className="demo__item">
                        <Icon icon={item} duotone={true} />
                        <h5>{item}</h5>
                    </div>
                ))}
            </div>
        </Demo>

    );
};

export const Svg: StoryFn = () => {
    return (
        <Icon
            svg={
                <svg xmlns="http://www.w3.org/2000/svg">
                    <circle fill="red" r="20" cy="25" cx="25"></circle>
                </svg>
            }
        />
    );
};

export const FileIcons: StoryFn = () => {
    const fileIcons = Object.values(IconDefinitions).filter(key =>
        key.startsWith("file")
    );

    return (
        <Demo>
            <div className="demo__col">
                {Object.values(fileIcons).map((item, idx) => (
                    <div key={"demo__item" + idx} className="demo__item">
                        <Icon icon={item} size={SizeDefinitions.Large} />
                    </div>
                ))}
            </div>
        </Demo>
    );
};

export const renderPlainSvg: Story = {
    args: {
        icon: IconDefinitions.cookie,
        renderPlainSvg: true,
    },
};
