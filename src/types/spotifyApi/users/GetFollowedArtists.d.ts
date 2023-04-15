interface GetFollowedArtists {
    artists: {
        href: string;
        limit: number;
        next: string;
        cursors: {
            after: string;
        };
        total: number;
        items: ArtistInfo[];
    };
}
