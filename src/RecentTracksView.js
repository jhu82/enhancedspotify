import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { useStore } from './store/SpotifyContextStore';
import SongRow from './SongRow'
import TableHeader from './TableHeader'
import TableView from './TableView'; 
import { playTrackFromURI } from './utils/spotifyutils';
import recentTracksCover from './assets/recenttrackscover.png';

export default function RecentTracksView() {

    const [{ accessToken }] = useStore();
    const URL = "https://api.spotify.com/v1/me/player/recently-played";
    const { items: _currentPlaylist } = useFetch(URL, {limit: 50, offset: 0}) || {};
    const [currentPlaylist, setCurrentPlaylist] = useState();

    //Filter out repeating tracks
    useEffect(() => {
        if (!_currentPlaylist) return;
        const set = new Set();
        setCurrentPlaylist(_currentPlaylist.filter(item => 
            {return set.has(item.track.id) ? false : set.add(item.track.id);}
        ));
    }, [_currentPlaylist])

    return(
        <TableView 
            image={recentTracksCover}
            title="Recently Played"
            tableHeader={<TableHeader withoutDate={true} />}
            tracks={currentPlaylist && currentPlaylist.map((item, index) => <SongRow 
                                                                                key={item.track.id}
                                                                                track={item.track} 
                                                                                index={index + 1} 
                                                                                handleDoubleClick={() => playTrackFromURI(accessToken, [item.track.uri], 0)}
                                                                            />)}
        />   
    )
}