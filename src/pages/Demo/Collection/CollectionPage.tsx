import React, { ReactElement, ReactNode, useState } from "react";
import Fieldset from "../../../components/Typography/Fieldset/Fieldset";
import Collection, { CollectionItem } from "../../../components/UI/Collection/Collection";
import CollectionViewSelector, { CollectionViewSelectorOption } from "../../../components/UI/Collection/CollectionViewSelector";
import ContentItem from "../../../components/UI/ContentItem/ContentItem";
import { Icon } from "../../../components/UI/Icons/Icon";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";
import Checkbox from "../../../components/Forms/Checkbox/Checkbox";
import Tooltip from "../../../components/UI/Tooltip/Tooltip";
import Button from "../../../components/UI/Button/Button";


const items: CollectionItem[] = Array.from({ length: 5 }, (_, i) => {
  const n = i + 1;
  const variant = i % 4;

  return {
    id: String(n),
    content: {
      prefix: variant < 2
        ? <Icon icon={IconDefinitions.file_text} />
        : <Icon icon={IconDefinitions.user}  />,
      content: `List item title ${n}`,
      postfix: [
        <Icon key="bin" icon={IconDefinitions.bin} />,
        <Icon key="bin" icon={IconDefinitions.bin}  />,
        <span key="date" className="text-secondary">22-04-2022</span>,
        <span key="nr" className="text-secondary">9987954</span>,
      ][variant],
      postfixItemPosition: variant === 2 ? "item-start" : undefined,
    },
  };
});

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
];

