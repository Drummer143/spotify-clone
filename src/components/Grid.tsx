import React from "react";

type GridProps = JSX.IntrinsicElements["div"];

const Grid: React.FC<GridProps> = ({ className = "", ...otherProps }) => {

    return (
        <div
            {...otherProps}
            className={`grid grid-cols-dynamic gap-dynamic ${className}`}
         />
    );
};

export default Grid;