import React from 'react';
import styles from './Login.module.css';
import spotifyLogo from '../assets/spotifylogo.png';

const AUTH_URL = "http://localhost:8000/login"

export default function Login() {
    return (
        <div className={styles["login-container"]}>
            <div className={styles["login-heading"]}>
                <img src={spotifyLogo} alt="Spotify Icon" />
            </div>
            <div className={styles["login-title"]}>
                <h1>Spotify...Now With Lyrics</h1>
            </div>
            <div className={styles["login-body"]}>
                <p>
                    Developed with Spotify API and Spotify Web Player SDK
                    <br/>
                    <br/>
                    <br/>
                    Lyrics provided by AZLyrics.com
                    <br/>
                    <br/>
                    <br/>
                    Created by Jinming Hu
                </p>
            </div>
            <div className={styles["login-bottom"]}>
                <a href={AUTH_URL} >
                    <button>
                    LOGIN
                    </button>
                </a>
            </div>
        </div>
    )
}