import React, { useState, useEffect } from 'react';
import { useStore } from '../../../store/SpotifyContextStore';
import SongRow from '../SongRow';
import { search, playTrackFromURI } from '../../../utils/spotifyutils';
import styles from './SearchView.module.css'

export default function SearchView() {
    const [{ accessToken }] = useStore();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState();

    useEffect(async () => {
        if (!accessToken || !query) {
            setResults("");
        } else {
            const _results = await search(accessToken, query, "track");
            setResults(_results);
        }
    }, [accessToken, query])
    return(
        <div className={styles["search-view"]}>
            <input type="text" 
                    placeholder="Search tracks" 
                    value={query}
                    onChange={e => setQuery(e.target.value)} />
            {results && results.tracks.items.map((item, index) => <SongRow 
                                                                        key={item.id}
                                                                        track={item} 
                                                                        index={index + 1} 
                                                                        handleDoubleClick={() => playTrackFromURI(accessToken, [item.uri], 0)}
                                                                    />)}
        </div>
    )
}