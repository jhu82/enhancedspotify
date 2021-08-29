import React from 'react';
import styles from './MainView.module.css';
import { Switch, Route } from 'react-router-dom';
import PlaylistView from './PlaylistView';
import HomeView from './HomeView';
import LikedTracksView from './LikedTracksView';
import TopTracksView from './TopTracksView';
import RecentTracksView from './RecentTracksView';
import SearchView from './SearchView';
 

export default function MainView({ accessToken }) {
    return (
        <div className={styles['mainview']}>
            <Switch>
                <Route path="/playlists/:id">
                    <PlaylistView />
                </Route>
                <Route path="/search">
                    <SearchView />
                </Route>
                <Route path="/saved">
                    <LikedTracksView />
                </Route>
                <Route path="/toptracks">
                    <TopTracksView />
                </Route>
                <Route path="/recent">
                    <RecentTracksView />
                </Route>
                <Route path="/">
                    <HomeView />
                </Route>
            </Switch>
        </div>
    )
}