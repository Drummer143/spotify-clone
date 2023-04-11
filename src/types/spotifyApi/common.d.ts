interface ImageInfo {
    url: string
    height: number | null
    width: number | null
}

interface ExternalUrlsInfo {
    spotify: string
}

interface OwnerInfo {
    external_urls: ExternalUrlsInfo
    href: string
    id: string
    type: string
    uri: string
    display_name: string
}

interface FollowersInfo {
    href: string | null
    total: number
}

interface PlaylistInfo {
    collaborative: boolean
    description: string
    external_urls: ExternalUrlsInfo
    href: string
    id: string
    images: ImageInfo[]
    name: string
    owner: OwnerInfo
    public: boolean | null
    snapshot_id: string
    tracks: {
        href: string
        total: number
    }
    type: string
    uri: string
    primary_color: string | null
}

interface CategoryInfo {
    href: string
    icons: ImageInfo[]
    id: string
    name: string
}

interface ArtistInfo {
    external_urls: ExternalUrlsInfo
    href: string
    id: string
    name: string
    type: string
    uri: string
}

interface AlbumInfo {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: ExternalUrlsInfo
    href: string
    id: string
    images: ImageInfo[]
    name: string
    release_date: string
    release_date_precision: string
    type: string
    uri: string
    album_group: string
    artists: ArtistInfo[]
    is_playable: boolean
}

interface TrackInfo {
    album: AlbumInfo
    artists: ArtistInfo[]
    available_markets: string
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
        isrc: string
    }
    external_urls: ExternalUrlsInfo
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

interface TrackInPlaylistInfo {
    added_at: string
    added_by: {
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        type: string
        uri: string
    }
    is_local: boolean
    track: TrackInfo
    primary_color: string | null
    video_thumbnail: {
        url: string | null
    }
}
