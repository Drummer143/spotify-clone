import Link from "next/link";
import React from "react";

type ItemsCollectionRowHeadingProps = {
    heading: string;
} & (
    | {
          isLink: boolean;
          hrefToFullCollection: string;
      }
    | {
          isLink?: false;
          hrefToFullCollection?: never;
      }
);

const ItemsCollectionRowHeading: React.FC<ItemsCollectionRowHeadingProps> = props => {
    return (
        <div className="flex justify-between items-center mb-4">
            {props.isLink ? (
                <>
                    <Link
                        href={props.hrefToFullCollection}
                        className="text-2xl font-bold first-letter:uppercase hover:underline"
                    >
                        {props.heading}
                    </Link>
                    <Link
                        href={props.hrefToFullCollection}
                        className="text-sm font-bold hover:underline text-[#b3b3b3]"
                    >
                        Show all
                    </Link>
                </>
            ) : (
                <p className="text-2xl font-bold first-letter:uppercase">{props.heading}</p>
            )}
        </div>
    );
};

export default ItemsCollectionRowHeading;
