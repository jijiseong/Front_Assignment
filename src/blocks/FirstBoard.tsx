import { useId } from 'react';
import { useItems } from '../store/ItemProvider';
import DroppableBoard from '../components/DroppableBoard';
import DraggableItem from '../components/DraggableItem';
import { BOARD_ID } from '../constants/dnd';
import { useDraggingState } from '../store/DraggingProvider';

export default function FirstBoard() {
  const { itemCollection } = useItems();
  const firstItems = itemCollection[BOARD_ID.fisrt];
  const { dragging, isDraggingError } = useDraggingState();

  return (
    <DroppableBoard droppableId={BOARD_ID.fisrt}>
      {firstItems.map((item, index) => (
        <DraggableItem
          key={item.id}
          error={isDraggingError && dragging?.draggableId === item.id}
          draggableId={item.id}
          index={index}
        >
          {item.content}
        </DraggableItem>
      ))}
    </DroppableBoard>
  );
}
