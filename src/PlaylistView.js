import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistInfo, stringToLocaleDate } from './utils/spotifyutils';
import SongRow from './SongRow.js'
import TableHeader from './TableHeader.js'
import defaultPlaylistImage from "./assets/defaultplaylistimg.png";

export default function PlaylistView({ accessToken }) {
    const [currentPlaylist, setCurrentPlaylist] = useState();
    const { id } = useParams();

    useEffect(async () => {
        const _playlist = await getPlaylistInfo(accessToken, id);
        setCurrentPlaylist(_playlist);
    }, [accessToken, id])

    return(
        <div>
            <img src={currentPlaylist && (currentPlaylist.images.length > 0 ? currentPlaylist.images[0].url : defaultPlaylistImage)}
                      width="250" 
                      height="250" 
            />
            <div>
                <TableHeader />
                {currentPlaylist && currentPlaylist.tracks.items.map((item, index) => <SongRow 
                                                                                               accessToken={accessToken}
                                                                                               track={item.track} 
                                                                                               index={index + 1} 
                                                                                               addedAt={stringToLocaleDate(item.added_at)} 
                                                                                               context={`spotify:playlist:${id}`}
                                                                                        />)}
            </div>
        </div>
    )
}