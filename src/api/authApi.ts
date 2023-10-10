import {
  IAction, IGroup, IPage, ISignIn, IUserResponse,
} from 'types/authType';
import ApiClient from './ApiClient';

export const loginApi = async (params: {
  username: string;
  password: string;
}): Promise<ISignIn> => {
  const { data } = await ApiClient.postJsonData(
    '/identity/Auth/Login',
    {},
    params,
  );
  return data;
};

export const logoutApi = async () => {
  const { data } = await ApiClient.postJsonData(
    '/identity/Auth/Logout',
    {},
    {},
  );
  return data;
};

export const getPermission = async (): Promise<IUserResponse> => {
  const { data } = await ApiClient.get('/api/User/GetPermission', {});
  // const accessToken = getLocalStorage('token');
  // const { data } = await axios.get('http://172.16.39.135:8101/identity/Auth/GetPermission', {
  //   // const response = await axios.get(requestUrl, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     authorization: `Bearer ${accessToken}`,
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // });
  return data;
};

export const getActionApi = async (): Promise<IAction[]> => {
  const { data } = await ApiClient.get('/identity/api/Action', {});
  return data;
};

export const postActionApi = async (request: any) => {
  const { data } = await ApiClient.postJsonData(
    '/identity/api/Action',
    {},
    request,
  );
  return data;
};

export const updateActionApi = async (request: any) => {
  const { data } = await ApiClient.putJsonData(
    `/identity/api/Action/${request.id}`,
    {},
    request,
  );
  return data;
};

export const deleteActionApi = async (id: string) => {
  const { data } = await ApiClient.delete(`/identity/api/Action/${id}`, {});
  return data;
};

export const getActionDetailApi = async (id: string) => {
  const { data } = await ApiClient.get(`/identity/api/Action/${id}`, {});
  return data;
};

export const getPageApi = async (): Promise<IPage[]> => {
  const { data } = await ApiClient.get('/identity/api/Page', {});
  return data;
};
export const postPageApi = async (request: any): Promise<IPage[]> => {
  const { data } = await ApiClient.postJsonData(
    '/identity/api/Page',
    {},
    request,
  );
  return data;
};
export const updatePageApi = async (request: any): Promise<any> => {
  const { data } = await ApiClient.putJsonData(
    `/identity/api/Page/${request.id}`,
    {},
    request,
  );
  return data;
};
export const getPageDetailApi = async (id: string): Promise<any> => {
  const { data } = await ApiClient.get(`/identity/api/Page/${id}`, {});
  return data;
};
export const deletePageApi = async (id: string) => {
  const { data } = await ApiClient.delete(`/identity/api/Page/${id}`, {});
  return data;
};

export const getGroupApi = async (): Promise<IGroup[]> => {
  const { data } = await ApiClient.get('/identity/api/Group', {});
  return data;
};

export const postGroupApi = async (request: any): Promise<IGroup[]> => {
  const { data } = await ApiClient.postJsonData(
    '/identity/api/Group',
    {},
    request,
  );
  return data;
};

export const updateGroupApi = async (request: any): Promise<any> => {
  const { data } = await ApiClient.putJsonData(
    `/identity/api/Group/${request.id}`,
    {},
    request,
  );
  return data;
};

export const deleteGroupApi = async (id: string) => {
  const { data } = await ApiClient.delete(`/identity/api/Group/${id}`, {});
  return data;
};

export const getDetailGroup = async (id: string): Promise<IGroup> => {
  const { data } = await ApiClient.get(`/identity/api/Group/${id}`, {});
  return data;
};

export const getUserList = async (request: any): Promise<IUserResponse[]> => {
  const { data } = await ApiClient.get(
    '/identity/api/User/Search',
    {},
    request,
  );
  return data;
};

export const getUserDetail = async (id: string): Promise<IUserResponse> => {
  const { data } = await ApiClient.get(`/identity/api/User/Get/${id}`, {});
  return data;
};

export const getDataProductList = async (request: any): Promise<any> => {
  const { data } = await ApiClient.get(
    '/api/production/Production/gettblFR_ProductSWMWfxStyle',
    {},
    request,
  );
  return data;
};

export const getDataListPending = async (): Promise<any> => {
  const { data } = await ApiClient.get(
    '/api/production/Production/GetStyleSWMByWFXStyle',
    {},
  );
  return data;
};

export const setAdmin = async (id: string): Promise<boolean> => {
  const { data } = await ApiClient.postJsonData(
    '/identity/api/User/SetAdmin',
    {},
    id,
  );
  return data;
};

export const removeAdmin = async (id: string): Promise<boolean> => {
  const { data } = await ApiClient.postJsonData(
    '/identity/api/User/RemoveAdmin',
    {},
    id,
  );
  return data;
};

export const updateUser = async (request: any): Promise<any> => {
  const { data } = await ApiClient.putJsonData(
    '/identity/api/User/Update',
    {},
    request,
  );
  return data;
};

export const postUser = async (request: any): Promise<any> => {
  const { data } = await ApiClient.postJsonData(
    '/identity/api/User/Create',
    {},
    request,
  );
  return data;
};
