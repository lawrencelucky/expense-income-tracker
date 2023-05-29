import { ApiResponse } from '@/common/types/interfaces';
import { Payload, UserAccount } from '@/common/types';
import constants from '@config/constants';
import request from '../request';

const {
    API: { routes },
} = constants;

export interface ILogin extends ApiResponse {
    data: {
        token: string;
        userData: any;
        success: boolean;
        first_login?: boolean;
    };
}
interface IPostRegister extends ApiResponse {
    data: UserAccount;
    token: string;
}

const login = (payload: Payload): Promise<ILogin> => request.post({ payload, route: routes.auth.login });

const register = (payload: Payload): Promise<IPostRegister> => request.post({ payload, route: routes.auth.register });

const auth = {
    login,
    register,
};

export default auth;
