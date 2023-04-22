interface GetUserSavedAlbums {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: {
        added_at: string;
        album: FullAlbumInfo;
    }[];
}
