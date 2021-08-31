import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js'
import { SpotifyStoreProvider } from "./store/SpotifyContextStore.js";
import { initialState, reducer } from "./store/reducer.js";
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <SpotifyStoreProvider initialState={initialState} reducer={reducer}>
        <Router>
            <App />
        </Router>
    </SpotifyStoreProvider>,
    document.getElementById("root")
);