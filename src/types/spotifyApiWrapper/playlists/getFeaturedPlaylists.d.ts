interface GetFeaturedPlaylistsResponse {
    message: string;
    playlists: {
        href: string;
        limit: 20;
        next: string | null;
        offset: 0;
        previous: string | null;
        total: 12;
        items: PlaylistInfo[];
    };
}
