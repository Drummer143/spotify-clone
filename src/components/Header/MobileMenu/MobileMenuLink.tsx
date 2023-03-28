import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import GoogleMaterialIcon from 'src/components/GoogleMaterialIcon';

type MobileMenuLinkProps = Omit<LinkProps, 'className' | 'target'>;

const MobileMenuLink: React.FC<MobileMenuLinkProps> = ({ children, ...linkProps }) => {

    return (
        <Link target='_blank' className='flex justify-between items-center rounded-sm h-10 p-3 font-sm hover:bg-[hsla(0,0%,100%,.1)]' {...linkProps}>
            {children}
            <GoogleMaterialIcon iconName='open_in_new' />
        </Link>
    )
}
export default MobileMenuLink;