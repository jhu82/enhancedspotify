import React from 'react';
import styles from './SongRow.module.css';
import TableRow from './TableRow.js';
import TrackMainInfo from './TrackMainInfo.js';
import { msToMinutes } from './utils/spotifyutils';

export default function SongRow({ index, track, addedAt }) {
    return (
        <div className={styles["song-row"]}>
            <TableRow
                cell1={
                    <p>{index}</p>
                }
                cell2={
                    <TrackMainInfo 
                        imgSRC={track && track.album.images[0].url}
                        trackName={track && track.name}
                        artists={track && track.artists.map(artist => artist.name).join(", ")}
                    />
                }
                cell3={
                    <p>{track && track.album.name}</p>
                }
                cell4={
                    <p>{addedAt}</p>
                }
                cell5={
                    <p>{track && msToMinutes(track.duration_ms)}</p>
                }
            />
        </div>
    )
}