import React from 'react';

import Player from './Components/Player';
import Song from './Components/Song';

function App() {
  return (
    <div className="App">
      <h1> MeloBeats </h1>
      <Song />
      <Player />
    </div>
  );
}

export default App;
