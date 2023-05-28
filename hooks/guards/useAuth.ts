import { useEffect } from 'react';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import constants from '@config/constants';
import useUser from '../useUser';

const { COOKIES } = constants;

const useAuth = (redirectUrl = '/auth/login') => {
    const router = useRouter();
    const { data } = useUser();

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const resetTimeout = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                destroyCookie(null, COOKIES.key); // Update the cookie key to match your configuration
                router.push('/auth/login');
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
        console.log(token);
        if (!token) {
            router.push('/auth/login');
        }
    }, [router, redirectUrl, data]);

    return;
};

export default useAuth;
