import React from "react";

import { Grid, ItemCard } from "@/components";

type DiscographyGridProps = {
    albums: AlbumInfo[]
};

const DiscographyGrid: React.FC<DiscographyGridProps> = ({ albums }) => {
    return (
        <Grid className="px-content-spacing">
            {albums.map((album) => (
                <ItemCard
                    {...album}
                    key={album.id}
                    imageURL={album.images[0]?.url}
                    description={
                        <p>
                            <span>{new Date(album.release_date).getFullYear()}</span>
                            <span className="mx-1 text-base">•</span>
                            <span className="first-letter:uppercase">{album.album_type}</span>
                        </p>
                    }
                />
            ))}
        </Grid>
    );
};

export default DiscographyGrid;