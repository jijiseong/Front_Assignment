import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { ItemType } from '../type';
import { BOARD_ID } from '../constants/dnd-id';

type ItemCollectionType = Record<string, ItemType[]>;

interface ItemContextType {
  itemCollection: ItemCollectionType;
  setItemCollection: Dispatch<React.SetStateAction<ItemCollectionType>>;
}

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const initialState: ItemCollectionType = {
  [BOARD_ID.fisrt]: getItems(10),
  [BOARD_ID.second]: getItems(10),
  [BOARD_ID.third]: getItems(10),
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export default function ItemProvider({ children }: PropsWithChildren) {
  const [itemCollection, setItemCollection] = useState(initialState);
  return (
    <ItemContext.Provider value={{ itemCollection, setItemCollection }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  if (!context) throw new Error();
  return context;
}
