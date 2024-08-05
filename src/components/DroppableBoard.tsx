import { ReactNode, useId } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

interface Props extends Omit<DroppableProps, 'children'> {
  children: ReactNode;
}

function DroppableBoard({ children, ...props }: Props) {
  return (
    <Droppable {...props}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='bg-gray-100 w-40 rounded overflow-hidden'
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DroppableBoard;
