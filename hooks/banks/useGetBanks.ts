import helpers from '@/common/utils/helper';
import useSWR from 'swr';
import config from '@config/constants';
import logger from '@logger';
import banks from '@/config/services/banks';

const {
    API: { routes },
} = config;

const useGetBanks = () => {
    const fetcher = async () => {
        const response = await banks.getBanks();
        if (!response.success) {
            helpers.openNotification({ message: response.message, type: 'error' });
            logger({ response });
        }
        return response;
    };

    const { data, isValidating } = useSWR([routes.banks.getBanks], fetcher);

    return {
        data,
        isValidating,
    };
};

export default useGetBanks;
