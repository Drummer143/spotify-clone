/* eslint-disable max-lines */
import axios from "axios";

import { RootState } from "../store";
import { buildPlaylistURL, findNextURL, spotifyApiHeaders } from "@/utils";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type RepeatValues = "no" | "playlist" | "single";

const repeatValuesArray: Readonly<RepeatValues>[] = ["no", "playlist", "single"];

interface PlayerState {
    shuffle: boolean;
    repeat: RepeatValues;
    currentPlayTime: number;
    currentSongIndex: number;
    playlist: Playlist;
    playNextQueue: Playlist;
    paused: boolean;
    volume: number;
    muted: boolean;
    currentSongDuration: number;
    isPlaylistRequested: boolean; // needed for play button on header

    playlistInfo?: {
        id: string;
        type?: string;
    };
    currentPagePlaylistInfo?: {
        id: string;
        type?: string;
    };
    playlistInCurrentPage?: string; // needed for play button on header
    playlistURL?: string;
}

const initialState: PlayerState = {
    currentPlayTime: 0,
    currentSongDuration: 0,
    repeat: "no",
    shuffle: false,
    paused: false,
    isPlaylistRequested: false,
    currentSongIndex: 0,
    playlist: [],
    playNextQueue: [],
    volume: 0.25,
    muted: false
};

export const getPlaylist = createAsyncThunk<
    {
        playlist: Playlist;
        startIndex?: number;
        playlistInfo?: PlayerState["playlistInfo"];
    },
    {
        id: string;
        type: Extract<ItemType, "album" | "artist" | "playlist" | "track">;
        startIndex?: number;
    },
    { state: RootState }
>("player/getPlaylist", async ({ id, type, startIndex }, { rejectWithValue, getState }) => {
    const URL = buildPlaylistURL(id, type);

    const {
        auth: { accessToken }
    } = getState();

    if (!accessToken) {
        return rejectWithValue("No access token provided");
    }

    try {
        const res = await axios.get<
            GetPlaylistItemsResponse | GetAlbumTracksResponse | GetArtistTopTracksResponse | GetTrackResponse
        >(URL, {
            headers: spotifyApiHeaders(accessToken)
        });

        if ("type" in res.data) {
            if (res.data.preview_url) {
                return {
                    playlist: [
                        {
                            id: res.data.id,
                            url: res.data.preview_url
                        }
                    ],
                    playlistInfo: {
                        id: res.data.id
                    },
                    startIndex
                };
            } else {
                return rejectWithValue("no playable tracks");
            }
        }

        const tracks = "tracks" in res.data ? res.data.tracks : res.data.items;

        const playlist = tracks.map<PlaylistItem>(track => {
            if (!("preview_url" in track)) {
                track = track.track;
            }

            return { id: track.id, url: track.preview_url, playlistInfo: { id, type } };
        });

        return {
            playlist,
            startIndex,
            playlistInfo: {
                id,
                type
            }
        };
    } catch (error) {
        return rejectWithValue(error);
    }
});

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        toggleShuffle: state => {
            state.shuffle = !state.shuffle;
        },

        toggleRepeat: state => {
            const index = repeatValuesArray.indexOf(state.repeat);

            const nextIndex = (index + 1) % 3;

            state.repeat = repeatValuesArray[nextIndex];
        },

        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },

        toggleMute: state => {
            state.muted = !state.muted;
        },

        setCurrentSongIndex: (state, action: PayloadAction<"next" | "prev" | number>) => {
            if (state.repeat === "single") {
                state.repeat = "playlist";
            }

            const prevIndex = state.currentSongIndex;
            const playlistLength = state.playlist.length;
            let newIndex = prevIndex;

            if (!state.playlist.length) {
                state.currentSongIndex = 0;
                state.currentPlayTime = 0;
                state.currentSongDuration = 0;

                return;
            }

            if (action.payload === "next") {
                newIndex = findNextURL(state.playlist, newIndex + 1, 1, state.repeat === "playlist");
            } else if (action.payload === "prev") {
                newIndex = findNextURL(state.playlist, newIndex - 1, -1, state.repeat === "playlist");
            } else {
                newIndex = findNextURL(state.playlist, action.payload, 1, state.repeat === "playlist");
            }

            if (newIndex <= -1 || newIndex >= playlistLength) {
                if (state.repeat === "playlist") {
                    if (action.payload === "next") {
                        state.currentSongIndex = 0;
                    } else {
                        state.currentSongIndex = playlistLength - 1;
                    }
                } else {
                    state.playlist = [];
                    state.currentPlayTime = 0;
                    state.currentSongDuration = 0;
                }
            } else {
                state.currentSongIndex = newIndex;
            }
        },

        setPaused: (state, action: PayloadAction<boolean | undefined>) => {
            if (typeof action.payload === "undefined") {
                state.paused = !state.paused;
            } else {
                state.paused = action.payload;
            }
        },

        setCurrentPlayTime: (state, action: PayloadAction<number>) => {
            state.currentPlayTime = action.payload;
        },

        setCurrentSongDuration: (state, action: PayloadAction<number>) => {
            state.currentSongDuration = action.payload;
        },

        requestCurrentPagePlaylist: state => {
            state.isPlaylistRequested = true;
        },

        setPlaylist: (
            state,
            action: PayloadAction<{
                playlist: Playlist;
                startIndex?: number;
                playlistInfo?: PlayerState["playlistInfo"];
            }>
        ) => {
            if (!action.payload.playlist.length) {
                return;
            }

            const isPlayable = action.payload.playlist.find(song => song.url);

            if (!isPlayable) {
                // TODO:
                // eslint-disable-next-line no-console
                console.error("no playable songs in playlist");

                state.currentSongIndex = 0;
                state.playlist = [];
            } else {
                state.playlist = action.payload.playlist;
                state.currentSongIndex = action.payload.startIndex || 0;
                state.playlistInfo = action.payload.playlistInfo;
            }

            state.currentPlayTime = 0;
            state.isPlaylistRequested = false;
            state.paused = false;
        },

        setCurrentPagePlaylistInfo: (
            state,
            action: PayloadAction<PlayerState["currentPagePlaylistInfo"] | undefined>
        ) => {
            state.currentPagePlaylistInfo = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getPlaylist.fulfilled, (state, action) => {
            state.playlist = action.payload.playlist;
            state.currentSongIndex = action.payload.startIndex || 0;
            state.playlistInfo = action.payload.playlistInfo;

            state.currentPlayTime = 0;
            state.paused = false;
            state.playlistURL = undefined;
        });
    }
});

export default playerSlice;

export const {
    setPaused,
    setVolume,
    toggleMute,
    setPlaylist,
    toggleRepeat,
    toggleShuffle,
    setCurrentPlayTime,
    setCurrentSongIndex,
    setCurrentSongDuration,
    setCurrentPagePlaylistInfo,
    requestCurrentPagePlaylist
} = playerSlice.actions;
