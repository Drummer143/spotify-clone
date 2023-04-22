interface GetTrackResponse {
    album: AlbumInfo
    artists: ShortArtistInfo[]
    available_markets: string[],
    disc_number: number
    duration_ms: number
    explicit: false,
    external_ids: {
        isrc: string
    },
    external_urls: ExternalUrlsInfo
    href: string
    id: string
    name: string
    popularity: string
    preview_url: string | null
    track_number: number
    type: ItemType
    uri: string
    is_local: boolean
}