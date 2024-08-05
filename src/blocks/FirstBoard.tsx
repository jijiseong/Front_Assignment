import { useId } from 'react';
import { useItems } from '../store';
import DroppableBoard from '../components/DroppableBoard';
import DraggableItem from '../components/DraggableItem';
import { BOARD_ID } from '../constants/dnd-id';

export default function FirstBoard() {
  const { itemCollection } = useItems();
  const firstItems = itemCollection[BOARD_ID.fisrt];
  const draggableItemId = useId();

  return (
    <DroppableBoard droppableId={BOARD_ID.fisrt}>
      {firstItems.map((item, index) => (
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
