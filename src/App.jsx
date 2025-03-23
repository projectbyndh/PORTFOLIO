import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import First from './components/First';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            {/* <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li> */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<First />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
