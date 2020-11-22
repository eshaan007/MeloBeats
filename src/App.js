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
    animationPercentage: 0,
});
const [libraryStatus, setLibraryStatus] = useState(false); 
const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  //Calculate Percentage
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation = Math.round((roundedCurrent / roundedDuration) * 100);

  setSongInfo({
    ...songInfo, 
    currentTime: current, 
    duration, 
    animationPercentage: animation,
  });
};

  return (
    <div className="App">
      {/* <h1> MeloBeats </h1> */}
      <Nav 
        libraryStatus = {libraryStatus}
        setLibraryStatus = {setLibraryStatus}
      />
      
      <Song currentSong={currentSong}/>
      
      <Player 
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying} 
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs = {songs}
        setCurrentSong = {setCurrentSong}
        setSongs = {setSongs}
      />

      <Library 
        audioRef={audioRef} 
        songs={songs} 
        setCurrentSong={setCurrentSong} 
        isPlaying={isPlaying}
        setSongs = {setSongs}
        libraryStatus = {libraryStatus}
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
