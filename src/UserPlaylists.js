import React, { useState, useEffect } from 'react';
import { getUserPlaylists } from './utils/spotifyutils';
import styles from './UserPlaylists.module.css';
import { Link } from 'react-router-dom';

export default function UserPlaylists({ accessToken }) {

    const [playlists, setPlaylists] = useState();

    useEffect(async () => {
        if (!accessToken) return;
        const _playlists = await getUserPlaylists(accessToken);
        setPlaylists(_playlists);
    }, [accessToken])
    return (
        <div className={styles["user-playlists"]}>
            {playlists && playlists.map(playlist => <div key={playlist.id} className={styles["playlist-row"]}>
                                                         <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
                                                    </div>
                                        )}
        </div>
    )
}