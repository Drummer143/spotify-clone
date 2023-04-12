interface SearchForItemResponse {
    tracks?: {
        href: string
        limit: number
        next: string | null
        offset: number
        previous: string | null
        total: number
        items: TrackInfo[]
    }
    artists?: {
        href: string
        limit: number
        next: string | null
        offset: number
        previous: string | null
        total: number
        items: ArtistInfo[]
    }
    albums?: {
        href: string
        limit: number
        next: string | null
        offset: number
        previous: string | null
        total: number
        items: AlbumInfo[]
    }
    playlists?: {
        href: string
        limit: number
        next: string | null
        offset: number
        previous: string | null
        total: number
        items: PlaylistInfo[]
    }
    shows?: {
        href: string
        limit: number
        next: string | null
        offset: number
        previous: string | null
        total: number
        items: ShowInfo[]
    }
    episodes?: {
        href: string
        limit: number
        next: string | null
        offset: number
        previous: string | null
        total: number
        items: EpisodeInfo[]
    }
    // audiobooks?: {
    //     href: string
    //     limit: number
    //     next: string | null
    //     offset: number
    //     previous: string | null
    //     total: number
    //     items: unknown[]
    // }
}
