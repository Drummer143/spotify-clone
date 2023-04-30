type User = GetCurrentUserResponse;

interface PlaylistDuration {
    hours: number;
    minutes: number;
}

type ColorPair = [string, string];

type SearchItemTypes = keyof SearchForItemResponse;

type GroupType = "all" | "album" | "single";

interface PlaylistItem {
    url?: string;
    id: string;
}

type Playlist = PlaylistItem[];
