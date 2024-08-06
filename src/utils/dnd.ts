import { ItemType } from '../type';

export const reorder = <T>(
  list: Array<T>,
  sourceIndex: number,
  destinationIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);
  return result;
};

export const move = ({
  source,
  destination,
}: {
  source: {
    original: ItemType[];
    droppableId: string;
    ids: string[];
  };
  destination: {
    original: ItemType[];
    droppableId: string;
    index: number;
  };
}) => {
  const destClone = Array.from(destination.original);

  const idsToRemove = source.ids;
  const filteredSource = source.original.filter(
    ({ id }) => !idsToRemove.includes(id)
  );

  const sourceToMove = idsToRemove
    .map((id) => {
      const findedItem = source.original.find((item) => item.id === id);
      return findedItem;
    })
    .filter((item) => !!item);

  destClone.splice(destination.index, 0, ...sourceToMove);

  const result = {
    [source.droppableId]: filteredSource,
    [destination.droppableId]: destClone,
  };

  console.log(result);

  return result;
};
