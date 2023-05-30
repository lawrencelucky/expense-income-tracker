import { ApiResponse } from '@/common/types/interfaces';
import { Payload, UserAccount } from '@/common/types';
import constants from '@config/constants';
import request from '../request';

const {
    API: { routes },
} = constants;

export interface ILogin extends ApiResponse {
    token: string;
    data: {
        userData: any;
        success: boolean;
        first_login?: boolean;
    };
}
interface IPostRegister extends ApiResponse {
    data: UserAccount;
    token: string;
}
interface IsetUpPin extends ApiResponse {
    data: any;
}

const login = (payload: Payload): Promise<ILogin> => request.post({ payload, route: routes.auth.login });

const register = (payload: Payload): Promise<IPostRegister> => request.post({ payload, route: routes.auth.register });

const enterPin = (payload: Payload): Promise<IsetUpPin> => request.post({ payload, route: routes.auth.pin });
const auth = {
    enterPin,
    login,
    register,
};

export default auth;
