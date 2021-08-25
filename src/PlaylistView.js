import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePalette } from 'react-palette';
import { getPlaylistInfo, stringToLocaleDate } from './utils/spotifyutils';
import SongRow from './SongRow.js'
import TableHeader from './TableHeader.js'
import defaultPlaylistImage from "./assets/defaultplaylistimg.png";
import styles from "./PlaylistView.module.css";

export default function PlaylistView({ accessToken }) {
    const [currentPlaylist, setCurrentPlaylist] = useState();
    const { id } = useParams();
    const {data} = usePalette(currentPlaylist && currentPlaylist.images[0].url)

    useEffect(async () => {
        const _playlist = await getPlaylistInfo(accessToken, id);
        setCurrentPlaylist(_playlist);
    }, [accessToken, id])

    return(
        <div className={styles["playlist-container"]}>
            <div className={styles["playlist-heading"]} style={{background: `linear-gradient(to bottom, ${data.darkMuted}, #121212)`}}>
                <div className={styles["playlist-image"]}>
                    <img src={currentPlaylist && (currentPlaylist.images.length > 0 ? currentPlaylist.images[0].url : defaultPlaylistImage)}/>
                </div>
                <div className={styles["playlist-title"]}>
                    <h6>PLAYLIST</h6>
                    <h1>{currentPlaylist && currentPlaylist.name}</h1>
                </div>
            </div>
            <div className={styles["playlist-track-table"]}>
                <TableHeader />
                {currentPlaylist && currentPlaylist.tracks
                                                   .items
                                                   .map((item, index) => <SongRow 
                                                                            key={item.track.id}
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