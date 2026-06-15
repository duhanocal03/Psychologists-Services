import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import PsychologistsPage from './pages/PsychologistsPage/PsychologistsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
      </Routes>
    </Router>
  );
}

export default App;