interface TrackInfo {
    added_at: string
    added_by: Omit<ArtistInfo, "name">
    is_local: boolean
    track: {
        album: AlbumInfo
        artists: ArtistInfo[]
        available_markets: number
        disc_number: number
        duration_ms: number
        explicit: boolean
        external_ids: {
            isrc: string
        }
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        name: string
        popularity: number
        preview_url: string
        track_number: number
        type: string
        uri: string
        is_local: boolean
        episode: boolean
        track: boolean
    }
    primary_color: string | null
    video_thumbnail: {
        url: string | null
    }
}

interface GetPlayListResponse {
    collaborative: boolean
    description: string
    external_urls: {
        spotify: string
    }
    followers: {
        href: string | null
        total: number
    }
    href: string
    id: string
    images: SpotifyImageInfo[]
    name: string
    owner: {
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        type: string
        uri: string
        display_name: string
    }
    public: boolean
    snapshot_id: string
    tracks: {
        href: string
        limit: number
        next: string | null
        offset: number
        previous: string | null
        total: number
        items: TrackInfo[]
    }
    type: string
    uri: string
    primary_color: null
}
