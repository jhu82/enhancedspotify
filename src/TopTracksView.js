import React from 'react';
import useFetch from './useFetch.js';
import SongRow from './SongRow.js'
import TableHeader from './TableHeader.js'
import topTracksCover from "./assets/toptrackscover.png";
import TableView from './TableView.js';

export default function TopTracksView() {

    const { items: currentPlaylist } = useFetch("https://api.spotify.com/v1/me/top/tracks", {time_range: "short_term", limit: 50, offset: 0}) || {};
    
    return(
        <TableView 
            image={topTracksCover}
            title="Your Hottest Tracks"
            tableHeader={<TableHeader withoutDate={true} />}
            tracks={currentPlaylist && currentPlaylist.map((item, index) => <SongRow 
                                                                                key={item.id}
                                                                                track={item} 
                                                                                index={index + 1} 
                                                                                context={"top"}
                                                                            />)}
        />   
    )
}