import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React, { ReactNode, useState } from 'react';
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from '../../../../lib/utils/definitions';
import Checkbox from '../../../Forms/Checkbox/Checkbox';
import Button from '../../Button/Button';
import ContentItem from '../../ContentItem/ContentItem';
import Icon from '../../Icons/Icon/Icon';
import Tooltip from '../../Tooltip/Tooltip';
import Collection, { CollectionItem } from '../Collection';
import CollectionViewSelector, { CollectionViewSelectorOption } from '../CollectionViewSelector';

const meta = {
  component: Collection,
  title: 'UI Kit/Collection',
} satisfies Meta<typeof Collection>;

export default meta;
type Story = StoryObj<typeof meta>;


// Sample data
const items: CollectionItem[] = Array.from({ length: 5 }, (_, i) => {
  const n = i + 1;
  const variant = i % 4;

  return {
    id: String(n),
    content: {
      prefix: variant < 2
        ? <Icon icon={IconDefinitions.file_text} />
        : <Icon icon={IconDefinitions.user} />,
      content: `List item title ${n}`,
      postfix: [
        <Icon key="bin" icon={IconDefinitions.bin} />,
        <Icon key="bin" icon={IconDefinitions.bin} />,
        <span key="date" className="text-secondary">22-04-2022</span>,
        <span key="nr" className="text-secondary">9987954</span>,
      ][variant],
      postfixItemPosition: variant === 2 ? 'item-start' : undefined,
    },
  };
});

const fewItems = items.slice(0, 4);

const makeCollapsibleItems = (
  position: 'left' | 'right',
  options: { defaultOpenId?: string; body?: (n: number) => ReactNode } = {}
): CollectionItem[] =>
  [1, 2, 3].map(n => ({
    id: String(n),
    defaultOpen: options.defaultOpenId === String(n),
    collapsibleArrowPosition: position,
    content: {
      prefix: <Icon icon={IconDefinitions.file_text} />,
      content: `List item title ${n}`,
    },
    collapsibleContent: options.body?.(n) ?? (
      <div className="p-2">Hier kan alles in: formulier, tekst, knoppen, tabs, etc.</div>
    ),
  }));


interface DemoFile {
  id: string;
  name: string;
  createdAt: string;
  type: string;
  removed?: boolean;
}

const demoFiles: DemoFile[] = [
  { id: 'f1', name: 'Heen volledig toegekend VK301.txt', createdAt: '09-09-2026', type: 'Heenbericht', removed: true },
  { id: 'f2', name: 'Heen_12345678_1111_2025111102T8.xlsx', createdAt: '16-09-2026', type: 'Terugkoppeling' },
  { id: 'f3', name: 'PMRETOUR132202632.pdf', createdAt: '16-09-2026', type: 'Terugkoppeling' },
  { id: 'f4', name: 'Declaratie_oktober.zip', createdAt: '01-10-2026', type: 'Aanlevering' },
];;

const tasks = [
    { id: 't1', label: 'Dossier aanmaken' },
    { id: 't2', label: 'Bestanden uploaden' },
    { id: 't3', label: 'Controle door casemanager' },
    { id: 't4', label: 'Versturen naar klant' },
];

const toggleId = (current: string[], id: string, checked: boolean) =>
    checked ? [...current, id] : current.filter(x => x !== id);

const Status = ({ children }: { children: ReactNode }) => (
    <p className="text-mute mb-2">{children}</p>
);


// Basis
export const Default: StoryFn = () => <Collection items={items} />;


export const ViewOption: StoryFn = () => {

  const [viewOption, setViewOption] = useState<CollectionViewSelectorOption>('list');

  return (
    <>
      <div className="mb-3">
        <ContentItem item={{
          id: 'viewSelector',
          postfix: (<CollectionViewSelector setViewOption={setViewOption} defaultView={viewOption} />),
          postfixGap: '0.25rem',
          content: "Options",
        }} />
      </div>

      <Collection items={items} view={viewOption} itemVariant="bordered" />
    </>

  )
};

export const Scrollable: StoryFn = () => <Collection items={items} scrollable scrollheight={200} />;

export const ItemsBordered: StoryFn = () => <Collection items={items} itemVariant="bordered" />;

export const ItemsUnderlined: StoryFn = () => <Collection items={items} itemVariant="underlined" />;

export const IndividualItemBackgroundAndBorder: StoryFn = () => (
    <Collection
        items={fewItems.map(item =>
            item.id === '2'
                ? { ...item, background: ColorDefinitions.Rose5, borderColor: ColorDefinitions.Rose30 }
                : item
        )}
        itemVariant="bordered"
        borderColor={ColorDefinitions.Surface}
    />
);

IndividualItemBackgroundAndBorder.storyName = 'Individual item background and border (item gaat voor collectie)';

export const Compact: StoryFn = () => <Collection items={items} itemVariant="bordered" compact />;

