import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MintPage from './pages/MintPage';

import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MintPage />} />
      </Routes>
    </div>
  );
}

export default App;
