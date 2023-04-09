interface GetCategorysPlaylistsResponse {
    playlists: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: null;
        total: number;
        items: PlaylistInfo[];
    };
}
