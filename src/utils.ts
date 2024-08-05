import { DraggableLocation } from 'react-beautiful-dnd';
import { ItemType } from './type';

export const reorder = (
  list: ItemType[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const move = ({
  source,
  destination,
  droppableSource,
  droppableDestination,
}: {
  source: ItemType[];
  destination: ItemType[];
  droppableSource: DraggableLocation;
  droppableDestination: DraggableLocation;
}) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {
    [droppableSource.droppableId]: sourceClone,
    [droppableDestination.droppableId]: destClone,
  };

  return result;
};
