interface Category {
    href: string;
    icons: SpotifyImageInfo[];
    id: string;
    name: string;
}

interface GetSeveralBrowseCategoriesResponse {
    categories: {
        href: string;
        limit: 20;
        next: string | null;
        offset: 0;
        previous: string | null;
        total: 39;
        items: Category[];
    };
}
