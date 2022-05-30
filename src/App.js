import './css/style.css';
import Board from './components/Board';
import {useState} from 'react';

function App() {
  const [board, setBoard] = useState([]);
  const [cells, setCells] = useState([]);

  return (
    <div className="App">
      <Board />
      <button>Start</button>
    </div>
  );
}

export default App;