const CollectionPage = (): ReactElement => {

  const [viewOption, setViewOption] = useState<CollectionViewSelectorOption>('list');

  const [selected, setSelected] = useState<string[]>([]);
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);

  // Checkbox
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const selectableFiles = demoFiles.filter(f => !f.removed);
  const allChecked = selectableFiles.length > 0 && checkedIds.length === selectableFiles.length;

  const toggleOne = (id: string, checked: boolean) =>
    setCheckedIds(current => (checked ? [...current, id] : current.filter(x => x !== id)));

  // Selectable + checkbox
  const [selectedWithCheckbox, setSelectedWithCheckbox] = useState<string[]>([]);

  // Controlled expanding
  const [activeItem, setActiveItem] = useState<string | undefined>('2');

  // Dynamic add/remove
  const [dynamicItems, setDynamicItems] = useState<{ id: string; label: string }[]>([
    { id: 'd1', label: 'Taak 1' },
    { id: 'd2', label: 'Taak 2' },
  ]);
  const [counter, setCounter] = useState(3);

  const addDynamicItem = () => {
    setDynamicItems(current => [...current, { id: `d${counter}`, label: `Taak ${counter}` }]);
    setCounter(c => c + 1);
  };

  const removeDynamicItem = (id: string) =>
    setDynamicItems(current => current.filter(item => item.id !== id));

  // Tasklist (checkbox as status)
  const [doneIds, setDoneIds] = useState<string[]>(['t2']);
  const tasks = [
    { id: 't1', label: 'Dossier aanmaken' },
    { id: 't2', label: 'Bestanden uploaden' },
    { id: 't3', label: 'Controle door casemanager' },
    { id: 't4', label: 'Versturen naar klant' },
  ];

  return (
    <section className="centered centered--wide pb-5">

      <div className="mt-3 mb-3">
        <ContentItem item={{
          id: 'viewSelector',
          postfix: (<CollectionViewSelector setViewOption={setViewOption} defaultView={viewOption} />),
          postfixGap: '0.25rem',
          content: "Options",
        }} />
      </div>

  
        <Fieldset fieldsetCss="mb-3" legend="Default">
          <Collection items={items} view={viewOption} />
        </Fieldset>

      <Fieldset fieldsetCss="mb-3" legend="Scrollable">
        <Collection items={items} scrollable scrollheight={200} />
      </Fieldset>
   
        <Fieldset fieldsetCss="mb-3" legend="Items bordered">
          <Collection items={items} itemVariant="bordered" view={viewOption} />
        </Fieldset>

        <Fieldset fieldsetCss="mb-3" legend="Items bordered with color (item-kleur gaat voor collectie-kleur)">
          <Collection
            items={items.slice(0, 4).map(item =>
              item.id === '2'
                ? { ...item, background: ColorDefinitions.Rose5, borderColor: ColorDefinitions.Rose30 }
                : item
            )}
            itemVariant="bordered"
            borderColor={ColorDefinitions.Surface}
            view={viewOption}
          />
        </Fieldset>
 
        <Fieldset fieldsetCss="mb-3" legend="Rounded">
          <Collection items={items} itemVariant="bordered" rounded={SizeDefinitions.ExtraLarge3} view={viewOption} />
        </Fieldset>

        <Fieldset fieldsetCss="mb-3" legend="Items underlined">
          <Collection items={items} itemVariant="underlined" view={viewOption} />
        </Fieldset>
       
        <Fieldset fieldsetCss="mb-3" legend="Compact">
          <Collection items={items} itemVariant="bordered" compact view={viewOption} />
        </Fieldset>

        <Fieldset fieldsetCss="mb-3" legend="Medium">
          <Collection items={items} itemVariant="bordered" medium view={viewOption} />
        </Fieldset>
     


        <Fieldset fieldsetCss="mb-3" legend="Background">
          <Collection
            items={items}
            colorMute={ColorDefinitions.Olive}
            borderColor={ColorDefinitions.Olive}
            background={ColorDefinitions.Olive}
            view={viewOption}
          />
        </Fieldset>
     

      <Fieldset fieldsetCss="mb-3" legend="Hoverable">
        <Collection items={items} hoverable view={viewOption} />
      </Fieldset>



      <Fieldset fieldsetCss="mb-3" legend="Active indicator">
        <Collection
          items={items.slice(0, 4).map(item => ({ ...item, active: item.id === '1' || item.id === '3' }))}
          itemVariant="bordered"
          view={viewOption}
        />
      </Fieldset>

      {/* Selection */}
      <Fieldset fieldsetCss="mb-3" legend={`Selectable (geselecteerd: ${selected.join(', ') || '-'})`}>
        <Collection
          items={items.slice(0, 5)}
          selectable
          selected={selected}
          setSelected={setSelected}
          view={viewOption}
        />
      </Fieldset>

      <Fieldset fieldsetCss="mb-3" legend={`Multiselect (geselecteerd: ${selectedMultiple.join(', ') || '-'})`}>
        <Collection
          items={items.slice(0, 5)}
          selectable
          selectMultiple
          selected={selectedMultiple}
          setSelected={setSelectedMultiple}
          view={viewOption}
        />
      </Fieldset>

      <Fieldset fieldsetCss="mb-3" legend="Multiselect met checkbox (klik op item óf checkbox)">
        <Collection
          itemVariant="bordered"
          selectable
          selectMultiple
          selected={selectedWithCheckbox}
          setSelected={setSelectedWithCheckbox}
          items={items.slice(0, 5).map(item => ({
            ...item,
            content: {
              ...item.content,
              prefix: (
                <>
                  <Checkbox
                    color={ColorDefinitions.Accent}
                    checked={selectedWithCheckbox.includes(item.id)}
                    onChange={(checked: boolean) =>
                      setSelectedWithCheckbox(current =>
                        checked ? [...current, item.id] : current.filter(x => x !== item.id)
                      )
                    }
                  />
                  {item.content.prefix}
                </>
              ),
            },
          }))}
        />
      </Fieldset>

      {/* Collapsible */}
      <Fieldset fieldsetCss="mb-3" legend="Collapsible arrow left">
        <Collection items={makeCollapsibleItems('left')} />
      </Fieldset>

      <Fieldset fieldsetCss="mb-3" legend="Collapsible arrow right">
        <Collection items={makeCollapsibleItems('right')} />
      </Fieldset>

      <Fieldset fieldsetCss="mb-3" legend="Collapsible border">
        <Collection borderColor={ColorDefinitions.Surface} items={makeCollapsibleItems('left')} />
      </Fieldset>

      <Fieldset fieldsetCss="mb-3" legend="Collapsible met defaultOpen (item 2)">
        <Collection itemVariant="bordered" items={makeCollapsibleItems('right', { defaultOpenId: '2' })} />
      </Fieldset>

      <Fieldset fieldsetCss="mb-3" legend={`Collapsible gecontroleerd (open: ${activeItem ?? 'geen'})`}>
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
      </Fieldset>

      <Fieldset fieldsetCss="mb-3" legend="Collapsible met checkboxen erin">
        <Collection
          itemVariant="bordered"
          borderColor={ColorDefinitions.Surface}
          items={makeCollapsibleItems('right', {
            body: n => (
              <div className="flex flex-column gap-1 m-2" >
                {['Zichtbaar voor klant', 'Notificatie versturen', 'Archiveren na verwerking'].map(label => (
                  <label key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Checkbox color={ColorDefinitions.Accent} />
                    {label} (item {n})
                  </label>
                ))}
              </div>
            ),
          })}
        />
      </Fieldset>


      {/* Checkboxen + actions */}
      <Fieldset fieldsetCss="mb-3" legend="Checkboxen met 'selecteer alle' en acties">
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
                      onChange={(checked: boolean) => toggleOne(file.id, checked)}
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
      </Fieldset>

      <Fieldset fieldsetCss="mb-3" legend={`Takenlijst (${doneIds.length}/${tasks.length} afgerond)`}>
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
                    onChange={(checked: boolean) =>
                      setDoneIds(current => (checked ? [...current, task.id] : current.filter(x => x !== task.id)))
                    }
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
      </Fieldset>

      {/* Dynamic */}
      <Fieldset fieldsetCss="mb-3" legend="Dynamisch toevoegen en verwijderen (animatie)">
        <Button css="mb-2" size={SizeDefinitions.Small} onClick={addDynamicItem}>
          <Icon icon={IconDefinitions.plus} position="left" size={SizeDefinitions.Small} />
          Item toevoegen
        </Button>

        <Collection
          itemVariant="bordered"
          items={dynamicItems.map(item => ({
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
                    onClick={() => removeDynamicItem(item.id)}
                  />
                </Tooltip>
              ),
            },
          }))}
        />

        {dynamicItems.length === 0 && (
          <p className="text-mute mt-2">Geen items. Klik op "Item toevoegen".</p>
        )}
      </Fieldset>


    </section>
  );
};

export default CollectionPage;
