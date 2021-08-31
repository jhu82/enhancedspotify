import React, { useContext, useReducer } from 'react';
import { initialState, reducer } from './reducer.js';

const SpotifyContextStore = React.createContext();
export const useStore = () => useContext(SpotifyContextStore);

export const SpotifyStoreProvider = ({ children, initialState, reducer }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <SpotifyContextStore.Provider value={[state, dispatch]}>
            {children}
        </SpotifyContextStore.Provider>
    )
}