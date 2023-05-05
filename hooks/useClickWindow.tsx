import { useEffect, useRef } from 'react';

function useClickWindow(onClick: () => void): React.MutableRefObject<HTMLDivElement | null> {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClick();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [onClick]);

    return ref;
}

export default useClickWindow;
