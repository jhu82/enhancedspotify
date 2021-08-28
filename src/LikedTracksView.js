import React from 'react';
import { stringToLocaleDate } from './utils/spotifyutils';
import useFetch from './useFetch.js';
import SongRow from './SongRow.js'
import TableHeader from './TableHeader.js'
import favoriteTracksCover from "./assets/favoritetrackscover.png";
import TableView from './TableView.js';

export default function LikedTracksView() {

    const { items: currentPlaylist } = useFetch("https://api.spotify.com/v1/me/tracks", {limit: 50, offset: 0}) || {};
    
    return(
        <TableView 
            image={favoriteTracksCover}
            title="Liked Songs"
            tableHeader={<TableHeader />}
            tracks={currentPlaylist && currentPlaylist.map((item, index) => <SongRow 
                                                                                key={item.track.id}
                                                                                track={item.track} 
                                                                                index={index + 1}
                                                                                addedAt={stringToLocaleDate(item.added_at)}
                                                                                context={"favorites"}
                                                                            />)}
        />   
    )
}