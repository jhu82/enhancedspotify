import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'Card.module.css'
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

export default function Card({ id, img, name }) {
    return (
        <Link to={`/playlists/${id}`}>
            <div className={styles["card"]}>
                <img src={img} />
                <p>{name}</p>
            </div>
        </Link>
    )
}