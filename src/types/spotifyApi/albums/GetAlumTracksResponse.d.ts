interface GetAlumTracksResponse {
    href: string
    limit: number
    next: string | null
    offset: number
    previous: string | null,
    total: number
    items: Omit<TrackInfo, "album">[]
  }