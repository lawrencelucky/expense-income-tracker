import { ApiResponse } from '@/common/types/interfaces';
import { UserAccount } from '@/common/types';
import constants from '@config/constants';
import request from '../request';

const {
    API: { routes },
} = constants;

export interface IGetUserDetails extends ApiResponse {
    data: UserAccount;
}

const getDetails = (): Promise<IGetUserDetails> => request.get({ route: routes.user.getDetails });

const user = {
    getDetails,
};

export default user;
