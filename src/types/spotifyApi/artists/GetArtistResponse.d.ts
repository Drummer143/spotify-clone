interface GetArtistResponse {
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
