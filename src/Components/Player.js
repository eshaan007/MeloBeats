import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlay, 
    faAngleLeft, 
    faAngleRight,
    faPause,
    faVolumeDown
} from "@fortawesome/free-solid-svg-icons";

import { playAudio } from "../util";

const Player = ({ 
    songInfo, 
    setSongInfo, 
    audioRef, 
    currentSong, 
    isPlaying, 
    setIsPlaying, 
    songs,
    setCurrentSong,
    setSongs
    }) => {
    // state
    const [activeVolume, setActiveVolume] = useState(false);        

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id){
                return{
                    ...song,
                    active: true,
                };
            } else {
              return {
                    ...song,
                    active: false,
                };
            }
        });
      setSongs(newSongs);
    }
    //event handler

    //Play Pause Functionality
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying); // On - Off
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    function getTime(time) {
        return (
            Math.floor(time/ 60) + ":" +("0" + Math.floor(time % 60)).slice(-2)
        )
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };
 
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        //skip forward and back
        if(direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if(direction ==='skip-back') {
            if((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        playAudio(isPlaying, audioRef);
    };

    const changeVolume = (e) => {
        let value = e.target.value;
        audioRef.current.volume = value;
        setSongInfo({ ...songInfo, volume: value });
    };

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };

    return(
        <div className="player">
            <div className="time-control">
                <p> {getTime(songInfo.currentTime)} </p> 
                <div 
                    style={{
                        background: `linear-gradient(to right, 
                        ${currentSong.color[0]}, 
                        ${currentSong.color[1]})`
                    }} 
                    className="track"
                >
                    <input 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        onChange={dragHandler}
                        type="range"
                    />
                    <div style={trackAnim} className="animate-track"></div>  
                </div>
                <p> {songInfo.duration ? getTime(songInfo.duration) : "0:00"} </p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-back')} 
                    className="skip-back" 
                    size="2x" 
                    icon={faAngleLeft} 
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-forward')} 
                    className="skip-forward" 
                    size="2x" 
                    icon={faAngleRight} 
                />
                <FontAwesomeIcon
                    onClick={() => setActiveVolume(!activeVolume)}
                    icon={faVolumeDown}
                />
                {activeVolume && (
                    <input
                        onChange={changeVolume}
                        value={songInfo.volume}
                        max="1"
                        min="0"
                        step="0.01"
                        type="range"
                    />
                )}
            </div>
        </div>
    );
};

export default Player;