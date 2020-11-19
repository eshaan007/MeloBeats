import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
    // state
    const audioRef = useRef(null);
    //event handler
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
    
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration})
    };
    
    const getTime = (time) => {
        return (
            Math.floor(time/ 60) + ":" +("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const [songInfo, setSongInfo] = useState ({
        currentTime: null,
        duration: null,
    });

    return(
        <div className="player">
            <div className="time-control">
                <p> {getTime(songInfo.currentTime)} </p>
                <input type="range" />
                <p> {getTime(songInfo.duration)} </p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
            
            <audio 
                onTimeUpdate={timeUpdateHandler} 
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef} 
                src={currentSong.audio}>
            </audio>
        </div>
    );
}

export default Player;