import { ApiResponse } from '@/common/types/interfaces';
import { UserAccount } from '@/common/types';
import constants from '@config/constants';
import request from '../request';
import { Payload } from '../../../components/common/types/index';

const {
    API: { routes },
} = constants;

// export interface IGetUserDetails extends ApiResponse {
//     data: UserAccount;
// }

interface IGetFarmsDetails extends ApiResponse {
    data?: any;
}

const getFarmDetails = (): Promise<IGetFarmsDetails> => request.get({ route: routes.farms.getFarmsInfo });
// const editProfile = (payload: Payload): Promise<ApiResponse> =>
//     request.put({ payload, route: routes.farms.getFarmsInfo });
const farms = {
    // editProfile,
    getFarmDetails,
};

export default farms;
