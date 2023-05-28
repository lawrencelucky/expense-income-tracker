import { useState } from 'react';
import config from '@config/constants';
import user from '@/services/user';
import logger from '@logger';
import useSWR from 'swr';
import { IUserContext } from '@/common/context/UserContext';
import { parseCookies } from 'nookies';

const {
    API: { routes },
    COOKIES,
} = config;

const useUser = (): IUserContext => {
    const cookies = parseCookies();
    const token = cookies[COOKIES.key];
    const [visible, setVisible] = useState(false);

    const fetcher = async () => {
        if (!token) return undefined;
        const response = await user.getDetails();
        if (!response.success) {
            logger({ response });
            return undefined;
        }
        return response;
    };

    const { data, mutate } = useSWR([routes.user.getDetails], fetcher, { refreshInterval: 360000 });

    return {
        data,
        mutate,
        setVisible,
        visible,
    };
};

export default useUser;
