type SATrack = {
    track: {
        duration_ms: number;
        type: string;
    };
};

type SAOwner = {
    display_name: string;
    id: string;
    uri: string;
};

type SAImage = {
    height?: string | number;
    width?: string | number;
    url: string;
};

type SAFollowers = {
    total: number;
};

interface GetPlaylistResponse {
    collaborative: boolean;
    description: string;
    followers: SAFollowers;
    images: SAImage[];
    name: string;
    owner: SAOwner;
    public: boolean;
    tracks: {
        items: SATrack[];
        total: number;
    };
}
