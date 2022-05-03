import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MintPage from './pages/MintPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MintPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
