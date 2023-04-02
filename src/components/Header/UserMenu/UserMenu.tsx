import React, { useRef, useState } from "react";

import UserButton from "./UserButton";
import LogOutButton from "./LogOutButton";
import DropdownMenu from "../DropdownMenu";
import DropdownMenuLink from "../DropdownMenuLink";
import GoogleMaterialIcon from "src/components/GoogleMaterialIcon";
import useCloseInOuterClick from "src/hooks/useCloseInOuterClick";
import { createUserMenuLinks } from "src/utils/constants";

type UserMenuProps = {
    user: User
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const menuContainerRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = () => setIsMenuVisible(prev => !prev);

    useCloseInOuterClick({
        active: isMenuVisible,
        onOuterClick: () => setIsMenuVisible(false),
        target: menuContainerRef.current
    });

    return (
        <div className="relative" ref={menuContainerRef}>
            <UserButton onClick={handleButtonClick}>
                <img src={user.images[0].url} className="h-full rounded-full"></img>
                <span className="text-sm leading-none max-[870px]:hidden">{user.display_name}</span>
                <GoogleMaterialIcon iconName="arrow_drop_down" size={1.5} className="max-[870px]:hidden" GRAD={200} />
            </UserButton>

            <DropdownMenu visible={isMenuVisible}>
                {createUserMenuLinks(user.id).map(link => (
                    <DropdownMenuLink
                        key={link.to}
                        to={link.to}
                        internal={link.internal}
                    >{link.text}</DropdownMenuLink>
                ))}

                <LogOutButton />
            </DropdownMenu>
        </div>
    );
};

export default UserMenu;