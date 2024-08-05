import { ReactNode } from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';
import { ITEM_BG_CLASS } from '../constants/color';

interface Props extends Omit<DraggableProps, 'children'> {
  children: ReactNode;
  className?: string;
  error?: boolean;
}

function DraggableItem({
  error = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <Draggable {...props}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex justify-center items-center rounded py-6 mb-2 h-[40px] ${
            snapshot.isDragging
              ? error
                ? ITEM_BG_CLASS.error
                : ITEM_BG_CLASS.active
              : ITEM_BG_CLASS.default
          } `}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
