export default interface DraggableHtmlElementProps<TËlement extends Element> {
    draggable?: boolean;

    onDragStart?: (event: React.DragEvent<TËlement>) => void;
    onDrag?: (event: React.DragEvent<TËlement>) => void;
    onDragEnter?: (event: React.DragEvent<TËlement>) => void;
    onDragLeave?: (event: React.DragEvent<TËlement>) => void;
    onDragOver?: (event: React.DragEvent<TËlement>) => void;
    onDrop?: (event: React.DragEvent<TËlement>) => void;
    onDragEnd?: (event: React.DragEvent<TËlement>) => void;
}
