import React, { useState, useEffect } from 'react';
import { stringToLocaleDate } from './utils/spotifyutils';
import useFetch from './useFetch.js';
import SongRow from './SongRow.js'
import TableHeader from './TableHeader.js'
import recentTracksCover from './assets/recenttrackscover.png';
import TableView from './TableView.js';

export default function RecentTracksView() {

    const { items: _currentPlaylist } = useFetch("https://api.spotify.com/v1/me/player/recently-played", {limit: 50, offset: 0}) || {};
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
                                                                                context={"recent"}
                                                                            />)}
        />   
    )
}