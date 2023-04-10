import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { spotifyApiHeaders, stringifySearchParams } from "../../utils";

export const spotifyApi = createApi({
    reducerPath: "spotifyApi",
    tagTypes: ["CurrentUsersPlaylists", "FollowCheck"],
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.spotify.com/v1" }),
    endpoints: build => ({
        getCurrentUser: build.query<GetCurrentUserResponse, string>({
            query: (accessToken) => ({
                url: "/me",
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getCurrentUserPlaylists: build.query<GetUserPlaylistsResponse, string>({
            query: (accessToken) => ({
                url: "/me/playlists",
                headers: spotifyApiHeaders(accessToken)
            }),
            providesTags: ["CurrentUsersPlaylists"]
        }),

        getSeveralBrowseCategories: build.query<
            GetSeveralBrowseCategoriesResponse,
            {
                accessToken: string,
                searchParams?: {
                    country?: string
                    locale?: string,
                    limit?: number,
                    offset?: number
                }
            }
        >({
            query: ({ accessToken, searchParams }) => ({
                url: `/browse/categories?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getCategoryPlaylists: build.query<
            GetCategoryPlaylistsResponse,
            {
                accessToken: string,
                categoryId: string,
                searchParams?: {
                    limit?: number,
                    offset?: number,
                    country?: string
                }
            }
        >({
            query: ({ accessToken, categoryId, searchParams }) => ({
                url: `/browse/categories/${categoryId}/playlists?${stringifySearchParams(searchParams)}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getUser: build.query<GetUserResponse, { accessToken: string, userId: string }>({
            query: ({ accessToken, userId }) => ({
                url: `/users/${userId}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        getPlaylist: build.query<GetPlayListResponse, { accessToken: string, playlistId: string }>({
            query: ({ accessToken, playlistId }) => ({
                url: `/playlists/${playlistId}`,
                headers: spotifyApiHeaders(accessToken)
            })
        }),

        isUserFollowsPlaylist: build.query<boolean[], { accessToken: string, playlistId: string, usersIds: string | string[] }>({
            query: ({ accessToken, playlistId, usersIds }) => {
                usersIds = Array.isArray(usersIds) ? usersIds.join(",") : usersIds;

                return {
                    url: `/playlists/${playlistId}/followers/contains?ids=${usersIds}`,
                    headers: spotifyApiHeaders(accessToken)
                };
            },
            providesTags: ["FollowCheck"]
        }),

        followPlaylist: build.mutation<"", { playlistId: string, accessToken: string }>({
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

        unfollowPlaylist: build.mutation<"", { playlistId: string, accessToken: string }>({
            query: ({ accessToken, playlistId }) => ({
                url: `/playlists/${playlistId}/followers`,
                method: "DELETE",
                headers: spotifyApiHeaders(accessToken)
            }),
            invalidatesTags: ["CurrentUsersPlaylists", "FollowCheck"]
        })
    })
});