export const Medium: StoryFn = () => <Collection items={items} itemVariant="bordered" medium />;

export const Rounded: StoryFn = () => (
    <Collection items={items} itemVariant="bordered" rounded={SizeDefinitions.ExtraLarge3} />
);

export const Hoverable: StoryFn = () => <Collection items={items} hoverable />;

export const Background: StoryFn = () => (
    <Collection
        items={items}
        colorMute={ColorDefinitions.Olive}
        borderColor={ColorDefinitions.Olive}
        background={ColorDefinitions.Olive}
    />
);

export const ActiveIndicator: StoryFn = () => (
    <Collection
        items={fewItems.map(item => ({ ...item, active: item.id === '1' || item.id === '3' }))}
        itemVariant="bordered"
    />
);


// Selectie


export const Selectable: StoryFn = () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <>
            <Status>Geselecteerd: {selected.join(', ') || '-'}</Status>
            <Collection items={items.slice(0, 5)} selectable selected={selected} setSelected={setSelected} />
        </>
    );
};

export const Multiselect: StoryFn = () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <>
            <Status>Geselecteerd: {selected.join(', ') || '-'}</Status>
            <Collection items={items.slice(0, 5)} selectable selectMultiple selected={selected} setSelected={setSelected} />
        </>
    );
};

export const MultiselectWithCheckbox: StoryFn = () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <>
            <Status>Klik op het item óf de checkbox. Geselecteerd: {selected.join(', ') || '-'}</Status>
            <Collection
                itemVariant="bordered"
                selectable
                selectMultiple
                selected={selected}
                setSelected={setSelected}
                items={items.slice(0, 5).map(item => ({
                    ...item,
                    content: {
                        ...item.content,
                        prefix: (
                            <>
                                <Checkbox
                                    color={ColorDefinitions.Accent}
                                    checked={selected.includes(item.id)}
                                    onChange={(checked: boolean) => setSelected(current => toggleId(current, item.id, checked))}
                                />
                                {item.content.prefix}
                            </>
                        ),
                    },
                }))}
            />
        </>
    );
};

export const CheckboxesWithActions: StoryFn = () => {
    const [checkedIds, setCheckedIds] = useState<string[]>([]);
    const selectableFiles = demoFiles.filter(f => !f.removed);
    const allChecked = selectableFiles.length > 0 && checkedIds.length === selectableFiles.length;

    return (
        <>
            <div className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Tooltip content={`${allChecked ? 'Deselecteer' : 'Selecteer'} alle bestanden`}>
                    <Checkbox
                        color={ColorDefinitions.Accent}
                        checked={allChecked}
                        onChange={(checked: boolean) => setCheckedIds(checked ? selectableFiles.map(f => f.id) : [])}
                    />
                </Tooltip>
                <Button size={SizeDefinitions.Small} disabled={checkedIds.length === 0}>
                    <Icon icon={IconDefinitions.cloud_download} position="left" size={SizeDefinitions.Medium} />
                    Downloaden ({checkedIds.length})
                </Button>
            </div>

            <Collection
                borderColor={ColorDefinitions.Surface}
                rounded={SizeDefinitions.Large}
                items={demoFiles.map(file => ({
                    id: file.id,
                    background: file.removed ? ColorDefinitions.Rose5 : undefined,
                    borderColor: file.removed ? ColorDefinitions.Rose20 : undefined,
                    collectionItemCss: file.removed ? `text-${ColorDefinitions.Rose30}` : '',
                    content: {
                        prefix: (
                            <>
                                {!file.removed && (
                                    <Checkbox
                                        color={ColorDefinitions.Accent}
                                        checked={checkedIds.includes(file.id)}
                                        onChange={(checked: boolean) => setCheckedIds(current => toggleId(current, file.id, checked))}
                                    />
                                )}
                                <Icon icon={IconDefinitions.doc} />
                            </>
                        ),
                        content: (
                            <>
                                <span>{file.name}</span>
                                <small className={`${file.removed ? 'text-rose' : 'text-mute'} mb-05 mt-05`}>
                                    Aangemaakt: {file.createdAt}
                                </small>
                                <small>{file.removed ? `${file.type} · Verwijderd` : file.type}</small>
                            </>
                        ),
                        postfix: !file.removed && (
                            <>
                                <Tooltip content="Bewerken">
                                    <Icon icon={IconDefinitions.pencil} iconCss="pointer" hover />
                                </Tooltip>
                                <Tooltip content="Downloaden">
                                    <Icon
                                        icon={IconDefinitions.cloud_download}
                                        iconCss="pointer"
                                        ring
                                        ringSize="ring-1"
                                        ringHoverColor={ColorDefinitions.Blue}
                                        hoverBackground={ColorDefinitions.Blue}
                                        rounded={SizeDefinitions.Full}
                                        size={SizeDefinitions.Small}
                                    />
                                </Tooltip>
                            </>
                        ),
                    },
                }))}
            />
        </>
    );
};

