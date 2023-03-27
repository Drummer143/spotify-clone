import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

type TextButtonProps = LinkProps;

const TextButton: React.FC<TextButtonProps> = ({ className, target, ...buttonProps }) => {

    return (
        <Link
            target={target || '_blank'}
            className={'text-[#6a6a6a] text-sm h-12 whitespace-nowrap font-bold block'
                .concat(' transition-[color,_transform] flex justify-center items-center text-base')
                .concat(' hover:text-white hover:scale-105')
                .concat(className ? ` ${className}` : '')}
            {...buttonProps}
        />
    )
}
export default TextButton;