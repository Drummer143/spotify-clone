import Modal from "react-modal";
import React, { useState } from "react";

import NameInput from "./NameInput";
import ImageInput from "./ImageInput";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import SubmitButton from "./SubmitButton";
import DescriptionInput from "./DescriptionInput";
import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";

type PlaylistEditModalProps = {
    playlistId: string;
    playlistName: string;

    imageURL?: string;
    playlistDescription?: string;
    isOpen?: boolean;
    onClose: () => void;
};

Modal.setAppElement("#__next");

const PlaylistEditModal: React.FC<PlaylistEditModalProps> = ({
    onClose,
    isOpen = false,
    playlistId,
    playlistName,
    playlistDescription = "",
    imageURL
}) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [nameInput, setNameInput] = useState(playlistName);
    const [descriptionInput, setDescriptionInput] = useState(playlistDescription);
    const [currentCover, setCurrentCover] = useState<string | undefined>(imageURL);

    const [updateImage] = spotifyApi.useAddCustomPlaylistCoverImageMutation();
    const [updateDetails] = spotifyApi.useChangePlaylistDetailsMutation();

    const handleNameInputChange: React.ChangeEventHandler<HTMLInputElement> = e => setNameInput(e.target.value);
    const handleDescriptionInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = e =>
        setDescriptionInput(e.target.value);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();

        if (!accessToken) {
            return;
        }

        if (currentCover && currentCover !== imageURL) {
            const reader = new FileReader();

            reader.onloadend = e => {
                if (e.target?.result) {
                    const result = e.target?.result.toString().replace("data:image/jpeg;base64,", "");

                    updateImage({ accessToken, playlistId, image: result.toString() });
                }
            };

            reader.readAsDataURL(await (await fetch(currentCover)).blob());
        }

        if (playlistName !== nameInput || playlistDescription !== descriptionInput) {
            updateDetails({
                accessToken,
                playlistId,
                body: {
                    description: descriptionInput,
                    name: nameInput
                }
            });
        }

        onClose();
    };

    const reset = () => {
        setCurrentCover(imageURL);
        setNameInput(playlistName);
        setDescriptionInput(playlistDescription);
    };

    return (
        <Modal
            shouldCloseOnEsc
            onAfterClose={reset}
            isOpen={isOpen}
            overlayClassName="bg-[rgba(0,0,0,.7)] w-screen h-screen absolute top-0 left-0 z-[10]"
            shouldCloseOnOverlayClick={true}
            onRequestClose={onClose}
            className={"h-fit bg-[#282828] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2".concat(
                " rounded-lg w-[524px] min-h-[384px] shadow-edit-playlist-modal p-6"
            )}
        >
            <ModalHeader onClose={onClose} />

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-[180px,1fr] grid-rows-[40px,132px,48px] gap-4 text-sm"
            >
                <ImageInput
                    currentCover={currentCover}
                    setCurrentCover={setCurrentCover}
                    isNewImage={currentCover === imageURL}
                />

                <NameInput onChange={handleNameInputChange} value={nameInput} />

                <DescriptionInput onChange={handleDescriptionInputChange} value={descriptionInput} />

                <SubmitButton />
            </form>

            <ModalFooter />
        </Modal>
    );
};

export default PlaylistEditModal;
