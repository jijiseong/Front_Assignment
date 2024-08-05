import './main.css';
import { createRoot } from 'react-dom/client';

import FirstBoard from './blocks/FirstBoard';
import ItemProvider from './store';
import DragDropProvider from './components/DragDropProvider';
import SecondBoard from './blocks/SecondBoard';
import ThirdBoard from './blocks/ThirdBoard';

function App() {
  return (
    <ItemProvider>
      <DragDropProvider>
        <div className='flex gap-4'>
          <FirstBoard />
          <SecondBoard />
          <ThirdBoard />
        </div>
      </DragDropProvider>
    </ItemProvider>
  );
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
