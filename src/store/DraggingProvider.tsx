import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface DraggingContextType {
  dragging: string | null;
  setDragging: React.Dispatch<React.SetStateAction<string | null>>;
}

const DraggingContext = createContext<DraggingContextType | undefined>(
  undefined
);

export default function DraggingProvider({ children }: PropsWithChildren) {
  const [dragging, setDragging] = useState<string | null>(null);
  return (
    <DraggingContext.Provider value={{ dragging, setDragging }}>
      {children}
    </DraggingContext.Provider>
  );
}

export function useDraggingState() {
  const context = useContext(DraggingContext);
  if (!context) throw new Error('Dragging state context is undefined');
  return context;
}
