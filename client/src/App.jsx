import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar/Navbar';


function App() {
  return (
    <Router>
      {/* Navbar her sayfada ortak görüneceği için Routes'ın dışında durmalı */}
      <Navbar />

      {/* Sayfa içeriklerinin değişeceği alan */}
      <Routes>
        <Route path="/"/>
        <Route path="/psychologists"/>
      </Routes>
    </Router>
  );
}

export default App;