import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import styles from './LyricsSidebar.module.css'

export default function LyricsSidebar({ trackURI, artist, trackName }) {

    const [lyrics, setLyrics] = useState("");

    useEffect(() => {
        if (!trackURI) return;
        const query = {
            artist: artist,
            song: trackName
        }
        axios.post('http://localhost:8000/lyrics', query)
             .then(response => setLyrics(response.data))
             .catch(e => console.log(e));
    }, [trackURI]);

    //Remove featured artist names from title to avoid crowding space
    const removeFeaturedArtists = trackTitle => {
        const re = /\(feat|\(Feat|\(with|\(With| - /;
        if (trackTitle.search(re) !== -1) {
            const index = trackTitle.search(re);
            return trackTitle.substring(0, index);
        } else {
            return trackTitle;
        }
    }

    return (
        <div className={styles['lyrics-sidebar']}>
            <h1>{artist}</h1>
            <h1>{trackName && removeFeaturedArtists(trackName)}</h1>
            <div>{parse(lyrics)}</div>
        </div>
    )
}