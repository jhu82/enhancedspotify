import React from 'react';
import useFetch from '../../../utils/useFetch';
import { useStore } from '../../../store/SpotifyContextStore';
import SongRow from '../SongRow'
import TableView from './TableView';
import TableHeader from '../TableHeader'
import { playTrackFromURI } from '../../../utils/spotifyutils';
import topTracksCover from "../../../assets/toptrackscover.png";


export default function TopTracksView() {

    const [{ accessToken }] = useStore();
    const URL = "https://api.spotify.com/v1/me/top/tracks";
    const { items: currentPlaylist } = useFetch(URL, {time_range: "short_term", limit: 50, offset: 0}) || {};

    return(
        <TableView 
            image={topTracksCover}
            title="Your Hottest Tracks"
            tableHeader={<TableHeader withoutDate={true} />}
            tracks={currentPlaylist && currentPlaylist.map((item, index) => <SongRow 
                                                                                key={item.id}
                                                                                track={item} 
                                                                                index={index + 1} 
                                                                                handleDoubleClick={() => playTrackFromURI(accessToken, [item.uri], 0)}
                                                                            />)}
        />   
    )
}