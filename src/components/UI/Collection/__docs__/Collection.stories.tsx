import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import ContentItem from '../../ContentItem/ContentItem';
import Icon from '../../Icons/Icon/Icon';
import Collection, { CollectionItem } from '../Collection';
import CollectionViewSelector, { CollectionViewSelectorOption } from '../CollectionViewSelector';

const meta = {
    component: Collection,
    title: 'UI Kit/Collection',
} satisfies Meta<typeof Collection>;

export default meta;
type Story = StoryObj<typeof meta>;

const items: CollectionItem[] = [
    {
        id: '1',
        content: {
            prefix: (<Icon icon={IconDefinitions.file_text} size={SizeDefinitions.Small} />),
            content: "List item title 1",
            postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
        }
    },
    {
        id: '2',
        content: {
            prefix: (<Icon icon={IconDefinitions.file_text} size={SizeDefinitions.Small} />),
            content: "List item title 2",
            postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
        },
    },
    {
        id: '3',
        content: {
            prefix: (<Icon icon={IconDefinitions.file_text} size={SizeDefinitions.Small} />),
            content: "List item title 3",
            postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
        },
    },
    {
        id: '4',
        content: {
           prefix: (<Icon icon={IconDefinitions.file_text} size={SizeDefinitions.Small} />),
            content: "List item title 4",
            postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
        }
    },
];

export const ViewOption: StoryFn = () => {

    const [viewOption, setViewOption] = useState<CollectionViewSelectorOption>('list');

    return (
        <>
            <div className="mt-3">
                <ContentItem item={{
                    id: 'viewSelector',
                    postfix: (<CollectionViewSelector setViewOption={setViewOption} defaultView={viewOption} />),
                    postfixGap: '0.25rem',
                    content: "Options",
                }} />

            </div>

            <Collection 
            items={items} 
            view={viewOption} 
             itemVariant="bordered"
            />
        </>

    )
};

export const Default: StoryFn = () => {
    return (
        <Collection items={items}/>
    )
};

export const ItemsBordered: StoryFn = () => {
   
    return (
        <Collection
            items={items}
            itemVariant="bordered"
        />

    )
};

export const ItemsUnderlined: StoryFn = () => {
    return (
        <Collection
        items={items}
        itemVariant="underlined"
      />
    )
};

export const Compact: StoryFn = () => {

    return (
       <Collection
        items={items}
        itemVariant="bordered"
        compact={true}
        />
    )
};

export const Medium: StoryFn = () => {
   
    return (
        <Collection 
        items={items}
        itemVariant="bordered"
        medium={true} 
        />
    )
};

export const Rounded: StoryFn = () => {
    
    return (
       <Collection
        items={items}
        itemVariant="bordered"
        rounded={SizeDefinitions.ExtraLarge3}
        />
    )
};

export const Hoverable: StoryFn = () => {
    return (
        <Collection 
        items={items}
        hoverable={true}
        selectable={true}
      />
    )
};

export const Background: StoryFn = () => {
    return (
        <Collection items={items}
        colorMute={ColorDefinitions.Olive}
        borderColor={ColorDefinitions.Olive}
        background={ColorDefinitions.Olive}
        hoverable={true}
        selectable={true}
      />
    )
};

export const Selectable: StoryFn = () => {
     const [selected, setSelected] = useState<string[]>([]);
    return (
        <Collection
        items={items}
        selectable={true}
        setSelected={setSelected}
        selected={selected}
      />
    )
};

export const Multiselect: StoryFn = () => {
    const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);

    return (
       <Collection
        items={items}
        selectable={true}
        selectMultiple={true}
        setSelected={setSelectedMultiple}
        selected={selectedMultiple} 
      />
    )
};

export const Collapsible: StoryFn = () => {
      return (
        <Collection
        items={[
          {
            id: '1',
            content: {
              prefix: (<Icon icon={IconDefinitions.file_text} />),
              content: "List item title 1",
            },
            collapsibleArrowPosition: 'left',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '2',
            content: {
              prefix: (<Icon icon={IconDefinitions.file_text} />),
              content: "List item title 2",
            },
            collapsibleArrowPosition: 'left',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '3',
            content: {
              prefix: (<Icon icon={IconDefinitions.file_text} />),
              content: "List item title 3",
            },
            collapsibleArrowPosition: 'left',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
        ]}
      />
    )
};

export const CollapsibleArrowRight: StoryFn = () => {
    return (
        <Collection
        items={[
          {
            id: '1',
            content: {
              prefix: (<Icon icon={IconDefinitions.file_text} />),
              content: "List item title 1",
            },
            collapsibleArrowPosition: 'right',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '2',
            content: {
              prefix: (<Icon icon={IconDefinitions.file_text} />),
              content: "List item title 2",
            },
            collapsibleArrowPosition: 'right',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '3',
            content: {
              prefix: (<Icon icon={IconDefinitions.file_text} />),
              content: "List item title 3",
            },
            collapsibleArrowPosition: 'right',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
        ]}
        />
    )
};

export const CollapsibleBorder: StoryFn = () => {

    return (
       <Collection borderColor={ColorDefinitions.Surface}
        items={[
          {
            id: '1',
            content: {
              prefix: (<Icon icon={IconDefinitions.file_text} />),
              content: "List item title 1",
            },
            collapsibleArrowPosition: 'left',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '2',
            content: {
              prefix: (<Icon icon={IconDefinitions.file_text} />),
              content: "List item title 2",
            },
            collapsibleArrowPosition: 'left',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '3',
            content: {
              prefix: (<Icon icon={IconDefinitions.file_text} />),
              content: "List item title 3",
            },
            collapsibleArrowPosition: 'left',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
        ]}
      />
    )
};
