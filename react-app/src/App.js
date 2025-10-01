import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStarted from './components/GetStarted';
import Home from './components/Home';  // Ensure Home component is imported
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} /> {/* This is your Get Started page */}
        <Route path="/home" element={<Home />} /> {/* Add this route for Home */}
        
      </Routes>
    </Router>
  );
}

export default App;
