import React from 'react';
import { usePalette } from 'react-palette';
import styles from './TableView.module.css';

export default function TableView(props) {

    const { data: palette } = usePalette(props.image);

    return (
        <div className={styles["tableview-container"]}>
        <div className={styles["tableview-heading"]} style={{background: `linear-gradient(to bottom, ${palette.darkMuted}, 60%, #121212)`}}>
            <div className={styles["tableview-image"]}>
                <img src={props.image} />
            </div>
            <div className={styles["tableview-title"]}>
                <h6>PLAYLIST</h6>
                <h1>{props.title}</h1>
            </div>
        </div>
        <div className={styles["tableview-track-table"]}>
            {props.tableHeader}
            {props.tracks}
        </div>
    </div>
    )
}