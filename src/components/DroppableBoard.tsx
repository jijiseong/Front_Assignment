import { ReactNode } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import { useDraggingState } from '../store/DraggingProvider';
import { BOARD_BG_CLASS } from '../constants/color';

interface Props extends Omit<DroppableProps, 'children'> {
  className?: string;
  children: ReactNode;
}

function DroppableBoard({ children, className, ...props }: Props) {
  return (
    <Droppable {...props}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`h-min  w-40 px-2 py-4 rounded overflow-hidden ${BOARD_BG_CLASS.default}`}
          >
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}

export default DroppableBoard;
