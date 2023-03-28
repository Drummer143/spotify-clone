import React from "react";

type GoogleMaterialIconProps = Omit<JSX.IntrinsicElements["span"], "className" | "children"> & {
    iconName: string;

    size?: string | number;
    color?: string;
    FILL?: 0 | 1;
    wght?: number;
    GRAD?: number;
    opsz?: number;
    className?: string;
};

const GoogleMaterialIcon: React.FC<GoogleMaterialIconProps> = ({
    size = 1,
    color,
    className,
    iconName,
    FILL = 0,
    GRAD = 0,
    opsz = 48,
    wght = 400,
    ...spanProps
}) => {
    return (
        <span
            className={"aspect-square leading-3 h-min"
                .concat(" material-symbols-outlined")
                .concat(className ? ` ${className}` : "")}
            style={{
                fontSize: typeof size === "number" ? `${size}rem` : size,
                color,
                fontVariationSettings: `'FILL' ${FILL}, 'wght' ${wght}, 'GRAD' ${GRAD}, 'opsz' ${opsz}`
            }}
            {...spanProps}
        >
            {iconName}
        </span>
    );
};

export default GoogleMaterialIcon;
