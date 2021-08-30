import React from 'react';
import useFetch from './utils/useFetch';
import styles from './UserPlaylists.module.css';
import { Link } from 'react-router-dom';

export default function UserPlaylists() {

    const {items: playlists} = useFetch("https://api.spotify.com/v1/me/playlists", {limit: 50, offset: 0}) || {};
    
    return (
        <div className={styles["user-playlists"]}>
            {playlists && playlists.map(playlist => <div key={playlist.id} className={styles["playlist-row"]}>
                                                        <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
                                                    </div>
                                        )}
        </div>
    )
}