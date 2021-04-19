import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ setLibraryStatus, libraryStatus }) => {
    const openLibraryHandler = () => {
        setLibraryStatus(!libraryStatus);
    };

    return(
        <nav>
            <h1>MeloBeats</h1>
            <button 
                className= {libraryStatus ? "library-active" : ""}
                onClick={openLibraryHandler}
            >
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    );
}

export default Nav;