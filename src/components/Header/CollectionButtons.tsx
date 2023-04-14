import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

import { headerCollectionSwitchButtons } from '@/utils';

const CollectionButtons: React.FC = () => {
    const { asPath } = useRouter();

    return (
        <div className="flex gap-2">
            {headerCollectionSwitchButtons.map(buttonInfo => (
                <Link
                    key={buttonInfo}
                    href={`/collection/${buttonInfo}`}
                    className={"rounded px-4 py-2 first-letter:uppercase"
                        .concat(asPath === `/collection/${buttonInfo}` ? " bg-[#333]" : "")}
                >{buttonInfo}</Link>
            ))}
        </div>
    )
}

export default CollectionButtons;
