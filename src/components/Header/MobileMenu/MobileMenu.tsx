import React, { useRef, useState } from 'react';

import MobileMenuLink from './MobileMenuLink';
import MobileMenuButton from './MobileMenuButton';
import useCloseInOuterClick from 'src/hooks/useCloseInOuterClick';
import { headerLinks } from 'src/utils/constants';

const MobileMenu: React.FC = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuButtonClick = () => setIsMenuOpened(prev => !prev);

    useCloseInOuterClick({
        onOuterClick: () => setIsMenuOpened(false),
        target: menuRef.current,
        active: isMenuOpened
    })

    return (
        <div className='min-[900px]:hidden relative' ref={menuRef}>
            <MobileMenuButton isMenuOpened={isMenuOpened} onClick={handleMenuButtonClick} />

            <div
                className={'absolute -bottom-4 right-0 translate-y-full w-48 h-32 rounded shadow-header-menu'
                    .concat(' bg-[#282828] p-1 flex flex-col')
                    .concat(isMenuOpened ? '' : ' hidden')}
            >
                {headerLinks.map(({ text, to }) => (
                    <MobileMenuLink to={to}>{text}</MobileMenuLink>
                ))}
            </div>
        </div>
    )
}
export default MobileMenu;