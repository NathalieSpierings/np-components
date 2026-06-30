import React, { ReactElement, useState } from "react";
import Subtitle from "../../../components/Typography/Subtitle/Subtitle";
import Title from "../../../components/Typography/Title/Title";
import Collection, { CollectionItemType } from "../../../components/UI/Collection/Collection";
import CollectionViewSelector, { CollectionViewSelectorOption } from "../../../components/UI/Collection/CollectionViewSelector";
import ContentItem from "../../../components/UI/ContentItem/ContentItem";
import { Icon } from "../../../components/UI/Icons/Icon";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const CollectionPage = ({
}): ReactElement => {

     const items: CollectionItemType[] = [
    {
      id: '1',
      prefix: (<Icon icon={IconDefinitions.file_text} />),
      content: "List item title 1",
      postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
    },
    {
      id: '2',

      prefix: (<Icon icon={IconDefinitions.file_text} />),
      content: "List item title 2",
      postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
    },
    {
      id: '3',
      prefix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
      content: "List item title 3",
      postfix: (<span className="text-secondary">22-04-2022</span>),
      postfixItemPosition: "item-start"
    },
    {
      id: '4',
      prefix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
      content: "List item title 4",
      postfix: (<span className="text-secondary">9987954</span>),
    },
  ];

  const multiLineItems: CollectionItemType[] = [
    {
      id: '1',
      prefix: (<Icon icon={IconDefinitions.file_text} />),
      content: (
        <div className="flex flex-column ">
          <Title size="md">List item title 1</Title>
          <Subtitle>Subtitle 1</Subtitle>
        </div>
      ),
      postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
    },
    {
      id: '2',
      prefix: (<Icon icon={IconDefinitions.file_text} />),
      content: (
        <div className="flex flex-column ">
          <Title size="md">List item title 2</Title>
          <Subtitle>Subtitle 2</Subtitle>
        </div>
      ),
      postfix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
    },
    {
      id: '3',
      prefix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
      content: (
         <div className="flex flex-column ">
          <Title size="md">List item title 3</Title>
          <Subtitle>Subtitle 3</Subtitle>
        </div>
      ),
      postfix: (<span className="text-secondary">22-04-2022</span>),
      postfixItemPosition: "item-start"
    },
    {
      id: '4',
      prefix: (<Icon icon={IconDefinitions.bin} size={SizeDefinitions.Small} />),
      content: (
        <div className="flex flex-column ">
          <Title size="md">List item title 4</Title>
          <Subtitle>Subtitle 4</Subtitle>
        </div>
      ),
      postfix: (<span className="text-secondary">9987954</span>),
    },
  ];


  const [selected, setSelected] = React.useState<string[]>([]);
  const [selectedMultiple, setSelectedMultiple] = React.useState<string[]>([]);

  const [viewOption, setViewOption] = useState<CollectionViewSelectorOption>('list');


    return (
        <section className="centered centered--wide">

      <ContentItem item={{
        id: 'viewSelector',
        postfix: (<CollectionViewSelector setViewOption={setViewOption} defaultView={viewOption} />),
        postfixGap: '0.25rem',
        content: "Options",
      }} />


      <h3>Default</h3>
      <Collection items={items} view={viewOption} />

      <h3 className="mt-3">Bordered</h3>
      <Collection items={items} borderColor={ColorDefinitions.SurfaceDark} itemBorder="bordered" view={viewOption} />

      <h3 className="mt-3">Underlined</h3>
      <Collection items={items} borderColor={ColorDefinitions.SurfaceDark} itemBorder="underlined" view={viewOption} />

      <h3 className="mt-3">Compact</h3>
      <Collection items={items} borderColor={ColorDefinitions.SurfaceDark} compact={true} view={viewOption} />

      <h3 className="mt-3">Medium</h3>
      <Collection items={items} 
      borderColor={ColorDefinitions.SurfaceDark}
       medium={true} view={viewOption} />

      <h3 className="mt-3">Rounded</h3>
      <Collection items={multiLineItems} 
      borderColor={ColorDefinitions.SurfaceDark} 
      rounded={SizeDefinitions.ExtraLarge3} 
      view={viewOption} />

      <h3 className="mt-3">Hoverable</h3>
      <Collection items={multiLineItems} 
      borderColor={ColorDefinitions.SurfaceDark} 
      hoverable={true} 
      selectable={true}
       view={viewOption} />

      <h3 className="mt-3">Background</h3>
      <Collection items={multiLineItems}
        colorMute={ColorDefinitions.Olive}
        borderColor={ColorDefinitions.Olive}
        background={ColorDefinitions.Olive}
        hoverable={true}
        selectable={true} view={viewOption} />


      <h3 className="mt-3">Selectable</h3>
      <Collection
        items={multiLineItems}
        borderColor={ColorDefinitions.Surface}
        selectable={true}
        setSelected={setSelected}
        selected={selected} view={viewOption}
      />


      <h3 className="mt-3">Multiselect</h3>
      <Collection
        items={multiLineItems}
        borderColor={ColorDefinitions.Surface}
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
            prefix: (<Icon icon={IconDefinitions.file_text} />),
            content: "List item title 1",
            collapsibleArrowPosition: 'left',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '2',
            prefix: (<Icon icon={IconDefinitions.file_text} />),
            content: "List item title 2",
            collapsibleArrowPosition: 'left',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '3',
            prefix: (<Icon icon={IconDefinitions.file_text} />),
            content: "List item title 3",
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
            prefix: (<Icon icon={IconDefinitions.file_text} />),
            content: "List item title 1",
            collapsibleArrowPosition: 'right',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '2',
            prefix: (<Icon icon={IconDefinitions.file_text} />),
            content: "List item title 2",
            collapsibleArrowPosition: 'right',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '3',
            prefix: (<Icon icon={IconDefinitions.file_text} />),
            content: "List item title 3",
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
            prefix: (<Icon icon={IconDefinitions.file_text} />),
            content: "List item title 1",
            collapsibleArrowPosition: 'left',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '2',
            prefix: (<Icon icon={IconDefinitions.file_text} />),
            content: "List item title 2",
            collapsibleArrowPosition: 'left',
            collapsibleContent: (
              <div>
                Hier kan alles in: formulier, tekst, knoppen, tabs, etc.
              </div>
            ),
          },
          {
            id: '3',
            prefix: (<Icon icon={IconDefinitions.file_text} />),
            content: "List item title 3",
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