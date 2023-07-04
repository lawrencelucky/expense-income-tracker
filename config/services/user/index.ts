import { ApiResponse } from '@/common/types/interfaces';
import { UserAccount } from '@/common/types';
import constants from '@config/constants';
import request from '../request';
import { Payload } from '../../../components/common/types/index';

const {
    API: { routes },
} = constants;

export interface IGetUserDetails extends ApiResponse {
    data: UserAccount;
}
interface Upload {
    photo: string;
}

const getDetails = (): Promise<IGetUserDetails> => request.get({ route: routes.user.profile });
const editProfile = (payload: Payload): Promise<ApiResponse> => request.put({ payload, route: routes.user.profile });
const uploadImage = (payload: Upload): Promise<ApiResponse> => request.post({ payload, route: routes.user.uploadImg });
const user = {
    editProfile,
    getDetails,
    uploadImage,
};

export default user;
