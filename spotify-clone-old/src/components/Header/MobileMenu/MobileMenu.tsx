import React, { useRef } from "react";

import Modal from "../../Modal/Modal";
import DropdownMenu from "../DropdownMenu";
import MobileMenuButton from "./MobileMenuButton";
import DropdownMenuLink from "../DropdownMenuLink";
import { headerLinks } from "../../../utils";
import { useDisclosure } from "../../../hooks";

const MobileMenu: React.FC = () => {
    const { isOpen, onClose, onToggle } = useDisclosure();

    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <div className="min-[900px]:hidden" ref={menuRef}>
            <MobileMenuButton isMenuOpened={isOpen} onClick={onToggle} />

            <Modal
                unmountOnHide
                onClose={onClose}
                targetRef={menuRef}
                visible={isOpen}
                top={(menuRef.current?.getBoundingClientRect().bottom || 0) + 16}
                left={menuRef.current?.getBoundingClientRect().right}
                className="-translate-x-full"
            >
                <DropdownMenu>
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
