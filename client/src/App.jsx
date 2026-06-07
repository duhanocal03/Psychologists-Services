import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';


function App() {
  return (
    <Router>
      {/* Navbar her sayfada ortak görüneceği için Routes'ın dışında durmalı */}
      <Navbar />
      <HomePage />

      {/* Sayfa içeriklerinin değişeceği alan */}
      <Routes>
        <Route path="/"/>
        <Route path="/psychologists"/>
      </Routes>
    </Router>
  );
}

export default App;