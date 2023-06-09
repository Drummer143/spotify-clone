import Head from "next/head";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import UserStats from "@/components/ItemPageTopSection/UserStats";
import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { ItemPageTopSection, Loader, ItemsCollectionHeading, CurrentUserPagePart, ItemCard, Grid } from "@/components";
import UserFollowButton from "@/components/UserFollowButton";

const UserPage: NextPage = () => {
    const countOfCardsInColumn = useAppSelector(state => state.app.countOfCardsInColumn);
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const currentUserId = useAppSelector(state => state.auth.currentUserInfo?.id);

    const router = useRouter();

    const [getUser, { currentData: userInfo, isLoading }] = spotifyApi.useLazyGetUserQuery();
    const [getPlaylists, { currentData: playlists }] = spotifyApi.useLazyGetUserPlaylistsQuery();

    useEffect(() => {
        let id = router.query.id;

        if (!accessToken || !id) {
            return;
        }

        if (Array.isArray(id)) {
            id = id[0];
        }

        getUser({ accessToken, userId: id });
    }, [accessToken, getPlaylists, getUser, router.query.id]);

    useEffect(() => {
        if (userInfo && accessToken) {
            getPlaylists({ accessToken, userId: userInfo.id, searchParams: { limit: countOfCardsInColumn } });
        }
    }, [accessToken, countOfCardsInColumn, getPlaylists, userInfo]);

    if (isLoading) {
        return <Loader />;
    }

    if (!userInfo) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>{userInfo.display_name} - Spotify Clone</title>
            </Head>

            <section className="relative">
                <ItemPageTopSection
                    name={userInfo.display_name}
                    type={userInfo.type}
                    imageUrl={userInfo.images[0]?.url}
                >
                    <UserStats
                        countOfFollowers={userInfo.followers.total}
                        countOfPlaylists={playlists?.total}
                        currentUser={userInfo.id === currentUserId}
                    />
                </ItemPageTopSection>

                <div className="px-content-spacing flex gap-10 flex-col">
                    <div className="pt-6">
                        {userInfo.id !== currentUserId && <UserFollowButton type="user" targetId={userInfo.id} />}
                    </div>

                    {currentUserId === userInfo.id && <CurrentUserPagePart user={userInfo} />}

                    {!!playlists?.items.length && (
                        <section>
                            <ItemsCollectionHeading
                                isLink={playlists.total > countOfCardsInColumn}
                                heading={`${userInfo.id !== currentUserId ? "public" : ""} playlists`}
                                hrefToFullCollection={`/user/${userInfo.id}/playlists`}
                            />

                            <Grid>
                                {playlists.items.slice(0, countOfCardsInColumn).map(playlist => (
                                    <ItemCard {...playlist} key={playlist.id} imageURL={playlist.images[0]?.url} />
                                ))}
                            </Grid>
                        </section>
                    )}
                </div>
            </section>
        </>
    );
};

export default UserPage;
