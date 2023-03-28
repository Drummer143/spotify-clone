import React from 'react';
import { Link } from 'react-router-dom';

import LanguageButton from './LanguageButton';
import NavigationLinks from './NavigationLinks/NavigationLinks';
import { navBarBottomLinks } from 'src/utils/constants';
import { ReactComponent as SpotifyLogo } from '../../assets/spotifyLogo.svg';

const NavPanel: React.FC = () => {
    return (
        <nav className='w-[var(--nav-bar-width)] bg-black flex flex-col'>
            <Link to='/' className='pt-6 px-6 mb-[1.375rem] block'>
                <SpotifyLogo fill='#fff' className='max-w-[8.125rem]' />
            </Link>

            <NavigationLinks />

            <div className='text-[0.6875rem] text-[#b3b3b3] flex flex-wrap gap-x-4 px-6 my-8'>
                {navBarBottomLinks.map(({ to, text }) => (
                    <a target='_blank' className='h-[1.875rem] block whitespace-nowrap' href={to}>{text}</a>
                ))}

                <LanguageButton />
            </div>
        </nav>
    )
}
export default NavPanel;