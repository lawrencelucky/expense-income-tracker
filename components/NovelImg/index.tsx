import React from 'react';
import Image from 'next/image';

interface IProps {
    src: string;
    alt: string;
    width: number | string;
    height: number | string;
    className?: string;
    layout?: 'responsive' | 'fill' | 'fixed' | 'intrinsic';
    priority?: boolean;
    quality?: 75 | 90 | 100;
}

const NovelImg: React.FC<IProps> = ({ src, alt, width, height, className, layout, priority, quality }: IProps) => {
    return (
        <div className="flex justify-center">
            <Image
                src={src}
                alt={alt}
                width={+width}
                height={+height}
                className={className}
                layout={layout}
                priority={priority}
                quality={quality}
            />
        </div>
    );
};

NovelImg.defaultProps = {
    layout: 'intrinsic',
    priority: true,
    quality: 100,
};

export default NovelImg;
