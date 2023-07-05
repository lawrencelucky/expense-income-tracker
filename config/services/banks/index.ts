import { ApiResponse } from '@/common/types/interfaces';
import { Payload } from '@/common/types';
import constants from '@config/constants';
import request from '../request';

const {
    API: { routes },
} = constants;

interface IGetBanks extends ApiResponse {
    data: {
        banks: {
            code: string;
            id: number;
            name: string;
        }[];
    };
}

interface IGetBankAccounts extends ApiResponse {
    data: {
        bank_accounts: {
            account_name: string;
            account_number: string;
            created_at: Date;
            id: number;
            is_active: string;
            is_primary: string;
            updated_at: Date;
            banks: {
                data: {
                    code: number;
                    id: number;
                    name: string;
                }[];
            };
        }[];
    };
}

const getBanks = (): Promise<IGetBanks> => request.get({ route: routes.banks.getBanks });

const createBankAccount = (payload: Payload): Promise<ApiResponse> =>
    request.post({ payload, route: routes.banks.createBankAccount });

const getBankAccounts = (): Promise<IGetBankAccounts> => request.get({ route: routes.banks.getBankAccounts });

const banks = {
    createBankAccount,
    getBankAccounts,
    getBanks,
};

export default banks;
