import React from 'react';
import styles from './TableRow.module.css';

export default function TableRow(props) {
    return (
        <>
            <div className={styles["table-cell-1"]}>
                {props.cell1}
            </div>
            <div className={styles["table-cell-2"]}>
                {props.cell2}
            </div>
            <div className={styles["table-cell-3"]}>
                {props.cell3}
            </div>
            <div className={styles["table-cell-4"]}>
                {props.cell4}
            </div>
            <div className={styles["table-cell-5"]}>
                {props.cell5}
            </div>
        </>
    )
}