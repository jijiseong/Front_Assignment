import './main.css';
import { createRoot } from 'react-dom/client';

import FirstBoard from './blocks/FirstBoard';
import ItemProvider from './store/ItemProvider';
import DragDropPresence from './components/DragDropPresence';
import SecondBoard from './blocks/SecondBoard';
import ThirdBoard from './blocks/ThirdBoard';
import DraggingProvider from './store/DraggingProvider';
import SelectionsProvider from './store/SelectionsProvider';

function App() {
  return (
    <ItemProvider>
      <SelectionsProvider>
        <DraggingProvider>
          <DragDropPresence>
            <div className='flex gap-4'>
              <FirstBoard />
              <SecondBoard />
              <ThirdBoard />
            </div>
          </DragDropPresence>
        </DraggingProvider>
      </SelectionsProvider>
    </ItemProvider>
  );
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
