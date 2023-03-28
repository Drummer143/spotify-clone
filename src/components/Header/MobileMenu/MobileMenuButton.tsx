import React from 'react';

import GoogleMaterialIcon from 'src/components/GoogleMaterialIcon';

type MobileMenuButtonProps = JSX.IntrinsicElements['button'] & {
    isMenuOpened: boolean
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isMenuOpened, className, ...buttonProps }) => {
    return (
        <button
            className={'w-5 h-8 rounded-3xl transition-[background_color] hover:bg-[#282828] focus:bg-[#282828]'
                .concat(className ? ` ${className}` : '')}
            {...buttonProps}

        >
            <GoogleMaterialIcon iconName={isMenuOpened ? 'close' : 'menu'} className='flex justify-center items-center' size={1.2} />
        </button>
    )
}
export default MobileMenuButton;