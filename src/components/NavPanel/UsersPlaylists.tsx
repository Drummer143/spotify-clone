import React from "react";
import { Link, NavLink } from "react-router-dom";

import PlaylistLink from "./PlaylistLink";
import LanguageButton from "./LanguageButton";
import GoogleMaterialIcon from "../GoogleMaterialIcon";
import { spotifyApi } from "../../redux/query/spotifyApi";
import { useAppSelector } from "../../hooks";
import { navBarBottomLinks } from "../../utils";

const UsersPlaylists: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { data: playlists } = spotifyApi.useGetCurrentUserPlaylistsQuery(accessToken || "", {
        refetchOnMountOrArgChange: true,
        skip:!accessToken
    });

    if (!accessToken) {
        return (
            <div
                className={"text-[0.6875rem] text-[#b3b3b3] flex content-end flex-1 flex-wrap gap-x-4 px-6 my-8"
                    .concat(" scroll-smooth")}
            >
                {navBarBottomLinks.map(({ to, text }) => (
                    <Link
                        target="_blank"
                        key={to}
                        className="h-[1.875rem] block whitespace-nowrap"
                        to={to}
                        rel="noreferrer"
                    >
                        {text}
                    </Link>
                ))}

                <LanguageButton />
            </div>
        );
    }

    return (
        <>
            <hr
                className={"bg-[#282828] mr-[var(--left-sidebar-padding-right)]".concat(
                    " ml-[var(--left-sidebar-padding-right)] mt-2 mb-4 h-[1px]"
                )}
            />

            <div className={"overflow-y-auto flex-1 overflow-x-hidden"}>
                {playlists?.items.map(playlist => (
                    <PlaylistLink to={`/playlist/${playlist.id}`} key={playlist.id}>
                        {playlist.name}
                    </PlaylistLink>
                ))}
            </div>

            <NavLink
                to="/download"
                className={({ isActive }) =>
                    "h-10 w-full flex items-center gap-4"
                        .concat(" pr-[var(--left-sidebar-padding-right)] pl-[var(--left-sidebar-padding-left)]")
                        .concat(" ", isActive ? "text-white" : "text-[#b3b3b3] hover:text-white")
                }
            >
                <GoogleMaterialIcon iconName="download_for_offline" className="text-inherit" size={1.6} />
                <span className="text-inherit text-sm">Install App</span>
            </NavLink>
        </>
    );
};

export default UsersPlaylists;
