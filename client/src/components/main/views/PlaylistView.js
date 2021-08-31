import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../utils/useFetch';
import { useStore } from '../../../store/SpotifyContextStore';
import SongRow from '../SongRow'
import TableHeader from '../TableHeader'
import TableView from './TableView';
import { playTrackFromContext, stringToLocaleDate } from '../../../utils/spotifyutils';
import defaultPlaylistImage from "../../../assets/defaultplaylistimg.png";

export default function PlaylistView() {

    const [{accessToken}] = useStore();
    const { id } = useParams();
    const URL = `https://api.spotify.com/v1/playlists/${id}`
    const currentPlaylist = useFetch(URL);

    return(
        <TableView 
            image={currentPlaylist && (currentPlaylist.images.length > 0 ? currentPlaylist.images[0].url : defaultPlaylistImage)}
            title={currentPlaylist && currentPlaylist.name}
            tableHeader={<TableHeader />}
            tracks={currentPlaylist && currentPlaylist.tracks.items.map((item, index) => <SongRow 
                                                                                            key={item.track.id}
                                                                                            track={item.track} 
                                                                                            index={index + 1} 
                                                                                            addedAt={stringToLocaleDate(item.added_at)} 
                                                                                            handleDoubleClick={() => playTrackFromContext(accessToken, `spotify:playlist:${id}`, index)}
                                                                                          />)}
        />
    )
}