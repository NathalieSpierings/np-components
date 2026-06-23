import React, { ReactElement, useMemo } from "react";
import { DatagridColumnRuntime } from "../Datagrid";
import Checkbox from "../../../Forms/Checkbox/Checkbox";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import Icon from "../../../UI/Icons/Icon/Icon";

export interface DatagridColumnChooserProps<TData> {
    columns: DatagridColumnRuntime<TData>[];
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    allColumnsVisible: boolean;
    someColumnsVisible: boolean;
    setAllColumnsVisible: (checked: boolean) => void;
    updateColumnState: (
        prop: string,
        update: Partial<Pick<DatagridColumnRuntime<TData>, "width" | "visible" | "pinned">>
    ) => void;
    moveColumn: (draggedProp: string, targetProp: string) => void;
    columnPickerDragProp: React.RefObject<string | null>;
    lastDragTargetProp: React.RefObject<string | null>;
    dragOverColumn: string | null;
    setDragOverColumn: (prop: string | null) => void;
    createDragPreview: (label: string) => void;
    moveDragPreview: (event: DragEvent | React.DragEvent) => void;
    removeDragPreview: () => void;
}

export  function DatagridColumnChooser<TData>({
    columns,
    searchTerm,
    setSearchTerm,
    allColumnsVisible,
    someColumnsVisible,
    setAllColumnsVisible,
    updateColumnState,
    moveColumn,
    columnPickerDragProp,
    lastDragTargetProp,
    dragOverColumn,
    setDragOverColumn,
    createDragPreview,
    moveDragPreview,
    removeDragPreview,
}: Readonly<DatagridColumnChooserProps<TData>>): ReactElement {
    const filteredColumns = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();

        if (!q) return columns;

        return columns.filter((column) =>
            column.title.toLowerCase().includes(q) ||
            column.prop.toLowerCase().includes(q)
        );
    }, [columns, searchTerm]);

    const visibleCount = columns.filter((column) => column.visible).length;

    return (
        <div className="datagrid__column-picker">
            <div className="datagrid__column-picker__header">
                <Checkbox
                    color={ColorDefinitions.Accent}
                    checked={allColumnsVisible}
                    onChange={setAllColumnsVisible}
                    indeterminate={someColumnsVisible && !allColumnsVisible}
                />

                <div className="datagrid__column-picker__search">
                    <div className="datagrid__column-picker__search__container">
                        <Icon icon={IconDefinitions.search} size={SizeDefinitions.Small} />

                        <input
                            type="search"
                            placeholder="Zoek kolom..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            </div>


            {filteredColumns.length === 0 ? (
                <div className="datagrid__column-picker__item">
                    Geen kolommen gevonden
                </div>
            ) : (
                filteredColumns.map((visibleColumn) => {
                    const isLastVisible = visibleColumn.visible && visibleCount === 1;

                    return (
                        <div
                            key={visibleColumn.prop}
                            className={[
                                "datagrid__column-picker__item",
                                dragOverColumn === visibleColumn.prop
                                    ? "datagrid__column-picker__item--dragging"
                                    : "",
                            ].join(" ")}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                moveDragPreview(e);

                                const draggedProp = columnPickerDragProp.current;

                                if (!draggedProp) return;
                                if (draggedProp === visibleColumn.prop) return;
                                if (lastDragTargetProp.current === visibleColumn.prop) return;

                                lastDragTargetProp.current = visibleColumn.prop;

                                setDragOverColumn(visibleColumn.prop);
                                moveColumn(draggedProp, visibleColumn.prop);
                            }}
                        >
                            <Checkbox
                                color={ColorDefinitions.Accent}
                                checked={visibleColumn.visible}
                                disabled={isLastVisible}
                                onChange={(checked) =>
                                    updateColumnState(visibleColumn.prop, {
                                        visible: checked,
                                    })
                                }
                            />

                            <button
                                type="button"
                                className="datagrid__column-picker__grip"
                                draggable
                                onPointerDown={(e) => e.stopPropagation()}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => e.stopPropagation()}
                                onDragStart={(e) => {
                                    e.stopPropagation();

                                    columnPickerDragProp.current = visibleColumn.prop;
                                    lastDragTargetProp.current = null;

                                    createDragPreview(visibleColumn.title);

                                    const img = new Image();
                                    img.src =
                                        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

                                    e.dataTransfer.setDragImage(img, 0, 0);
                                    e.dataTransfer.effectAllowed = "move";
                                }}
                                onDragEnd={(e) => {
                                    e.stopPropagation();

                                    removeDragPreview();
                                    columnPickerDragProp.current = null;
                                    lastDragTargetProp.current = null;
                                    setDragOverColumn(null);
                                }}
                            >
                                <Icon
                                    icon={IconDefinitions.grip_v}
                                    size={SizeDefinitions.Small}
                                    duotone={false}
                                />
                            </button>

                            <div>{visibleColumn.title}</div>
                        </div>
                    );
                })
            )}
           
        </div>
    );
}

export default DatagridColumnChooser;