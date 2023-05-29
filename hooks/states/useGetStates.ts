import helpers from '@/common/utils/helper';
import useSWR from 'swr';
import config from '@config/constants';
import logger from '@logger';
import states from '@/services/states';

const {
    API: { routes },
} = config;

const useGetStates = () => {
    const fetcher = async () => {
        const response = await states.getStates();
        if (!response.success) {
            helpers.openNotification({ message: response.message, type: 'error' });
            logger({ response });
        }
        return response;
    };

    const { data, isValidating } = useSWR([routes.states.getStates], fetcher);

    return {
        data,
        isValidating,
    };
};

export default useGetStates;
