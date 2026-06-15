import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import PsychologistsPage from './pages/PsychologistsPage/PsychologistsPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

function App() {
  return (
    <>
      {/* Kapsayıcı olarak içi boş fragment bıraktık */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;