import React from 'react';
import useFetch from '../../utils/useFetch';
import Card from './Card';
import defaultPlaylistImage from "../../assets/defaultplaylistimg.png";
import styles from './CardRow.module.css';

export default function CardRow({ category, name }) {

const URL = `https://api.spotify.com/v1/browse/categories/${category}/playlists`;
const { playlists } = useFetch(URL, {limit: 6, country: "US"}) || {};

return (
    <div className={styles["card-row"]}>
        <div className={styles["category-title"]}>
            <h2>{name}</h2>
        </div>
        <div className={styles["card-display"]}>
            {playlists && playlists.items.map(playlist => <Card
                                                                key={playlist.id}
                                                                id={playlist.id}
                                                                img={playlist.images.length > 0 ? playlist.images[0].url : defaultPlaylistImage} 
                                                                name={playlist.name}
                                                            />)}
        </div>
    </div>
)
}