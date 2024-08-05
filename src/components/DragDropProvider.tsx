import { PropsWithChildren } from 'react';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { useItems } from '../store';
import { reorder } from '../utils';

export default function DragDropProvider({ children }: PropsWithChildren) {
  const { itemCollection, setItemCollection } = useItems();

  const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) return;

    const newItems = reorder(
      itemCollection[source.droppableId],
      source.index,
      destination.index
    );

    setItemCollection({ ...itemCollection, [source.droppableId]: newItems });
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}
