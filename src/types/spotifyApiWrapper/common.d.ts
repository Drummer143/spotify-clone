interface SpotifyImageInfo {
    height: number;
    url: string;
    width: number;
}

interface ArtistInfo {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface AlbumInfo {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImageInfo[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    album_group: string;
    artists: ArtistInfo[];
    is_playable: boolean;
}

interface OwnerInfo {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
}

interface PlaylistInfo {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImageInfo[];
    name: string;
    owner: OwnerInfo;
    primary_color: string | null;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: string;
    uri: string;
}