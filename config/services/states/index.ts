import { ApiResponse } from '@/common/types/interfaces';
import { LocalGovernment, States, Ward } from '@/common/types';
import constants from '@config/constants';
import request from '../request';

const {
    API: { routes },
} = constants;

interface IGetStates extends ApiResponse {
    data: {
        states: States[];
    };
    totalRows: number;
}

interface IGetLocalGovernments extends ApiResponse {
    data: {
        lgas: LocalGovernment[];
    };
    totalRows: number;
}

interface IGetWards extends ApiResponse {
    data: {
        wards: Ward[];
    };
    totalRows: number;
}

const getStates = (): Promise<IGetStates> => request.get({ route: routes.states.getStates });

const getLocalGovernments = (state_id: string): Promise<IGetLocalGovernments> =>
    request.get({ route: routes.states.getLocalGovernments.replace('%state_id%', state_id) });

const getWards = (local_government_id: string): Promise<IGetWards> =>
    request.get({ route: routes.states.getWards.replace('%local_government_id%', local_government_id) });

const states = {
    getLocalGovernments,
    getStates,
    getWards,
};

export default states;
