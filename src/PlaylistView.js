import React from 'react';
import { useParams } from 'react-router-dom';
import { stringToLocaleDate } from './utils/spotifyutils';
import useFetch from './useFetch.js';
import SongRow from './SongRow.js'
import TableHeader from './TableHeader.js'
import defaultPlaylistImage from "./assets/defaultplaylistimg.png";
import TableView from './TableView.js';

export default function PlaylistView() {

    const { id } = useParams();
    const currentPlaylist = useFetch(`https://api.spotify.com/v1/playlists/${id}`);

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
                                                                                            context={`spotify:playlist:${id}`}
                                                                                          />)}
        />
    )
}