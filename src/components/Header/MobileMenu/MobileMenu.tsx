import React, { useRef, useState } from "react";

import DropdownMenu from "../DropdownMenu";
import MobileMenuButton from "./MobileMenuButton";
import DropdownMenuLink from "../DropdownMenuLink";
import useCloseInOuterClick from "src/hooks/useCloseInOuterClick";
import { headerLinks } from "src/utils/constants";

const MobileMenu: React.FC = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuButtonClick = () => setIsMenuOpened(prev => !prev);

    useCloseInOuterClick({
        onOuterClick: () => setIsMenuOpened(false),
        target: menuRef.current,
        active: isMenuOpened
    });

    return (
        <div className="min-[900px]:hidden relative" ref={menuRef}>
            <MobileMenuButton isMenuOpened={isMenuOpened} onClick={handleMenuButtonClick} />

            <DropdownMenu visible={isMenuOpened}>
                {headerLinks.map(({ text, to }) => (
                    <DropdownMenuLink key={to} to={to}>
                        {text}
                    </DropdownMenuLink>
                ))}
            </DropdownMenu>
        </div>
    );
};

export default MobileMenu;
