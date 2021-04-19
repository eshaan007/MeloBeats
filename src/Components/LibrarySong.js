import React from 'react';

const LibrarySong = ({ 
    name,
    artist,
    cover,
    active,
    songs , 
    setCurrentSong, 
    id, 
    audioRef, 
    isPlaying, 
    setSongs
}) => {

    const songSelectHandler = async () => {
        const selectedSong = songs.filter((state) => state.id === id);
        setCurrentSong({...selectedSong[0] });
        //add active state
        const newSongs = songs.map((song) => {
            if(song.id === id){
                return{
                    ...song,
                    active: true,
                }
            }else{
                return{
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
        //song is playing
        playAudio(isPlaying, audioRef);
    };
    return(
        <div 
            onClick={songSelectHandler} 
            className={`library-song ${active ? 'selected' : ""}`}
        >
            <img src={cover} alt="" />
            <div className="song-description">
                <h3> {name} </h3>
                <h4> {artist} </h4>
            </div>
        </div>
    );
}

export default LibrarySong;