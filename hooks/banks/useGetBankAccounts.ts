import helpers from '@/common/utils/helper';
import useSWR from 'swr';
import config from '@config/constants';
import logger from '@logger';
import banks from '@/config/services/banks';

const {
    API: { routes },
} = config;

const useGetBankAccoutns = () => {
    const fetcher = async () => {
        const response = await banks.getBankAccounts();
        if (!response.success) {
            helpers.openNotification({ message: response.message, type: 'error' });
            logger({ response });
        }
        return response;
    };

    const { data, isValidating, mutate } = useSWR([routes.banks.getBankAccounts], fetcher);

    return {
        data,
        isValidating,
        mutate,
    };
};

export default useGetBankAccoutns;
