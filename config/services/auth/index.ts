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
interface IsetUp extends ApiResponse {
    data: any;
}

const login = (payload: Payload): Promise<ILogin> => request.post({ payload, route: routes.auth.login });

const register = (payload: Payload): Promise<IPostRegister> => request.post({ payload, route: routes.auth.register });

const enterPin = (payload: Payload): Promise<IsetUp> => request.post({ payload, route: routes.auth.pin });

const verifyRegistration = (payload: Payload): Promise<ApiResponse> =>
    request.post({ payload, route: routes.auth.verifyRegistration });

const setPin = (payload: Payload): Promise<ApiResponse> => request.post({ payload, route: routes.auth.setPin });

const forgotPin = (payload: Payload): Promise<ILogin> => request.post({ payload, route: routes.auth.resetPin });

const verifyResetOtp = (payload: Payload): Promise<IsetUp> =>
    request.post({ payload, route: routes.auth.verifyResetOtp });

const confirmResetPin = (payload: Payload): Promise<ApiResponse> =>
    request.put({ payload, route: routes.auth.setUpResetPin });

const resendOtp = (): Promise<ApiResponse> => request.get({ route: routes.auth.resentOtp });

const auth = {
    confirmResetPin,
    enterPin,
    forgotPin,
    login,
    register,
    resendOtp,
    setPin,
    verifyRegistration,
    verifyResetOtp,
};

export default auth;
