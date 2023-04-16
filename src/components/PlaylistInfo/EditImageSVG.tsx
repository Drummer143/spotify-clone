import React from "react";

type EditImageSVGProps = JSX.IntrinsicElements["svg"];

const EditImageSVG: React.FC<EditImageSVGProps> = ({
    role = "img",
    height = 48,
    width = 48,
    viewBox = "0 0 24 24",
    ...otherProps
}) => {
    return (
        <svg role={role} height={height} width={width} viewBox={viewBox} {...otherProps}>
            <path
                d="M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 
                    1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 
                    1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 
                    2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z"
            ></path>
        </svg>
    );
};

export default EditImageSVG;
