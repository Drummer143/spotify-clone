interface GetUserResponse {
    display_name: string;
    external_urls: ExternalUrlsInfo;
    followers: FollowersInfo;
    href: string;
    id: string;
    images: ImageInfo[];
    type: "user";
    uri: string;
}
