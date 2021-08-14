import React from 'react';
import styles from './MenuSidebar.module.css';

export default function MenuSidebar() {
    return (
        <div id={styles['menu-sidebar']}>
            <img id={styles['spotify-logo']}
                 src="./assets/spotifylogo.png" 
                 alt="Spotify Icon" 
            />
        </div>
    )
}