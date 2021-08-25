import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'MenuItem.module.css';

export default function MenuItem({linkTo, icon, text}) {
    return (
        <Link to={linkTo}>
            <div className={styles["menu-item"]}>
                {icon}
                <p>
                    {text}
                </p>
            </div>
        </Link>
    )
}