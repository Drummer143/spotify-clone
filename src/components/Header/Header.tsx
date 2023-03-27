import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import HeaderLink from './HeaderLink';
import GoogleMaterialIcon from '../GoogleMaterialIcon';
import useCloseInOuterClick from 'src/hooks/useCloseInOuterClick';

const Header: React.FC = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuButtonClick = () => setIsMenuOpened(prev => !prev);

    useCloseInOuterClick({
        onOuterClick: () => setIsMenuOpened(false),
        target: menuRef.current,
        active: isMenuOpened
    })

    return (
        <div className='fixed top-0 right-0 w-[calc(100%_-_var(--nav-bar-width))] h-16 bg-[#00000080] flex items-center justify-between px-8 max-lg:px-4'>
            <div className='flex gap-4'>
                <button className='rounded-full h-8 w-8 bg-black' aria-label='Go back'>
                    <GoogleMaterialIcon iconName='chevron_left' size={2} className='flex items-center' wght={200} />
                </button>

                <button className='rounded-full h-8 w-8 bg-black max-lg:hidden' aria-label='Go forward'>
                    <GoogleMaterialIcon iconName='chevron_left' size={2} className='flex items-center rotate-180' wght={200} />
                </button>
            </div>

            <div className='flex gap-4 items-center'>
                <div className='flex gap-4 items-center max-[900px]:hidden'>
                    <HeaderLink to='https://www.spotify.com/premium'>Premium</HeaderLink>
                    <HeaderLink to='https://support.spotify.com/'>Support</HeaderLink>
                    <HeaderLink to='https://www.spotify.com/download/'>Download</HeaderLink>

                    <div className='h-8 w-[1px] bg-white mx-4'></div>
                </div>

                <HeaderLink to='https://www.spotify.com/signup'>Sign Up</HeaderLink>
                <button onClick={() => alert('modal here')} className='h-12 w-[6.875rem] bg-white text-black rounded-full font-bold ml-6 transition-[transform] hover:scale-105'>
                    Log in
                </button>

                <div className='min-[900px]:hidden relative' ref={menuRef}>
                    <button
                        className='w-5 h-8 rounded-3xl transition-[background_color] hover:bg-[#282828] focus:bg-[#282828]'
                        onClick={handleMenuButtonClick}
                    >
                        <GoogleMaterialIcon iconName={isMenuOpened ? 'close' : 'menu'} className='flex justify-center items-center' size={1.2} />
                    </button>

                    <div
                        className={'absolute -bottom-4 right-0 translate-y-full w-48 h-32 rounded shadow-header-menu'
                            .concat(' bg-[#282828] p-1 flex flex-col')
                            .concat(isMenuOpened ? '' : ' hidden')}
                    >
                        <Link target='_blank' className='flex justify-between items-center rounded-sm h-10 p-3 font-sm hover:bg-[hsla(0,0%,100%,.1)]' to='https://www.spotify.com/premium'>
                            Premium
                            <GoogleMaterialIcon iconName='open_in_new' />
                        </Link>
                        <Link target='_blank' className='flex justify-between items-center rounded-sm h-10 p-3 font-sm hover:bg-[hsla(0,0%,100%,.1)]' to='https://support.spotify.com/'>
                            Support
                            <GoogleMaterialIcon iconName='open_in_new' />
                        </Link>
                        <Link target='_blank' className='flex justify-between items-center rounded-sm h-10 p-3 font-sm hover:bg-[hsla(0,0%,100%,.1)]' to='https://www.spotify.com/download/'>
                            Download
                            <GoogleMaterialIcon iconName='open_in_new' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;