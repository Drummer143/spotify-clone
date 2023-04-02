interface PlaylistInfo {
    collaborative: boolean,
    description: string
    external_urls: {
        spotify: string
    },
    href: string
    id: string
    images: SpotifyImageInfo[],
    name: string
    owner: {
        display_name: string
        external_urls: {
            spotify: string
        },
        href: string
        id: string
        type: string
        uri: string
    },
    primary_color: null,
    public: boolean,
    snapshot_id: string
    tracks: {
        href: string
        total: number
    },
    type: string
    uri: string
}

interface GetUserPlaylistsResponse {
    href: string
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
    items: PlaylistInfo[]
}