 import React from 'react';
 import useFetch from './useFetch.js';
 import Card from './Card.js';
 import defaultPlaylistImage from "./assets/defaultplaylistimg.png";
 import styles from './CardRow.module.css';
 export default function CardRow({ category }) {

    const { playlists } = useFetch(`https://api.spotify.com/v1/browse/categories/${category}/playlists`, {limit: 5}) || {};
    return (
        <div className={styles["card-row"]}>
            {playlists && playlists.items.map(playlist => <Card
                                                            key={playlist.id}
                                                            id={playlist.id}
                                                            img={playlist.images.length > 0 ? playlist.images[0].url : defaultPlaylistImage} 
                                                            name={playlist.name}
                                                           />
                                            )}
        </div>
    )
 }