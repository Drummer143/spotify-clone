/* eslint-disable max-lines */

interface ImageInfo {
    url: string;
    height: number | null;
    width: number | null;
}

interface ExternalUrlsInfo {
    spotify: string;
}

interface CopyrightsInfo {
    text: string;
    type: string;
}

interface OwnerInfo {
    external_urls: ExternalUrlsInfo;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
}

interface FollowersInfo {
    href: string | null;
    total: number;
}

type ItemType = "album" | "artist" | "playlist" | "track" | "show" | "episode" | "user" /* | "audiobook" */;

interface CategoryInfo {
    href: string;
    icons: ImageInfo[];
    id: string;
    name: string;
}

interface PlaylistInfo {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrlsInfo;
    href: string;
    id: string;
    images: ImageInfo[];
    name: string;
    owner: OwnerInfo;
    public: boolean | null;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: "playlist";
    uri: string;
    primary_color: string | null;
}

interface ArtistInfo {
    external_urls: ExternalUrlsInfo;
    followers: FollowersInfo;
    genres: string[];
    href: string;
    id: string;
    images: ImageInfo[];
    name: string;
    popularity: number;
    type: "artist";
    uri: string;
}

interface ShowInfo {
    available_markets: string[];
    copyrights: CopyrightsInfo[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrlsInfo;
    href: string;
    id: string;
    images: ImageInfo[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
}

interface SavedEpisodeInfo {
    added_at: string;
    episode: EpisodeInfo;
}

interface SavedShowInfo {
    added_at: string;
    show: ShowInfo;
}

interface EpisodeInfo {
    audio_preview_url: string;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrlsInfo;
    href: string;
    id: string;
    images: ImageInfo[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    language: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point: {
        fully_played: boolean;
        resume_position_ms: number;
    };
    type: "episode";
    uri: string;
    restrictions?: {
        reason: string;
    };
    show?: ShowInfo;
}

interface ShortArtistInfo {
    external_urls: ExternalUrlsInfo;
    href: string;
    id: string;
    name: string;
    type: "show";
    uri: string;
}

type AlbumType = "album" | "single" | "appears_on" | "compilation";

interface AlbumInfo {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrlsInfo;
    href: string;
    id: string;
    images: ImageInfo[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: "album";
    uri: string;
    album_group: AlbumType;
    artists: ShortArtistInfo[];
    is_playable: boolean;
}

interface FullAlbumInfo {
    added_at: string;
    album: {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: ExternalUrlsInfo;
        href: string;
        id: string;
        images: ImageInfo[];
        name: string;
        release_date: string;
        release_date_precision: string;
        type: "album";
        uri: string;
        copyrights: CopyrightsInfo[];
        external_ids: {
            upc: string;
        };
        genres: string[];
        label: string;
        popularity: number;
        artists: ShortArtistInfo[];
        tracks: {
            href: string;
            limit: number;
            next: string | null;
            offset: number;
            previous: string | null;
            total: number;
            items: TrackInfo[];
        };
        album_group: AlbumType;
        is_playable: boolean;
    };
}

interface TrackInfo {
    album: AlbumInfo;
    artists: ShortArtistInfo[];
    available_markets: string;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: ExternalUrlsInfo;
    href: string;
    id: string;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;
    episode: boolean;
    track: boolean;
}

interface TrackInPlaylistInfo {
    added_at: string;
    added_by: {
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    is_local: boolean;
    track: TrackInfo;
    primary_color: string | null;
    video_thumbnail: {
        url: string | null;
    };
}

interface LikedTrackInfo {
    added_at: string;
    track: TrackInfo;
}
