import React, { useRef } from "react";

import DropdownMenu from "../DropdownMenu";
import MobileMenuButton from "./MobileMenuButton";
import DropdownMenuLink from "../DropdownMenuLink";
import { headerLinks } from "@/utils";
import { useDisclosure } from "@/hooks";
import { Modal } from "@/components";

const MobileMenu: React.FC = () => {
    const { isOpen, onClose, onToggle } = useDisclosure();

    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <div className="min-[900px]:hidden" ref={menuRef}>
            <MobileMenuButton isMenuOpened={isOpen} onClick={onToggle} />

            <Modal
                onClose={onClose}
                targetRef={menuRef}
                visible={isOpen}
                top={(menuRef.current?.getBoundingClientRect().bottom || 0) + 16}
                left={menuRef.current?.getBoundingClientRect().right}
                className="-translate-x-full z-[2]"
            >
                <DropdownMenu>
                    {headerLinks.map(({ text, to }) => (
                        <DropdownMenuLink key={to} href={to}>
                            {text}
                        </DropdownMenuLink>
                    ))}
                </DropdownMenu>
            </Modal>
        </div>
    );
};

export default MobileMenu;
