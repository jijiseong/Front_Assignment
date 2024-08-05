import './main.css';
import { createRoot } from 'react-dom/client';

import FirstBoard from './blocks/FirstBoard';
import ItemProvider from './store/ItemProvider';
import DragDropProvider from './components/DragDropProvider';
import SecondBoard from './blocks/SecondBoard';
import ThirdBoard from './blocks/ThirdBoard';
import DraggingProvider from './store/DraggingProvider';

function App() {
  return (
    <ItemProvider>
      <DraggingProvider>
        <DragDropProvider>
          <div className='flex gap-4'>
            <FirstBoard />
            <SecondBoard />
            <ThirdBoard />
          </div>
        </DragDropProvider>
      </DraggingProvider>
    </ItemProvider>
  );
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
