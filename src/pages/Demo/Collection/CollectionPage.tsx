import React, { ReactElement, useState } from "react";
import Subtitle from "../../../components/Typography/Subtitle/Subtitle";
import Title from "../../../components/Typography/Title/Title";
import Collection, { CollectionItem } from "../../../components/UI/Collection/Collection";
import CollectionViewSelector, { CollectionViewSelectorOption } from "../../../components/UI/Collection/CollectionViewSelector";
import ContentItem from "../../../components/UI/ContentItem/ContentItem";
import { Icon } from "../../../components/UI/Icons/Icon";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const CollectionPage = ({
}): ReactElement => {

  const items: CollectionItem[] = [
    {
      id: '1',
      content: {
        prefix: (<Icon icon={IconDefinitions.file_text} />),
        content: "List item title 1",
        postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
      }
    },
    {
      id: '2',
      content: {
        prefix: (<Icon icon={IconDefinitions.file_text} />),
        content: "List item title 2",
        postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
      },
    },
    {
      id: '3',
      content: {
        prefix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
        content: "List item title 3",
        postfix: (<span className="text-secondary">22-04-2022</span>),
        postfixItemPosition: "item-start"
      },
    },
    {
      id: '4',
      content: {
        prefix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
        content: "List item title 4",
        postfix: (<span className="text-secondary">9987954</span>),
      }
    },
{
      id: '5',
      content: {
        prefix: (<Icon icon={IconDefinitions.file_text} />),
        content: "List item title 5",
        postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
      }
    },
    {
      id: '6',
      content: {
        prefix: (<Icon icon={IconDefinitions.file_text} />),
        content: "List item title 6",
        postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
      },
    },
    {
      id: '7',
      content: {
        prefix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
        content: "List item title 7",
        postfix: (<span className="text-secondary">22-04-2022</span>),
        postfixItemPosition: "item-start"
      },
    },
    {
      id: '8',
      content: {
        prefix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
        content: "List item title 8",
        postfix: (<span className="text-secondary">9987954</span>),
      }
    },
{
      id: '9',
      content: {
        prefix: (<Icon icon={IconDefinitions.file_text} />),
        content: "List item title 9",
        postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
      }
    },
    {
      id: '10',
      content: {
        prefix: (<Icon icon={IconDefinitions.file_text} />),
        content: "List item title 10",
        postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
      },
    },
    {
      id: '11',
      content: {
        prefix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
        content: "List item title 11",
        postfix: (<span className="text-secondary">22-04-2022</span>),
        postfixItemPosition: "item-start"
      },
    },
    {
      id: '12',
      content: {
        prefix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
        content: "List item title 12",
        postfix: (<span className="text-secondary">9987954</span>),
      }
    },
  ];

  const [selected, setSelected] = React.useState<string[]>([]);
  const [selectedMultiple, setSelectedMultiple] = React.useState<string[]>([]);

  const [viewOption, setViewOption] = useState<CollectionViewSelectorOption>('list');


  return (
    <section className="centered centered--wide">

      <div className="mb-3">
        <ContentItem item={{
          id: 'viewSelector',
          postfix: (<CollectionViewSelector setViewOption={setViewOption} defaultView={viewOption} />),
          postfixGap: '0.25rem',
          content: "Options",
        }} />

      </div>


      <h3 className="mt-3">Default</h3>
      <Collection items={items} view={viewOption} />

       <h3>Scrollable</h3>

      <Collection items={items} scrollable scrollheight={200} />

      <h3 className="mt-3">Items bordered</h3>
      <Collection
        items={items}
        itemVariant="bordered"
        view={viewOption}
      />

      <h3 className="mt-3">Items underlined</h3>
      <Collection
        items={items}
        itemVariant="underlined"
        view={viewOption}
      />

      <h3 className="mt-3">Compact</h3>
      <Collection
        items={items}
        itemVariant="bordered"
        compact={true}
        view={viewOption} />

      <h3 className="mt-3">Medium</h3>
      <Collection items={items}
        itemVariant="bordered"
        medium={true} view={viewOption} />

      <h3 className="mt-3">Rounded</h3>
      <Collection
        items={items}
        itemVariant="bordered"
        rounded={SizeDefinitions.ExtraLarge3}
        view={viewOption} />

      <h3 className="mt-3">Hoverable</h3>
      <Collection items={items}
        hoverable={true}
        selectable={true}
        view={viewOption}
      />

      <h3 className="mt-3">Background</h3>
      <Collection items={items}
        colorMute={ColorDefinitions.Olive}
        borderColor={ColorDefinitions.Olive}
        background={ColorDefinitions.Olive}
        hoverable={true}
        selectable={true}
        selectMultiple={true}
        setSelected={setSelectedMultiple}
        selected={selectedMultiple}
        view={viewOption}
      />


      <h3 className="mt-3">Selectable</h3>
      <Collection
        items={items}
        selectable={true}
        setSelected={setSelected}
        selected={selected}
        view={viewOption}
      />


      <h3 className="mt-3">Multiselect</h3>
      <Collection
        items={items}
        selectable={true}
        selectMultiple={true}
        setSelected={setSelectedMultiple}
        selected={selectedMultiple} view={viewOption}
      />

      <h3 className="mt-3">Collapsible arrow left</h3>
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

      <h3 className="mt-3">Collapsible arrow right</h3>
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

      <h3 className="mt-3">Collapsible border</h3>
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

    </section>
  )
}

export default CollectionPage;