export const TaskList: StoryFn = () => {
    const [doneIds, setDoneIds] = useState<string[]>(['t2']);

    return (
        <>
            <Status>{doneIds.length}/{tasks.length} afgerond</Status>
            <Collection
                itemVariant="underlined"
                items={tasks.map(task => {
                    const done = doneIds.includes(task.id);
                    return {
                        id: task.id,
                        content: {
                            prefix: (
                                <Checkbox
                                    color={ColorDefinitions.Accent}
                                    checked={done}
                                    onChange={(checked: boolean) => setDoneIds(current => toggleId(current, task.id, checked))}
                                />
                            ),
                            content: (
                                <span className={done ? 'text-mute' : ''} style={{ textDecoration: done ? 'line-through' : 'none' }}>
                                    {task.label}
                                </span>
                            ),
                        },
                    };
                })}
            />
        </>
    );
};

export const DynamicAddRemove: StoryFn = () => {
    const [list, setList] = useState([
        { id: 'd1', label: 'Taak 1' },
        { id: 'd2', label: 'Taak 2' },
    ]);
    const [counter, setCounter] = useState(3);

    const add = () => {
        setList(current => [...current, { id: `d${counter}`, label: `Taak ${counter}` }]);
        setCounter(c => c + 1);
    };

    return (
        <>
            <Button css="mb-2" size={SizeDefinitions.Small} onClick={add}>
                <Icon icon={IconDefinitions.plus} position="left" size={SizeDefinitions.Small} />
                Item toevoegen
            </Button>

            <Collection
                itemVariant="bordered"
                items={list.map(item => ({
                    id: item.id,
                    content: {
                        prefix: <Icon icon={IconDefinitions.file_text} />,
                        content: item.label,
                        postfix: (
                            <Tooltip content="Verwijderen">
                                <Icon
                                    icon={IconDefinitions.bin}
                                    iconCss="pointer"
                                    hover
                                    size={SizeDefinitions.Small}
                                    onClick={() => setList(current => current.filter(x => x.id !== item.id))}
                                />
                            </Tooltip>
                        ),
                    },
                }))}
            />

            {list.length === 0 && <p className="text-mute mt-2">Geen items. Klik op "Item toevoegen".</p>}
        </>
    );
};

export const Collapsible: StoryFn = () => <Collection items={makeCollapsibleItems('left')} />;

export const CollapsibleArrowRight: StoryFn = () => <Collection items={makeCollapsibleItems('right')} />;

export const CollapsibleBorder: StoryFn = () => (
    <Collection borderColor={ColorDefinitions.Surface} items={makeCollapsibleItems('left')} />
);

export const CollapsibleDefaultOpen: StoryFn = () => (
    <Collection itemVariant="bordered" items={makeCollapsibleItems('right', { defaultOpenId: '2' })} />
);

export const CollapsibleControlled: StoryFn = () => {
    const [activeItem, setActiveItem] = useState<string | undefined>('2');

    return (
        <>
            <Status>Open: {activeItem ?? 'geen'}</Status>
            <div className="mb-2" style={{ display: 'flex', gap: '0.5rem' }}>
                {['1', '2', '3'].map(id => (
                    <Button key={id} size={SizeDefinitions.Small} onClick={() => setActiveItem(id)}>
                        Open {id}
                    </Button>
                ))}
                <Button size={SizeDefinitions.Small} onClick={() => setActiveItem(undefined)}>
                    Alles dicht
                </Button>
            </div>

            <Collection
                itemVariant="bordered"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                items={makeCollapsibleItems('left')}
            />
        </>
    );
};



const SETTING_LABELS = ['Zichtbaar voor klant', 'Notificatie versturen', 'Archiveren na verwerking'];

interface ItemSettingsProps {
    itemId: string;
    checked: string[];
    onToggle: (key: string, value: boolean) => void;
}

const ItemSettings = ({ itemId, checked, onToggle }: ItemSettingsProps) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {SETTING_LABELS.map(label => {
            const key = `${itemId}-${label}`;
            return (
                <label key={key} className='flex flex-center gap-1'>
                    <Checkbox
                        color={ColorDefinitions.Accent}
                        checked={checked.includes(key)}
                        onChange={(value: boolean) => onToggle(key, value)}
                    />
                    {label}
                </label>
            );
        })}
    </div>
);

export const CollapsibleWithCheckboxes: StoryFn = () => {
    const [checked, setChecked] = useState<string[]>([]);
    const handleToggle = (key: string, value: boolean) => setChecked(current => toggleId(current, key, value));

    return (
        <Collection
            itemVariant="bordered"
            borderColor={ColorDefinitions.Surface}
            items={makeCollapsibleItems('right').map(item => ({
                ...item,
                collapsibleContent: <ItemSettings itemId={item.id} checked={checked} onToggle={handleToggle} />,
            }))}
        />
    );
};