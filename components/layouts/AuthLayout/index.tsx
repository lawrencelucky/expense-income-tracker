import React from 'react';
import NovelImg from '../../NovelImg';

interface IProps {
    children: React.ReactNode;
    isLogin?: boolean;
    isRegister?: boolean;
    headingText?: string;
    metaText?: string;
}

const AuthLayout: React.FC<IProps> = ({ children, isLogin, isRegister, headingText, metaText }: IProps) => {
    return (
        <div className="flex justify-center items-center mt-[157px]">
            <div className="flex flex-col border w-[368px] rounded-[24px]">
                <NovelImg width={100} height={50} src={'/svgs/NovelImg.svg'} alt="Logo" className="mt-[32px]" />
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <div className="flex justify-center">
                            <h5 className="font-bold text-lg">{headingText}</h5>
                        </div>
                        <div className="flex justify-center">
                            <p className="text-sm font-normal text-[#1D2939]">{metaText}</p>
                        </div>
                        <div className="">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
