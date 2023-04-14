type User = GetCurrentUserResponse;

interface PlaylistDuration {
    hours: number;
    minutes: number;
}

type ColorPair = [string, string];

type SearchItemTypes = keyof SearchForItemResponse;

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}