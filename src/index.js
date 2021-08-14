import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import { SpotifyStoreProvider } from "./store/SpotifyContextStore.js";
import { initialState, reducer } from "./store/reducer.js";

ReactDOM.render(
    <SpotifyStoreProvider initialState={initialState} reducer={reducer}>
        <App />
    </SpotifyStoreProvider>,
    document.getElementById("root")
);