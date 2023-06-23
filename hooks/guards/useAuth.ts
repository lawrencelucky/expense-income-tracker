import { useEffect } from 'react';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import constants from '@config/constants';

const { COOKIES } = constants;

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const resetTimeout = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                destroyCookie(null, COOKIES.key); // Update the cookie key to match your configuration
                router.replace('/auth/login');
            }, 1800000); // 30 minutes
        };

        const onUserActivity = () => {
            resetTimeout();
        };

        resetTimeout();

        const events = [
            'mousemove',
            'mousedown',
            'mouseenter',
            'mouseleave',
            'mouseout',
            'mouseover',
            'mouseup',
            'keydown',
            'keypress',
            'keyup',
        ];

        events.forEach((event) => {
            window.addEventListener(event, onUserActivity);
        });

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, onUserActivity);
            });
            clearTimeout(timeout);
        };
    }, [router]);

    useEffect(() => {
        const cookies = parseCookies();
        const token = cookies[COOKIES.key];
        if (!token) {
            router.replace('/auth/login');
            return;
        }
    }, [router]);

    return;
};

export default useAuth;
