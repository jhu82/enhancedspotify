import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import styles from './LyricsSidebar.module.css'

export default function LyricsSidebar({ currentTrack }) {

    const [lyrics, setLyrics] = useState("");

    useEffect(() => {
        if (!currentTrack) return;
        const query = {
            artist: currentTrack.artists[0].name,
            song: currentTrack.name
        }
        axios.post('http://localhost:8000/lyrics', query)
             .then(response => setLyrics(response.data))
             .catch(e => console.log(e));
    }, [currentTrack]);

    return (
        <div id={styles['lyrics-sidebar']}>
            <h1>{currentTrack && currentTrack.artists[0].name}</h1>
            <h1>{currentTrack && currentTrack.name}</h1>
            <div>{parse(lyrics)}</div>
        </div>
    )
}