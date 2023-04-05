import React, { useRef, useState } from "react";

import Modal from "src/components/Modal/Modal";
import DropdownMenu from "../DropdownMenu";
import MobileMenuButton from "./MobileMenuButton";
import DropdownMenuLink from "../DropdownMenuLink";
import { headerLinks } from "src/utils/constants";

const MobileMenu: React.FC = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuButtonClick = () => setIsMenuOpened(prev => !prev);

    return (
        <div className="min-[900px]:hidden relative" ref={menuRef}>
            <MobileMenuButton isMenuOpened={isMenuOpened} onClick={handleMenuButtonClick} />

            <Modal
                unmountOnHide
                visible={isMenuOpened}
                top={(menuRef.current?.getBoundingClientRect().bottom || 0) + 16}
                left={menuRef.current?.getBoundingClientRect().right}
                className="-translate-x-full"
            >
                <DropdownMenu visible={isMenuOpened}>
                    {headerLinks.map(({ text, to }) => (
                        <DropdownMenuLink key={to} to={to}>
                            {text}
                        </DropdownMenuLink>
                    ))}
                </DropdownMenu>
            </Modal>
        </div>
    );
};

export default MobileMenu;
