import React from 'react';
import styles from './MainView.module.css';
import PlaylistView from './PlaylistView.js';
import { Switch, Route } from 'react-router-dom';
 

export default function MainView({ accessToken }) {
    return (
        <div className={styles['mainview']}>
            <Switch>
                <Route path="/playlists/:id">
                    <PlaylistView accessToken={accessToken} />
                </Route>
            </Switch>
        </div>
    )
}