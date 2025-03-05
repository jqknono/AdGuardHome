import { handleActions } from 'redux-actions';

import * as actions from '../actions/index';

const serviceTypeReducer = handleActions(
    {
        [actions.getServiceTypeRequest.toString()]: (state: string) => state,
        [actions.getServiceTypeFailure.toString()]: (state: string) => state,
        [actions.getServiceTypeSuccess.toString()]: (_, { payload }: any) => payload.service_type,
    },
    '',
);

export default serviceTypeReducer;