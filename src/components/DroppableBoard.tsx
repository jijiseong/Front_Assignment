import { ReactNode, useId } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

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
            className={`h-min bg-gray-100 w-40 px-2 py-4 rounded overflow-hidden ${
              className ? className : ''
            }`}
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
