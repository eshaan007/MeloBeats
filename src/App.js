import React, {useState, useRef} from 'react';
import './styles/App.scss';

import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library';
import data from './data';
import Nav from './Components/Nav';

function App() {

  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState ({
    currentTime: 0,
    duration: 0,
});

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({...songInfo, currentTime: current, duration})
};

  return (
    <div className="App">
      {/* <h1> MeloBeats </h1> */}
      <Nav />
      <Song currentSong={currentSong}/>
      
      <Player 
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying} 
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />

      <Library 
        audioRef={audioRef} 
        songs={songs} 
        setCurrentSong={setCurrentSong} 
        isPlaying={isPlaying}
        setSongs = {setSongs}
      />
      
      <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef} 
        src={currentSong.audio}>
      </audio>
    </div>
  );
}

export default App;
