import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { ItemType } from '../type';

interface SelectionsContextType {
  selections: ItemType['id'][];
  setSelections: Dispatch<React.SetStateAction<ItemType['id'][]>>;
}

const initialState: ItemType['id'][] = [];

const SelectionsContext = createContext<SelectionsContextType | undefined>(
  undefined
);

export default function SelectionsProvider({ children }: PropsWithChildren) {
  const [selections, setSelections] = useState(initialState);
  return (
    <SelectionsContext.Provider value={{ selections, setSelections }}>
      {children}
    </SelectionsContext.Provider>
  );
}

export function useSelections() {
  const context = useContext(SelectionsContext);
  if (!context) throw new Error();
  return context;
}
