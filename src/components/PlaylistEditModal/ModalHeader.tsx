import React from "react";

import GoogleMaterialIcon from "@/components/GoogleMaterialIcon";

type ModalHeaderProps = {
    onClose: () => void;
};

const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose }) => {
    return (
        <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">Edit details</h1>

            <button
                type="button"
                onClick={onClose}
                className={"h-8 w-8 transition-[background-color] rounded-full flex justify-center items-center".concat(
                    " hover:bg-[hsla(0,0%,100%,.1)]"
                )}
            >
                <GoogleMaterialIcon iconName="close" size={1.6} className="text-[hsla(0,0%,100%,.7)]" />
            </button>
        </div>
    );
};

export default ModalHeader;
