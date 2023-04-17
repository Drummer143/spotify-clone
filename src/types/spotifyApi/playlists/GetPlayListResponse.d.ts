interface GetPlayListResponse {
    collaborative: false;
    description: string;
    external_urls: ExternalUrlsInfo;
    followers: FollowersInfo;
    href: string;
    id: string;
    images: ImageInfo[];
    name: string;
    owner: OwnerInfo;
    public: true | null;
    snapshot_id: string;
    tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: TrackInPlaylistInfo[];
    };
    type: "playlist";
    uri: string;
    primary_color: string | null;
}
