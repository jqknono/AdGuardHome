import { createAction } from 'redux-actions';
import apiClient from '../api/Api';
import { addErrorToast, addSuccessToast } from './toasts';

export const getBlockedServicesRequest = createAction('GET_BLOCKED_SERVICES_REQUEST');
export const getBlockedServicesFailure = createAction('GET_BLOCKED_SERVICES_FAILURE');
export const getBlockedServicesSuccess = createAction('GET_BLOCKED_SERVICES_SUCCESS');

export const getBlockedServices = () => async (dispatch: any) => {
    dispatch(getBlockedServicesRequest());
    try {
        const data = await apiClient.getBlockedServices();
        dispatch(getBlockedServicesSuccess(data));
    } catch (error) {
        dispatch(addErrorToast({ error }));
        dispatch(getBlockedServicesFailure());
    }
};

export const getAllBlockedServicesRequest = createAction('GET_ALL_BLOCKED_SERVICES_REQUEST');
export const getAllBlockedServicesFailure = createAction('GET_ALL_BLOCKED_SERVICES_FAILURE');
export const getAllBlockedServicesSuccess = createAction('GET_ALL_BLOCKED_SERVICES_SUCCESS');

export const getAllBlockedServices = () => async (dispatch: any) => {
    dispatch(getAllBlockedServicesRequest());
    try {
        const data = await apiClient.getAllBlockedServices();
        dispatch(getAllBlockedServicesSuccess(data));
    } catch (error) {
        dispatch(addErrorToast({ error }));
        dispatch(getAllBlockedServicesFailure());
    }
};

export const updateBlockedServicesRequest = createAction('UPDATE_BLOCKED_SERVICES_REQUEST');
export const updateBlockedServicesFailure = createAction('UPDATE_BLOCKED_SERVICES_FAILURE');
export const updateBlockedServicesSuccess = createAction('UPDATE_BLOCKED_SERVICES_SUCCESS');

export const updateBlockedServices = (values: any) => async (dispatch: any) => {
    dispatch(updateBlockedServicesRequest());
    try {
        await apiClient.updateBlockedServices(values);
        dispatch(updateBlockedServicesSuccess());
        dispatch(getBlockedServices());
        dispatch(addSuccessToast('blocked_services_saved'));
    } catch (error) {
        dispatch(addErrorToast({ error }));
        dispatch(updateBlockedServicesFailure());
    }
};

export const reloadBlockedServicesRequest = createAction('RELOAD_BLOCKED_SERVICES_REQUEST');
export const reloadBlockedServicesFailure = createAction('RELOAD_BLOCKED_SERVICES_FAILURE');
export const reloadBlockedServicesSuccess = createAction('RELOAD_BLOCKED_SERVICES_SUCCESS');

export const reloadBlockedServices = () => async (dispatch: any) => {
    dispatch(reloadBlockedServicesRequest());
    try {
        await apiClient.reloadBlockedServices();
        dispatch(reloadBlockedServicesSuccess());
        dispatch(getAllBlockedServices());
        dispatch(addSuccessToast('blocked_services_reloaded'));
    } catch (error) {
        dispatch(addErrorToast({ error }));
        dispatch(reloadBlockedServicesFailure());
    }
};

export const getServiceUrlsRequest = createAction('GET_SERVICE_URLS_REQUEST');
export const getServiceUrlsFailure = createAction('GET_SERVICE_URLS_FAILURE');
export const getServiceUrlsSuccess = createAction('GET_SERVICE_URLS_SUCCESS');

export const getServiceUrls = () => async (dispatch: any) => {
    dispatch(getServiceUrlsRequest());
    try {
        const data = await apiClient.getServiceUrls();
        dispatch(getServiceUrlsSuccess(data));
    } catch (error) {
        dispatch(addErrorToast({ error }));
        dispatch(getServiceUrlsFailure());
    }
};

export const updateServiceUrlsRequest = createAction('UPDATE_SERVICE_URLS_REQUEST');
export const updateServiceUrlsFailure = createAction('UPDATE_SERVICE_URLS_FAILURE');
export const updateServiceUrlsSuccess = createAction('UPDATE_SERVICE_URLS_SUCCESS');

export const updateServiceUrls = (urls: string[]) => async (dispatch: any) => {
    dispatch(updateServiceUrlsRequest());
    try {
        await apiClient.setServiceUrls(urls);
        dispatch(updateServiceUrlsSuccess());
        dispatch(getServiceUrls());
        dispatch(getAllBlockedServices()); // 重新获取所有服务
        dispatch(addSuccessToast('service_urls_saved'));
    } catch (error) {
        dispatch(addErrorToast({ error }));
        dispatch(updateServiceUrlsFailure());
    }
};
