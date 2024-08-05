import { PropsWithChildren } from 'react';
import {
  DragDropContext,
  OnDragEndResponder,
  OnDragStartResponder,
} from 'react-beautiful-dnd';
import { useItems } from '../store/ItemProvider';
import { reorder } from '../utils';
import { BOARD_ID } from '../constants/dnd';
import { useDraggingState } from '../store/DraggingProvider';

export default function DragDropProvider({ children }: PropsWithChildren) {
  const { itemCollection, setItemCollection } = useItems();
  const { dragging, setDragging } = useDraggingState();

  const onDragStart: OnDragStartResponder = ({ source }) => {
    setDragging(source.droppableId);
  };

  const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
    setDragging(null);

    if (!destination) return;

    if (
      source.droppableId === BOARD_ID.fisrt &&
      destination.droppableId === BOARD_ID.third
    )
      return;

    if (source.droppableId !== destination.droppableId) {
      const srcItem = itemCollection[source.droppableId];
      const target = srcItem[source.index];
      const destItem = itemCollection[destination.droppableId];

      const newSrcItem = srcItem.filter((item) => item !== target);
      const newDestItem = [
        ...destItem.slice(0, destination.index),
        target,
        ...destItem.slice(destination.index),
      ];
      setItemCollection({
        ...itemCollection,
        [source.droppableId]: newSrcItem,
        [destination.droppableId]: newDestItem,
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
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {children}
    </DragDropContext>
  );
}
