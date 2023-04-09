import { useState } from "react";

export const useDisclosure = (initialState?: boolean) => {
    const [isOpen, setIsOpen] = useState<boolean>(initialState || false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const onToggle = () => setIsOpen(prev => !prev);

    return {
        isOpen,
        onClose,
        onOpen,
        onToggle
    }
}