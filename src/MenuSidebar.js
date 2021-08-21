import React from 'react';
import styles from './MenuSidebar.module.css';
import UserPlaylists from './UserPlaylists';
import spotifyLogo from './assets/spotifylogo.png';

export default function MenuSidebar({accessToken}) {
    return (
        <div className={styles['menu-sidebar']}>
            <img className={styles['spotify-logo']}
                 src={spotifyLogo}
                 alt="Spotify Icon" 
            />
            <UserPlaylists accessToken={accessToken} />
        </div>
    )
}