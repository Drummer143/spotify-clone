interface GetCurrentUserResponse {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: ExternalUrlsInfo;
    followers: FollowersInfo;
    href: string;
    id: string;
    images: ImageInfo[];
    product: string;
    type: string;
    uri: string;
}
