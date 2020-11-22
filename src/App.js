import React, {useState} from 'react';
import './styles/App.scss';

import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library';
import data from './data';

function App() {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[2]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      {/* <h1> MeloBeats </h1> */}
      <Song currentSong={currentSong}/>
      <Player 
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying} 
        currentSong={currentSong}
      />
      <Library songs={songs}/>
    </div>
  );
}

export default App;
