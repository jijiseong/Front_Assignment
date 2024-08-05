import { useItems } from '../store/ItemProvider';
import DroppableBoard from '../components/DroppableBoard';
import DraggableItem from '../components/DraggableItem';
import { BOARD_ID } from '../constants/dnd';
import { useDraggingState } from '../store/DraggingProvider';

export default function SecondBoard() {
  const { itemCollection } = useItems();
  const { dragging, isDraggingError } = useDraggingState();
  const secondItems = itemCollection[BOARD_ID.second];

  return (
    <DroppableBoard droppableId={BOARD_ID.second}>
      {secondItems.map((item, index) => (
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
