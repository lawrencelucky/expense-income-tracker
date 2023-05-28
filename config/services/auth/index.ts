import { ApiResponse } from '@/common/types/interfaces';
import { Payload } from '@/common/types';
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

const login = (payload: Payload): Promise<ILogin> => request.post({ payload, route: routes.auth.login });

const auth = {
    login,
};

export default auth;
