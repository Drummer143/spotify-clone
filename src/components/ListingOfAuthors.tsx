import Link from "next/link";
import React from "react";

type ListingOfAuthorsProps = {
    artists: ShortArtistInfo[];
};

const ListingOfAuthors: React.FC<ListingOfAuthorsProps> = ({ artists }) => {
    return (
        <p className="text-[#b3b3b3] line-clamp-1">
            {artists.map((artist, i) => (
                <React.Fragment key={artist.id}>
                    <Link href={`/artist/${artist.id}`} className="hover:underline">
                        {artist.name}
                    </Link>
                    {i < artists.length - 1 && <span className="text-inherit">, </span>}
                </React.Fragment>
            ))}
        </p>
    );
};

export default ListingOfAuthors;
