import React, { ReactElement, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../../lib/utils/definitions";
import Checkbox from "../../../Forms/Checkbox/Checkbox";
import Icon from "../../../UI/Icons/Icon/Icon";
import { DatagridColumnRuntime } from "../Datagrid";


export function useDatagridColumnChooser<TData>({
    columns,
    setColumns,
    enableColumnReorder = true,
    enableColumnVisibility = true
}: {
    columns: DatagridColumnRuntime<TData>[];
    setColumns: React.Dispatch<SetStateAction<DatagridColumnRuntime<TData>[]>>;
    enableColumnReorder?: boolean;
    enableColumnVisibility?: boolean;
}) {

    const columnPickerDragProp = useRef<string | null>(null);
    const lastDragTargetProp = useRef<string | null>(null);
    const dragPreviewRef = useRef<HTMLDivElement | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

    const allColumnsVisible = columns.every((c) => c.visible);
    const someColumnsVisible = columns.some((c) => c.visible);

    const setAllColumnsVisible = (checked: boolean) => {
        setColumns((current) =>
            current.map((column, index) => ({
                ...column,
                visible: checked || index === 0,
            }))
        );
    };

    const updateColumnState = (
        prop: string,
        update: Partial<Pick<DatagridColumnRuntime<TData>, "width" | "visible" | "pinned">>
    ) => {
        setColumns((current) => {
            if (update.visible === false) {
                const visibleCount = current.filter((c) => c.visible).length;
                const targetColumn = current.find((c) => c.prop === prop);

                if (visibleCount === 1 && targetColumn?.visible) {
                    return current;
                }
            }

            return current.map((column) =>
                column.prop === prop ? { ...column, ...update } : column
            );
        });
    };

    const moveColumn = (draggedProp: string, targetProp: string) => {
        if (!enableColumnReorder) return;
        if (draggedProp === targetProp) return;

        setColumns((current) => {
            const from = current.findIndex((c) => c.prop === draggedProp);
            const to = current.findIndex((c) => c.prop === targetProp);

            if (from === -1 || to === -1 || from === to) return current;

            const updated = [...current];
            const [moved] = updated.splice(from, 1);
            updated.splice(to, 0, moved);

            return updated;
        });
    };

    const removeDragPreview = () => {
        dragPreviewRef.current?.remove();
        dragPreviewRef.current = null;
    };

    const createDragPreview = (label: string) => {
        removeDragPreview();

        const preview = document.createElement("div");
        preview.className = "datagrid__grid__drag__tooltip";
        preview.innerHTML = `
            <div class="icon icon--sm">
                <svg><use xlink:href="#svg_icon_move" /></svg>
            </div>
            <span>${label}</span>
        `;

        document.body.appendChild(preview);
        dragPreviewRef.current = preview;
    };

    const moveDragPreview = (event: DragEvent | React.DragEvent) => {
        if (!dragPreviewRef.current) return;

        dragPreviewRef.current.style.transform =
            `translate(${event.clientX + 12}px, ${event.clientY + 12}px)`;
    };

    useEffect(() => {
        const onDragOver = (event: DragEvent) => {
            moveDragPreview(event);
        };

        document.addEventListener("dragover", onDragOver);

        return () => {
            document.removeEventListener("dragover", onDragOver);
            removeDragPreview();
        };
    }, []);

    const renderColumnChooser = () => (
        <DatagridColumnChooser
            enableColumnReorder={enableColumnReorder}
            enableColumnVisibility={enableColumnVisibility}
            columns={columns}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            allColumnsVisible={allColumnsVisible}
            someColumnsVisible={someColumnsVisible}
            setAllColumnsVisible={setAllColumnsVisible}
            updateColumnState={updateColumnState}
            moveColumn={moveColumn}
            columnPickerDragProp={columnPickerDragProp}
            lastDragTargetProp={lastDragTargetProp}
            dragOverColumn={dragOverColumn}
            setDragOverColumn={setDragOverColumn}
            createDragPreview={createDragPreview}
            moveDragPreview={moveDragPreview}
            removeDragPreview={removeDragPreview}
        />
    );

    return {
        renderColumnChooser,
        updateColumnState,
        moveColumn,
        createDragPreview,
        moveDragPreview,
        removeDragPreview,
        columnPickerDragProp,
        lastDragTargetProp,
    };
}



export interface DatagridColumnChooserProps<TData> {
    enableColumnReorder?: boolean;
    enableColumnVisibility?: boolean;
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

export function DatagridColumnChooser<TData>({
    enableColumnReorder,
    enableColumnVisibility,
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
                {enableColumnVisibility && (
                    <Checkbox
                        color={ColorDefinitions.Accent}
                        checked={allColumnsVisible}
                        onChange={setAllColumnsVisible}
                        indeterminate={someColumnsVisible && !allColumnsVisible}
                    />

                )}

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

                    const css = [
                        "datagrid__column-picker__item",
                        dragOverColumn === visibleColumn.prop
                            ? "datagrid__column-picker__item--dragging"
                            : "",
                    ].join(" ");

                    return (
                        <div
                            key={visibleColumn.prop}
                            className={css}
                            onDragOver={
                                enableColumnReorder
                                    ? (e) => {
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
                                    }
                                    : undefined
                            }
                        >
                            {enableColumnVisibility && (
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
                            )}


                            {enableColumnReorder && (
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

                            )}


                            <div>{visibleColumn.title}</div>
                        </div>
                    );
                })
            )}

        </div>
    );
}

export default DatagridColumnChooser;