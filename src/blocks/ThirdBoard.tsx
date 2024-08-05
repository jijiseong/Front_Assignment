import { useItems } from '../store/ItemProvider';
import DroppableBoard from '../components/DroppableBoard';
import DraggableItem from '../components/DraggableItem';
import { BOARD_ID } from '../constants/dnd';
import { useDraggingState } from '../store/DraggingProvider';
import { BOARD_BG_CLASS } from '../constants/color';

export default function ThirdBoard() {
  const { itemCollection } = useItems();
  const { dragging, isDraggingError, isFirstToThird } = useDraggingState();
  const thirdItems = itemCollection[BOARD_ID.third];

  return (
    <DroppableBoard
      droppableId={BOARD_ID.third}
      className={isFirstToThird ? BOARD_BG_CLASS.error : ''}
    >
      {thirdItems.map((item, index) => (
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
