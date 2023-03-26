import React from 'react';
import { Link } from 'react-router-dom';

import NavPanelLink from './NavPanelLink';
import NavPanelButton from './NavPanelButton';
import GoogleMaterialIcon from '../GoogleMaterialIcon';
import { ReactComponent as SpotifyLogo } from '../../assets/spotifyLogo.svg';
import { ReactComponent as LikedSongIcon } from '../../assets/likedSongs.svg';

const NavPanel: React.FC = () => {
    return (
        <nav className='w-60 bg-black flex flex-col justify-between'>
            <div>
                <Link to='/' className='pt-6 px-6 mb-[1.375rem] block'>
                    <SpotifyLogo fill='#fff' className='max-w-[8.125rem]' />
                </Link>

                <NavPanelLink to='/' iconName='home'>Home</NavPanelLink>
                <NavPanelLink to='/search' iconName='search' >Search</NavPanelLink>
                <NavPanelLink to='/collection' iconName='list' >Your Library</NavPanelLink>

                <NavPanelButton
                    leftItem={<GoogleMaterialIcon iconName='add_box' className='flex items-center' FILL={1} size={1.8} />}
                    className='mt-6'
                >Create playlist</NavPanelButton>

                <NavPanelButton
                    leftItem={
                        <div className='w-6 h-6 ml-0.5 group-hover: flex justify-center items-center liked-songs-icon'>
                            <LikedSongIcon className='fill-[#d3d3d3] group-hover:fill-white transition-[fill] duration-300' />
                        </div>
                    }
                >Create playlist</NavPanelButton>
            </div>

            <div className='text-[0.6875rem] text-[#b3b3b3] flex flex-wrap gap-x-4 px-6 my-8'>
                <a className='h-[1.875rem] block whitespace-nowrap' href='https://www.spotify.com/legal/'>Legal</a>
                <a className='h-[1.875rem] block whitespace-nowrap' href='https://www.spotify.com/privacy/'>Privacy Center</a>
                <a className='h-[1.875rem] block whitespace-nowrap' href='https://www.spotify.com/legal/privacy-policy/'>Privacy Policy</a>
                <a className='h-[1.875rem] block whitespace-nowrap' href='https://www.spotify.com/legal/cookies-policy/'>Cookies</a>
                <a className='h-[1.875rem] block whitespace-nowrap' href='https://www.spotify.com/legal/privacy-policy/#s3/'>About Ads</a>

                <button
                    className={'relative h-8 border border-solid border-[#878787] transition-[transform,_border-width,_border-color]'
                        .concat(' text-white rounded-full pl-8 pr-4 text-sm leading-8 font-semibold')
                        .concat(' hover:scale-105 hover:border-white hover:sborder-2')}
                >
                    <GoogleMaterialIcon size={1.2} className='absolute top-1/2 -translate-y-1/2 flex items-center left-3' iconName='language' />
                    Placeholder
                </button>
            </div>
        </nav>
    )
}
export default NavPanel;