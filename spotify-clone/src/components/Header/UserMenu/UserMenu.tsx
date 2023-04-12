import React, { useRef } from "react";
import Image from "next/image";

import Modal from "@/components/Modal";
import UserButton from "./UserButton";
import LogOutButton from "./LogOutButton";
import DropdownMenu from "../DropdownMenu";
import DropdownMenuLink from "../DropdownMenuLink";
import GoogleMaterialIcon from "@/components/GoogleMaterialIcon";
import { useDisclosure } from "@/hooks";
import { createUserMenuLinks } from "@/utils";

type UserMenuProps = {
    user: User;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
    const { isOpen, onClose, onToggle } = useDisclosure();

    const menuContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative" ref={menuContainerRef}>
            <UserButton onClick={onToggle}>
                <Image src={user.images[0].url} width={30} height={30} alt="avatar" className="h-full rounded-full"></Image>
                <span className="text-sm leading-none max-[870px]:hidden">{user.display_name}</span>
                <GoogleMaterialIcon iconName="arrow_drop_down" size={1.5} className="max-[870px]:hidden" GRAD={200} />
            </UserButton>

            <Modal
                targetRef={menuContainerRef}
                visible={isOpen}
                top={(menuContainerRef.current?.getBoundingClientRect().bottom || 0) + 12}
                left={menuContainerRef.current?.getBoundingClientRect().right}
                className="-translate-x-full"
                onClose={onClose}
            >
                <DropdownMenu>
                    {createUserMenuLinks(user.id).map(link => (
                        <DropdownMenuLink key={link.to} href={link.to} internal={link.internal}>
                            {link.text}
                        </DropdownMenuLink>
                    ))}

                    <LogOutButton />
                </DropdownMenu>
            </Modal>
        </div>
    );
};

export default UserMenu;
