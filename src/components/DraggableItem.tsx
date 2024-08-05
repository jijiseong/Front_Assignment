import { ReactNode } from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';

interface Props extends Omit<DraggableProps, 'children'> {
  children: ReactNode;
}

function DraggableItem({ children, ...props }: Props) {
  return (
    <Draggable {...props}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-blue-100 flex justify-center items-center rounded py-6 mb-2 h-[40px] ${
            snapshot.isDragging ? 'bg-blue-300' : 'bg-gray-100'
          }`}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
