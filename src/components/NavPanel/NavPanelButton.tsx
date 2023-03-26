import React from 'react';

type NavPanelButtonProps = JSX.IntrinsicElements['button'] & {
    leftItem: React.ReactNode
};

const NavPanelButton: React.FC<NavPanelButtonProps> = ({ className, children, leftItem, ...buttonProps }) => {

    return (
        <button
            className={'group flex items-center gap-4 h-10 w-full px-4 text-sm font-bold'
                .concat(` ${className}` || '')}
            {...buttonProps}
        >
            {leftItem}
            <p className='text-[#d3d3d3] transition-[color] leading-4 group-hover:text-white duration-300'>{children}</p>
        </button>
    )
}
export default NavPanelButton;