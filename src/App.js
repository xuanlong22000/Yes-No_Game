import React from 'react';
import LandingPage from './features/test/LandingPage/LandingPage';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import GameStart from './features/test/LandingPage/GameStart';
import AddPlayer from './features/test/LandingPage/AddPlayer';
import ListPlayer from './features/test/ListPlayer/ListPlayer';
import GameScreen from './features/test/GameScreen/GameScreen';
import Results from './features/test/Results/Results';
// import GameStart from './features/test/LandingPage/GameStart';


function App() {
  return (
    <div className="App">
      <LandingPage />
      <Router>
        <Routes>
          <Route path="/" element={<GameStart />} />
          <Route path="/addName" element={<AddPlayer />} />
          <Route path="/listPlayer" element={<ListPlayer />} />
          <Route path="/gameScreen" element={<GameScreen />} />
          <Route path="/result" element={<Results />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
