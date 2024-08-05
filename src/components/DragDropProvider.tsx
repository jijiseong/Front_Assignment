import { PropsWithChildren } from 'react';
import {
  DragDropContext,
  OnDragEndResponder,
  OnDragStartResponder,
  OnDragUpdateResponder,
} from 'react-beautiful-dnd';
import { useItems } from '../store/ItemProvider';
import { move, reorder } from '../utils';
import { useDraggingState } from '../store/DraggingProvider';
import { BOARD_ID } from '../constants/dnd';

export default function DragDropProvider({ children }: PropsWithChildren) {
  const { itemCollection, setItemCollection } = useItems();
  const { setDragging, isEvenIndexCrossBoardDrag, isFirstToThird } =
    useDraggingState();

  const onDragStart: OnDragStartResponder = (dragging) => {};

  const onDragUpdate: OnDragUpdateResponder = (dragging) => {
    setDragging(dragging);
  };

  const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
    setDragging(null);

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
        source: srcItem,
        destination: destItem,
        droppableDestination: destination,
        droppableSource: source,
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
      onDragStart={onDragStart}
    >
      {children}
    </DragDropContext>
  );
}
