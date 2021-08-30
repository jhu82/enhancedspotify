import React from 'react';
import { playTrackFromURI, stringToLocaleDate } from './utils/spotifyutils';
import useFetch from './utils/useFetch';
import { useStore } from './store/SpotifyContextStore';
import SongRow from './SongRow'
import TableHeader from './TableHeader'
import TableView from './TableView';
import favoriteTracksCover from "./assets/favoritetrackscover.png";

export default function LikedTracksView() {

    const [{ accessToken }] = useStore();
    const URL = "https://api.spotify.com/v1/me/tracks";
    const { items: currentPlaylist } = useFetch(URL, {limit: 50, offset: 0}) || {};
    
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
                                                                                handleDoubleClick={() => playTrackFromURI(accessToken, [item.track.uri], 0)}
                                                                            />)}
        />   
    )
}