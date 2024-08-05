import { useId } from 'react';
import { useItems } from '../store';
import DroppableBoard from '../components/DroppableBoard';
import DraggableItem from '../components/DraggableItem';
import { BOARD_ID } from '../constants/dnd-id';

export default function ThirdBoard() {
  const { itemCollection } = useItems();
  const thirdItems = itemCollection[BOARD_ID.third];
  const draggableItemId = useId();

  return (
    <DroppableBoard droppableId={BOARD_ID.third}>
      {thirdItems.map((item, index) => (
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
