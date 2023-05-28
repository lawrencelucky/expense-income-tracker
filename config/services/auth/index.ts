import { ApiResponse } from '@/common/types/interfaces';
import { Payload, UserAccount } from '@/common/types';
import constants from '@config/constants';
import request from '../request';

const {
    API: { routes },
} = constants;

interface IPostRegister extends ApiResponse {
    data: UserAccount;
    token: string;
}

const register = (payload: Payload): Promise<IPostRegister> => request.post({ payload, route: routes.auth.register });

const auth = {
    register,
};

export default auth;
