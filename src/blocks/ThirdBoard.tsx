import { useId } from 'react';
import { useItems } from '../store/ItemProvider';
import DroppableBoard from '../components/DroppableBoard';
import DraggableItem from '../components/DraggableItem';
import { BOARD_ID } from '../constants/dnd';
import { useDraggingState } from '../store/DraggingProvider';

export default function ThirdBoard() {
  const { itemCollection } = useItems();
  const { dragging } = useDraggingState();
  const thirdItems = itemCollection[BOARD_ID.third];
  const draggableItemId = useId();

  console.log(dragging);
  return (
    <DroppableBoard
      droppableId={BOARD_ID.third}
      isDropDisabled={dragging === BOARD_ID.fisrt}
      className={dragging === BOARD_ID.fisrt ? 'bg-red-300' : ''}
    >
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
