import helpers from '@/common/utils/helper';
import useSWR from 'swr';
import config from '@config/constants';
import logger from '@logger';
import states from '@/services/states';

const {
    API: { routes },
} = config;

const useGetLocalGovernment = (state_id: string) => {
    const fetcher = async () => {
        const response = await states.getLocalGovernments(state_id);
        if (!response.success) {
            helpers.openNotification({ message: response.message, type: 'error' });
            logger({ response });
        }
        return response;
    };

    const { data, isValidating } = useSWR([routes.states.getLocalGovernments, state_id], fetcher);

    return {
        data,
        isValidating,
    };
};

export default useGetLocalGovernment;
