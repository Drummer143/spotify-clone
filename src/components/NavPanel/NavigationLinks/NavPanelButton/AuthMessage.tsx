import React from 'react';

type AuthMessageProps = {
    visible: boolean
    modalHeading: string
    modalMessage: string
    onClose: React.MouseEventHandler<HTMLButtonElement>
};

const AuthMessage: React.FC<AuthMessageProps> = ({ visible, modalHeading, modalMessage, onClose }) => {

    return (
        <div
            className={'absolute top-0 -right-5 h-40 w-[20.75rem] bg-[#0d72ea] p-4 rounded-lg'
                .concat(' flex flex-col justify-between transition-[transform,_opacity] select-none')
                .concat(' ', visible ? 'translate-x-[calc(100%_-_0.5rem)]' : 'opacity-0 translate-x-full')}
        >
            <div
                className={'absolute top-0 left-0 translate-y-3 -translate-x-full'
                    .concat(' border-8 border-l-0 border-solid border-transparent border-r-[#0d72ea]')}
            ></div>

            <div>
                <h2 className='text-lg leading-none font-bold mb-2'>{modalHeading}</h2>
                <p className='text-sm'>{modalMessage}</p>
            </div>

            <div className='flex justify-end'>
                <button
                    onClick={onClose}
                    className={'w-[5.5rem] h-8 text-[#6a6a6a] text-sm whitespace-nowrap font-bold block'
                        .concat(' transition-[color,_transform]')
                        .concat(' hover:text-white hover:scale-105')}
                >Not now</button>
                <button
                    className={'h-8 w-[4.5rem] bg-white text-black rounded-full text-sm'
                        .concat(' transition-[color,_transform]')
                        .concat(' hover:scale-105')}
                >Log in</button>
            </div>
        </div>
    )
}
export default AuthMessage;