import React from 'react';
import styles from "./TrackMainInfo.module.css";

export default function TrackMainInfo({imgSRC, trackName, artists}) {
    return (
        <div className={styles["track-info"]}>
            <img src={imgSRC} />
            <div className={styles["trackname-artist"]}>
                <h4>{trackName}</h4>
                <p>{artists}</p>
            </div>
        </div>
    )
}