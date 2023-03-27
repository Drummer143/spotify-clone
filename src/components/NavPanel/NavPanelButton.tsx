import React, { useCallback, useEffect, useRef, useState } from 'react';

type NavPanelButtonProps = JSX.IntrinsicElements['button'] & {
    leftItem: React.ReactNode

    modalHeading: string
    modalMessage: string
};

const NavPanelButton: React.FC<NavPanelButtonProps> = ({ className, children, leftItem, modalHeading, modalMessage, ...buttonProps }) => {
    const [isAuthMessageVisible, setIsAuthMessageVisible] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const hideAuthMessage = useCallback((e: MouseEvent) => {
        if (containerRef.current && !e.composedPath().includes(containerRef.current)) {
            setIsAuthMessageVisible(false);
            document.removeEventListener('click', hideAuthMessage);
        }
    }, [containerRef]);

    const handleShowMessage = () => setIsAuthMessageVisible(true);

    const handleHideMessage = () => setIsAuthMessageVisible(false);

    useEffect(() => {
        if (isAuthMessageVisible) {
            document.addEventListener('click', hideAuthMessage);
        }

        return () => {
            document.removeEventListener('click', hideAuthMessage);
        }
    }, [isAuthMessageVisible]);

    return (
        <div ref={containerRef} className='relative'>
            <button
                onClick={handleShowMessage}
                className={'group flex items-center gap-4 h-10 w-full px-4 text-sm font-bold relative'
                    .concat(` ${className}` || '')}
                {...buttonProps}
            >
                {leftItem}
                <p className='text-[#d3d3d3] transition-[color] leading-4 group-hover:text-white duration-300'>{children}</p>
            </button>

            <div
                className={'absolute top-0 -right-5 h-40 w-[20.75rem] bg-[#0d72ea] p-4 rounded-lg'
                    .concat(' flex flex-col justify-between transition-[transform,_opacity] select-none')
                    .concat(' ', isAuthMessageVisible ? 'translate-x-[calc(100%_-_0.5rem)]' : 'opacity-0 translate-x-full')}
            >
                <div
                    className={'absolute top-0 left-0 translate-y-3 -translate-x-full'
                        .concat(' border-8 border-l-0 border-solid border-transparent border-r-[#0d72ea]')}
                ></div>

                <div>
                    <h2 className='text-lg leading-none font-bold mb-2'>{modalHeading}</h2>
                    <p className='text-sm'>{modalMessage}</p>
                </div>

                <div className='flex justify-end'>
                    <button
                        onClick={handleHideMessage}
                        className={'w-[5.5rem] h-8 text-[#6a6a6a] text-sm whitespace-nowrap font-bold block'
                            .concat(' transition-[color,_transform]')
                            .concat(' hover:text-white hover:scale-105')}
                    >Not now</button>
                    <button
                        className={'h-8 w-[4.5rem] bg-white text-black rounded-full text-sm'
                            .concat(' transition-[color,_transform]')
                            .concat(' hover:scale-105')}
                    >Log in</button>
                </div>
            </div>
        </div>
    )
}
export default NavPanelButton;