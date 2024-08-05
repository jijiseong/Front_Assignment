import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { DragStart, DragUpdate } from 'react-beautiful-dnd';
import { BOARD_ID } from '../constants/dnd';

interface DraggingContextType {
  dragging: DragUpdate | null;
  setDragging: React.Dispatch<React.SetStateAction<DragUpdate | null>>;
}

const DraggingContext = createContext<DraggingContextType | undefined>(
  undefined
);

export default function DraggingProvider({ children }: PropsWithChildren) {
  const [dragging, setDragging] = useState<DragUpdate | null>(null);
  return (
    <DraggingContext.Provider value={{ dragging, setDragging }}>
      {children}
    </DraggingContext.Provider>
  );
}

export function useDraggingState() {
  const context = useContext(DraggingContext);
  if (!context) throw new Error('Dragging state context is undefined');

  const { dragging } = context;
  const isEvenIndexCrossBoardDrag =
    (!!dragging &&
      (dragging.source.index + 1) % 2 === 0 &&
      !!dragging.destination &&
      dragging.destination.index % 2 === 0 &&
      dragging.destination.droppableId !== dragging.source.droppableId) ||
    false;

  const isFirstToThird =
    dragging?.source.droppableId === BOARD_ID.fisrt &&
    dragging?.destination?.droppableId === BOARD_ID.third;

  const isDraggingError = isEvenIndexCrossBoardDrag || isFirstToThird;

  return {
    ...context,
    isEvenIndexCrossBoardDrag,
    isFirstToThird,
    isDraggingError,
  };
}
