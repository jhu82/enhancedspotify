import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import { SpotifyStoreProvider } from "./store/SpotifyContextStore.js";
import { initialState, reducer } from "./store/reducer.js";

const div = document.querySelector('div');
console.log(document.querySelectorAll('div:not([id]'));
ReactDOM.render(
    <SpotifyStoreProvider initialState={initialState} reducer={reducer}>
        <App />
    </SpotifyStoreProvider>,
    document.getElementById("root")
);