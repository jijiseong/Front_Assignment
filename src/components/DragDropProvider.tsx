import { PropsWithChildren } from 'react';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { useItems } from '../store';
import { reorder } from '../utils';

export default function DragDropProvider({ children }: PropsWithChildren) {
  const { itemCollection, setItemCollection } = useItems();

  const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
    if (!destination) return;

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

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}
