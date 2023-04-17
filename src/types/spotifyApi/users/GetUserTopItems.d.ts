// interface GetUserTopItems {
//     href: string
//     limit: number
//     next: string
//     offset: number
//     previous: null
//     total: number
//     items: ArtistInfo[] | TrackInfo[]
// }

interface GetUserTopItemsItemType {
    artists: ArtistInfo[]
    tracks: TrackInfo[]
}

interface GetUserTopItems<T extends keyof GetUserTopItemsItemType> {
    href: string
    limit: number
    next: string
    offset: number
    previous: null
    total: number
    items: GetUserTopItemsItemType[T]
}