import { useId } from 'react';
import { useItems } from '../store';
import DroppableBoard from '../components/DroppableBoard';
import DraggableItem from '../components/DraggableItem';
import { BOARD_ID } from '../constants/dnd-id';

export default function SecondBoard() {
  const { itemCollection } = useItems();
  const secondItems = itemCollection[BOARD_ID.second];
  const draggableItemId = useId();

  return (
    <DroppableBoard droppableId={BOARD_ID.second}>
      {secondItems.map((item, index) => (
        <DraggableItem
          key={item.id}
          draggableId={`${draggableItemId} ${item.id}`}
          index={index}
        >
          {item.content}
        </DraggableItem>
      ))}
    </DroppableBoard>
  );
}
