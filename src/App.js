import React, { useState, useRef } from 'react';
import './styles/App.scss';
// importing components
import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library';
import Nav from './Components/Nav';
// importing data
import chillhop from './data';
// util 
import { playAudio } from './util';

function App() {

  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(chillhop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState ({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
});
const [libraryStatus, setLibraryStatus] = useState(false); 

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  //Calculate Percentage
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const percentage = Math.round((roundedCurrent / roundedDuration) * 100);

  setSongInfo({
    ...songInfo, 
    currentTime: current, 
    duration: duration, 
    animationPercentage: percentage,
    volume: e.target.volume,
  });
};

const songEndHandler = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  // activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
  playAudio(isPlaying, audioRef);
};

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav 
        libraryStatus = {libraryStatus}
        setLibraryStatus = {setLibraryStatus}
      />
      
      <Song isPlaying={isPlaying} currentSong={currentSong}/>
      
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
        src={currentSong.audio}
        onEnded ={songEndHandler}
      ></audio>
      {/* <h4 className="footer"> Made with <a className="heart" href=' '>❤️️</a> by EK </h4> */}
    </div>
  );
};

export default App;
