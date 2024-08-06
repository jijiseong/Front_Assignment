import { ReactNode } from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';
import { ITEM_BG_CLASS } from '../constants/color';
import cn from '../utils/cn';
import { ItemType } from '../type';
import { useSelections } from '../store/SelectionsProvider';
import { useDraggingState } from '../store/DraggingProvider';

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
  const { selections, setSelections } = useSelections();
  const { dragging } = useDraggingState();

  const getSelectedClass = (itemId: string) => {
    const selected = selections.find((id) => id === itemId);
    if (selected && dragging?.draggableId !== selected) {
      return 'border-2 border-blue-500 bg-blue-200';
    }
    if (selected) {
      return 'border-2 border-blue-500';
    }
    return '';
  };

  const controllSelection = () => {
    setSelections((old) => {
      const oldIds = old.map((id) => id);
      if (oldIds.includes(props.draggableId)) {
        return old.filter((id) => id !== props.draggableId);
      }
      return [...old, props.draggableId];
    });
  };

  return (
    <Draggable {...props}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'flex justify-center items-center rounded mb-2 h-[40px]',
            snapshot.isDragging
              ? error
                ? ITEM_BG_CLASS.error
                : ITEM_BG_CLASS.active
              : ITEM_BG_CLASS.default,
            getSelectedClass(props.draggableId),
            className
          )}
          onClick={controllSelection}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
