import React from "react";
import ListItem from "./ListItem";

type DiscographyListProps = {
    albums: AlbumInfo[];
};

const DiscographyList: React.FC<DiscographyListProps> = ({ albums }) => {
    return (
        <>
            {albums.map(album => (
                <ListItem
                    key={album.id}
                    albumImage={album.images[0]?.url}
                    name={album.name}
                    albumType={album.album_type}
                    releaseDate={album.release_date}
                    totalSongs={album.total_tracks}
                    albumId={album.id}
                />
            ))}
        </>
    );
};

export default DiscographyList;
