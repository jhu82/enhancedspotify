import React from 'react';
import styles from './SongRow.module.css';
import TableRow from './TableRow.js';
import TrackMainInfo from './TrackMainInfo.js';
import { useStore } from './store/SpotifyContextStore.js';
import { useEffect, useState } from 'react';
import { msToMinutes, playTrack } from './utils/spotifyutils';

export default function SongRow({ index, track, addedAt, context }) {

    const [{ accessToken, currentTrack }] = useStore();
    const [className, setClassName] = useState("song-row");

    useEffect(() => {
        if (!currentTrack || !track) return;
        if (currentTrack.id === track.id || currentTrack.linked_from.id === track.id) {
            setClassName("song-row-current-track");
        } else {
            setClassName("song-row");
        }
    }, [currentTrack, track])

    return (
        <div className={styles[className]} onDoubleClick={() => playTrack(accessToken, context, index - 1)}>
            <TableRow
                cell1={<p>{index}</p>}
                cell2={
                    <TrackMainInfo 
                        imgSRC={track && track.album.images[0].url}
                        trackName={track && track.name}
                        artists={track && track.artists.map(artist => artist.name).join(", ")}
                    />
                }
                cell3={<p>{track && track.album.name}</p>}
                cell4={<p>{addedAt}</p>}
                cell5={<p>{track && msToMinutes(track.duration_ms)}</p>}
            />
        </div>
    )
}