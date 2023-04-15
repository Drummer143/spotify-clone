interface GetCurrentUserSavedEpisodes {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SavedEpisodeInfo[];
}
