import React, { useEffect, useRef } from "react";

import { CategoryPlaylistsCollection } from "@/components";
import { changeHeadBGColor, spotifyApi } from "@/redux";
import { useAppSelector, useAppDispatch } from "@/hooks";

const MainPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const mainPageContainerRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const [getCategories, { data: browseCategories }] = spotifyApi.useLazyGetSeveralBrowseCategoriesQuery();

    useEffect(() => {
        dispatch(changeHeadBGColor("authentificated"));
    }, [dispatch]);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        getCategories({
            accessToken,
            searchParams: {
                limit: 5,
                locale: Intl.DateTimeFormat().resolvedOptions().locale
            }
        });
    }, [accessToken, getCategories]);

    return (
        <div ref={mainPageContainerRef} className={"pt-16 px-[var(--content-spacing)] flex flex-col gap-10 max-h-full"}>
            {browseCategories &&
                browseCategories.categories.items.map(category => (
                    <CategoryPlaylistsCollection key={category.id} {...category} />
                ))}
        </div>
    );
};

export default MainPage;