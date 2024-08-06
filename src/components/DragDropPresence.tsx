import { PropsWithChildren } from 'react';
import {
  DragDropContext,
  OnBeforeDragStartResponder,
  OnDragEndResponder,
  OnDragUpdateResponder,
} from 'react-beautiful-dnd';
import { useItems } from '../store/ItemProvider';
import { move, reorder } from '../utils/dnd';
import { useDraggingState } from '../store/DraggingProvider';
import { BOARD_ID } from '../constants/dnd';
import { useSelections } from '../store/SelectionsProvider';

export default function DragDropPresence({ children }: PropsWithChildren) {
  const { itemCollection, setItemCollection } = useItems();
  const { selections, setSelections } = useSelections();
  const { setDragging, isEvenIndexCrossBoardDrag, isFirstToThird } =
    useDraggingState();

  const controllSelectionOrder: OnBeforeDragStartResponder = (dragging) => {
    if (selections.includes(dragging.draggableId)) {
      setSelections((old) => {
        const targetIndex = old.findIndex(
          (selectionId) => selectionId === dragging.draggableId
        );
        const reordered = reorder(old, targetIndex, 0);
        return reordered;
      });
      return;
    }

    if (selections.length === 0) {
      setSelections([dragging.draggableId]);
      return;
    }

    setSelections([dragging.draggableId]);
  };

  const onDragUpdate: OnDragUpdateResponder = (dragging) => {
    setDragging(dragging);
  };

  const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
    setDragging(null);
    setSelections([]);

    if (!destination) return;
    if (isEvenIndexCrossBoardDrag || isFirstToThird) return;

    if (
      source.droppableId === BOARD_ID.fisrt &&
      destination?.droppableId === BOARD_ID.third
    )
      return;

    if (source.droppableId !== destination.droppableId) {
      const srcItem = itemCollection[source.droppableId];
      const destItem = itemCollection[destination.droppableId];
      const movedItemCollection = move({
        source: {
          original: srcItem,
          droppableId: source.droppableId,
          ids: selections,
        },
        destination: {
          original: destItem,
          droppableId: destination.droppableId,
          index: destination.index,
        },
      });

      setItemCollection({
        ...itemCollection,
        ...movedItemCollection,
      });
      return;
    }

    const newItems = reorder(
      itemCollection[source.droppableId],
      source.index,
      destination.index
    );

    setItemCollection({ ...itemCollection, [source.droppableId]: newItems });
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragUpdate={onDragUpdate}
      onBeforeDragStart={controllSelectionOrder}
    >
      {children}
    </DragDropContext>
  );
}
