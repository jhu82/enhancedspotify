export const initialState = {
    accessToken: null,
    isPlaying: false,
    currentTrack: null,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return {
                ...state,
                accessToken: action.accessToken
            };
        case "SET_IS_PLAYING":
            return {
                ...state,
                isPlaying: action.isPlaying
            };
        case "SET_TRACK":
            return {
                ...state,
                currentTrack: action.currentTrack
            };
    };
};