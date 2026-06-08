import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import PsychologistsPage from './pages/PsychologistsPage/PsychologistsPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';


function App() {
  return (
    <Router>
      {/* Navbar her sayfada ortak görüneceği için Routes'ın dışında olacak */}
      <Navbar />
      
      <Routes>
        {/* Sayfa içeriklerinin değişeceği alan */}
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
          
      </Routes>
    </Router>
  );
}

export default App;