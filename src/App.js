import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import MintPage from './pages/MintPage/MintPage';
import WalletsPage from './pages/WalletsPage/WalletsPage';
import ProfilesPage from './pages/ProfilesPage/ProfilesPage';

import './App.css';

export default function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<MintPage />} />
        <Route path="/wallets" element={<WalletsPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
      </Routes>
    </>
  );
}