import React from 'react';
import TableRow from './TableRow';
import styles from 'TableHeader.module.css';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export default function TableHeader({ withoutDate }) {
    return (
        <div className={styles['table-header']}>
            <TableRow 
                cell1={<p>#</p>}
                cell2={<p>TITLE</p>}
                cell3={<p>ALBUM</p>}
                cell4={!withoutDate && <p>DATE ADDED</p>}
                cell5={<AccessTimeIcon fontSize="small" color="primary" />}
            />
        </div>
    )
}