/* eslint-disable camelcase */
/* eslint-disable max-lines */

import { HYDRATE } from "next-redux-wrapper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { spotifyApiHeaders, stringifySearchParams } from "@/utils";

export const spotifyApi = createApi({
    reducerPath: "spotifyApi",
    tagTypes: [
        "AlbumFollowInfo",
        "CurrentUsersPlaylists",
        "PlaylistFollowInfo",
        "PlaylistInfo",
        "TrackFollowInfo",
        "UserFollowInfo"
    ],
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.spotify.com/v1" }),
    extractRehydrationInfo: (action, { reducerPath }) => {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: build => ({
        getCurrentUser: build.query<GetCurrentUserResponse, string>({
            query: accessToken => ({
                url: "/me",
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getCurrentUserPlaylists: build.query<GetUserPlaylistsResponse, string>({
            query: accessToken => ({
                url: "/me/playlists",
                headers: spotifyApiHeaders(accessToken)
            }),
            providesTags: ["CurrentUsersPlaylists"]
        }),

        getCurrentUserSavedTracks: build.query<
            GetCurrentUserSavedTracksResponse,
            {
                accessToken: string;
                searchParams?: {
                    limit?: number;
                    offset?: number;
                    market?: string;
                };
            }
        >({
            query: ({ accessToken, searchParams }) => ({
                url: `/me/tracks?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getCurrentUserSavedEpisodes: build.query<
            GetCurrentUserSavedEpisodes,
            {
                accessToken: string;
                searchParams?: {
                    limit?: number;
                    offset?: number;
                    market?: string;
                };
            }
        >({
            query: ({ accessToken, searchParams }) => ({
                url: "/me/episodes?" + stringifySearchParams(searchParams),
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getCurrentUserSavedShows: build.query<
            GetCurrentUserSavedShows,
            {
                accessToken: string;
                searchParams?: {
                    limit?: number;
                    offset?: number;
                };
            }
        >({
            query: ({ accessToken, searchParams }) => ({
                url: "/me/shows?" + stringifySearchParams(searchParams),
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getFollowedArtists: build.query<
            GetFollowedArtists,
            {
                accessToken: string;
                searchParams?: {
                    limit?: number;
                    after?: string;
                };
            }
        >({
            query: ({ accessToken, searchParams }) => ({
                url: "/me/following?" + stringifySearchParams({ ...searchParams, type: "artist" }),
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getUserSavedAlbums: build.query<
            GetUserSavedAlbums,
            {
                accessToken: string;
                searchParams?: {
                    limit?: number;
                    after?: string;
                    market?: string;
                };
            }
        >({
            query: ({ accessToken, searchParams }) => ({
                url: "/me/albums?" + stringifySearchParams(searchParams),
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getUserTopArtists: build.query<GetUserTopItems<"artists">, {
            accessToken: string
            searchParams?: {
                time_range?: "long_term" | "medium_term" | "short_term"
                limit?: number;
                after?: string;
            };
        }>({
            query: ({ accessToken, searchParams }) => ({
                url: `/me/top/artists?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getUserTopTracks: build.query<GetUserTopItems<"tracks">, {
            accessToken: string
            searchParams?: {
                time_range?: "long_term" | "medium_term" | "short_term"
                limit?: number;
                after?: string;
            };
        }>({
            query: ({ accessToken, searchParams }) => ({
                url: `/me/top/tracks?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        checkIfUserFollowsUsers: build.query<boolean[], {
            accessToken: string
            searchParams: {
                type: "artist" | "user"
                ids: string[]
            }
        }>({
            query: ({ accessToken, searchParams }) => ({
                url: "/me/following/contains?" + stringifySearchParams(searchParams),
                headers: spotifyApiHeaders(accessToken)
            }),
            providesTags: ["UserFollowInfo"]
        }),

        getAlbum: build.query<GetAlbumResponse, {
            accessToken: string;
            albumId: string;
            market?: string
        }>({
            query: ({ accessToken, albumId, market }) => ({
                url: "/albums/" + albumId + (market ? ("?market=" + market) : ""),
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getAlbumTracks: build.query<GetAlumTracksResponse, {
            accessToken: string;
            albumId: string;
            searchParams?: {
                market?: string;
                limit?: number;
                after?: string;
            };
        }>({
            query: ({ accessToken, searchParams, albumId }) => ({
                url: `/albums/${albumId}/tracks?` + stringifySearchParams(searchParams),
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        checkUserSavedAlbums: build.query<boolean[], {
            accessToken: string,
            ids: string | string[]
        }>({
            query: ({ accessToken, ids }) => ({
                url: "/me/albums/contains?ids=" + ids.toString(),
                headers: spotifyApiHeaders(accessToken)
            }),
            providesTags: ["AlbumFollowInfo"]
        }),

        getSeveralBrowseCategories: build.query<
            GetSeveralBrowseCategoriesResponse,
            {
                accessToken: string;
                searchParams?: {
                    country?: string;
                    locale?: string;
                    limit?: number;
                    offset?: number;
                };
            }
        >({
            query: ({ accessToken, searchParams }) => ({
                url: `/browse/categories?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getSingleBrowseCategory: build.query<
            CategoryInfo,
            {
                accessToken: string;
                categoryId: string;
                searchParams?: {
                    country?: string;
                    locale?: string;
                };
            }
        >({
            query: ({ accessToken, categoryId, searchParams }) => ({
                url: `/browse/categories/${categoryId}?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getCategoryPlaylists: build.query<
            GetCategoryPlaylistsResponse,
            {
                accessToken: string;
                categoryId: string;
                searchParams?: {
                    limit?: number;
                    offset?: number;
                    country?: string;
                };
            }
        >({
            query: ({ accessToken, categoryId, searchParams }) => ({
                url: `/browse/categories/${categoryId}/playlists?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getUser: build.query<GetUserResponse, { accessToken: string; userId: string }>({
            query: ({ accessToken, userId }) => ({
                url: `/users/${userId}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getUserPlaylists: build.query<GetUserPlaylistsResponse, {
            accessToken: string
            userId: string
            searchParams?: {
                limit?: number;
                offset?: number;
            };
        }>({
            query: ({ accessToken, userId, searchParams }) => ({
                url: `/users/${userId}/playlists?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getTrack: build.query<GetTrackResponse, {
            accessToken: string
            trackId: string
            market?: string
        }>({
            query: ({ accessToken, trackId, market }) => ({
                url: "/tracks/" + trackId + (market ? ("?market=" + market) : ""),
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        checkUserSavedTracks: build.query<boolean[], {
            accessToken: string,
            ids: string | string[]
        }>({
            query: ({ accessToken, ids }) => ({
                url: "me/tracks/contains?ids=" + ids.toString(),
                headers: spotifyApiHeaders(accessToken)
            }),
            providesTags: ["TrackFollowInfo"]
        }),

        searchForItem: build.query<
            SearchForItemResponse,
            {
                accessToken: string;
                searchParams: {
                    q: string;
                    type: ItemType | ItemType[];
                    market?: string;
                    limit?: number;
                    offset?: number;
                    include_external?: "audio";
                };
            }
        >({
            query: ({ accessToken, searchParams }) => ({
                url: `/search?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getPlaylist: build.query<GetPlayListResponse, { accessToken: string; playlistId: string }>({
            query: ({ accessToken, playlistId }) => ({
                url: `/playlists/${playlistId}`,
                headers: spotifyApiHeaders(accessToken)
            }),
            providesTags: ["PlaylistInfo"]
        }),

        isUserFollowsPlaylist: build.query<
            boolean[],
            {
                accessToken: string;
                playlistId: string;
                usersIds: string | string[]
            }
        >({
            query: ({ accessToken, playlistId, usersIds }) => {
                usersIds = Array.isArray(usersIds) ? usersIds.join(",") : usersIds;

                return {
                    url: `/playlists/${playlistId}/followers/contains?ids=${usersIds}`,
                    headers: spotifyApiHeaders(accessToken)
                };
            },
            providesTags: ["PlaylistFollowInfo"]
        }),

        getArtist: build.query<GetArtistResponse, {
            accessToken: string
            artistId: string
        }>({
            query: ({ accessToken, artistId }) => ({
                url: "/artists/" + artistId,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getArtistTopTrack: build.query<GetArtistTopTracksResponse, {
            accessToken: string
            artistId: string
            market: string
        }>({
            query: ({ accessToken, artistId, market }) => ({
                url: `/artists/${artistId}/top-tracks?market=${market}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getArtistAlbums: build.query<GetArtistAlbumsResponse, {
            accessToken: string
            artistId: string,
            searchParams?: {
                market?: string;
                limit?: number;
                offset?: number;
                include_groups?: AlbumType | AlbumType[]
            };
        }>({
            query: ({
                accessToken,
                artistId,
                searchParams = {
                    include_groups: ["album", "appears_on", "single"]
                }
            }) => ({
                url: `/artists/${artistId}/albums?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getArtistRelatedArtists: build.query<GetArtistRelatedArtistsResponse, {
            accessToken: string
            artistId: string,
        }>({
            query: ({ accessToken, artistId }) => ({
                url: `/artists/${artistId}/related-artists`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        followPlaylist: build.mutation<"", { playlistId: string; accessToken: string }>({
            query: ({ accessToken, playlistId }) => ({
                url: `/playlists/${playlistId}/followers`,
                method: "PUT",
                headers: spotifyApiHeaders(accessToken),
                body: {
                    public: true
                }
            }),
            invalidatesTags: ["CurrentUsersPlaylists", "PlaylistFollowInfo"]
        }),

        unfollowPlaylist: build.mutation<"", { playlistId: string; accessToken: string }>({
            query: ({ accessToken, playlistId }) => ({
                url: `/playlists/${playlistId}/followers`,
                method: "DELETE",
                headers: spotifyApiHeaders(accessToken)
            }),
            invalidatesTags: ["CurrentUsersPlaylists", "PlaylistFollowInfo"]
        }),

        addCustomPlaylistCoverImage: build.mutation<"", { playlistId: string; accessToken: string; image: string }>({
            query: ({ accessToken, image, playlistId }) => ({
                url: `/playlists/${playlistId}/images`,
                method: "PUT",
                body: image,
                headers: {
                    ...spotifyApiHeaders(accessToken),
                    "Content-Type": "image/jpeg"
                }
            }),
            invalidatesTags: ["PlaylistInfo"]
        }),

        changePlaylistDetails: build.mutation<
            "",
            {
                playlistId: string;
                accessToken: string;
                body: {
                    name?: string;
                    description?: string;
                    public?: boolean;
                    collaborative?: boolean;
                };
            }
        >({
            query: ({ accessToken, playlistId, body }) => ({
                url: `/playlists/${playlistId}`,
                body,
                method: "PUT",
                headers: spotifyApiHeaders(accessToken)
            }),
            invalidatesTags: ["PlaylistInfo"]
        }),

        followUsers: build.mutation<"", {
            accessToken: string
            searchParams: {
                type: "artist" | "user"
                ids: string[]
            }
        }>({
            query: ({ accessToken, searchParams }) => ({
                url: "/me/following?" + stringifySearchParams(searchParams),
                headers: spotifyApiHeaders(accessToken),
                method: "PUT"
            }),
            invalidatesTags: ["UserFollowInfo"]
        }),

        unFollowUsers: build.mutation<"", {
            accessToken: string
            searchParams: {
                type: "artist" | "user"
                ids: string[]
            }
        }>({
            query: ({ accessToken, searchParams }) => ({
                url: "/me/following?" + stringifySearchParams(searchParams),
                headers: spotifyApiHeaders(accessToken),
                method: "DELETE"
            }),
            invalidatesTags: ["UserFollowInfo"]
        }),

        saveAlbumsForCurrentUser: build.mutation<"", {
            accessToken: string
            ids: string | string[]
        }>({
            query: ({ accessToken, ids }) => ({
                url: "/me/albums",
                body: Array.isArray(ids) ? ids : [ids],
                method: "PUT",
                headers: spotifyApiHeaders(accessToken)
            }),
            invalidatesTags: ["AlbumFollowInfo"]
        }),

        removeUserSavedAlbums: build.mutation<"", {
            accessToken: string
            ids: string | string[]
        }>({
            query: ({ accessToken, ids }) => ({
                url: "/me/albums",
                body: Array.isArray(ids) ? ids : [ids],
                method: "DELETE",
                headers: spotifyApiHeaders(accessToken)
            }),
            invalidatesTags: ["AlbumFollowInfo"]
        }),

        saveTracksForCurrentUser: build.mutation<"", {
            accessToken: string
            ids: string | string[]
        }>({
            query: ({ accessToken, ids }) => ({
                url: "/me/tracks",
                body: Array.isArray(ids) ? ids : [ids],
                method: "PUT",
                headers: spotifyApiHeaders(accessToken)
            }),
            invalidatesTags: ["TrackFollowInfo"]
        }),

        removeUserSavedTracks: build.mutation<"", {
            accessToken: string
            ids: string | string[]
        }>({
            query: ({ accessToken, ids }) => ({
                url: "/me/tracks",
                body: Array.isArray(ids) ? ids : [ids],
                method: "DELETE",
                headers: spotifyApiHeaders(accessToken)
            }),
            invalidatesTags: ["TrackFollowInfo"]
        })
    })
});
