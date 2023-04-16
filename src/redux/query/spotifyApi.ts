/* eslint-disable max-lines */

import { HYDRATE } from "next-redux-wrapper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { spotifyApiHeaders, stringifySearchParams } from "@/utils";

export const spotifyApi = createApi({
    reducerPath: "spotifyApi",
    tagTypes: ["CurrentUsersPlaylists", "FollowCheck", "PlaylistInfo"],
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
            { accessToken: string; playlistId: string; usersIds: string | string[] }
        >({
            query: ({ accessToken, playlistId, usersIds }) => {
                usersIds = Array.isArray(usersIds) ? usersIds.join(",") : usersIds;

                return {
                    url: `/playlists/${playlistId}/followers/contains?ids=${usersIds}`,
                    headers: spotifyApiHeaders(accessToken)
                };
            },
            providesTags: ["FollowCheck"]
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
            invalidatesTags: ["CurrentUsersPlaylists", "FollowCheck"]
        }),

        unfollowPlaylist: build.mutation<"", { playlistId: string; accessToken: string }>({
            query: ({ accessToken, playlistId }) => ({
                url: `/playlists/${playlistId}/followers`,
                method: "DELETE",
                headers: spotifyApiHeaders(accessToken)
            }),
            invalidatesTags: ["CurrentUsersPlaylists", "FollowCheck"]
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
        })
    })
});
