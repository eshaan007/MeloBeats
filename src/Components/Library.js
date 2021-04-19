import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({
    audioRef, 
    songs, 
    setCurrentSong, 
    isPlaying, 
    setSongs, 
    libraryStatus
}) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong 
                        songs = {songs}
                        cover = {song.cover}
                        name = {song.name}
                        artist = {song.artist}
                        active = {song.active}
                        setCurrentSong = {setCurrentSong} 
                        id = {song.id}
                        key = {song.id}
                        audioRef = {audioRef}
                        isPlaying={isPlaying}
                        setSongs = {setSongs}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;