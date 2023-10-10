/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import moment from 'moment';
// import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { clearInitData } from 'redux/permission/action';

// import { setIsAuth, setStaffDetail } from '../redux/auth/actions';

import { getPermission } from 'api/authApi';
import { setIsAuth, setStaffDetail } from 'store/auth';
import { useAppDispatch } from 'store/hooks';
import {
  featureCodeRecord, IRoleResponses, SeverEnum,
} from 'types/authType';
import { decodeJwt, removeLocalStorage, setLocalStorage } from 'utils/authUtil';
import {
  LIVE_URL, LIVE_URL_QC, TEST_URL, TEST_URL_QC,
} from 'utils/constants';

const testUrlProduction = TEST_URL;
const liveDomainProduction = LIVE_URL;
const testUrlQC = TEST_URL_QC;
const liveUrlQc = LIVE_URL_QC;
export const getConnection = (sever: SeverEnum, typeConnection: 'PRODUCTION' | 'QC') => {
  switch (typeConnection) {
    case 'PRODUCTION':
      if (sever === SeverEnum.Live) {
        return liveDomainProduction;
      }
      if (sever === SeverEnum.Test) {
        return testUrlProduction;
      }
      return '';
    case 'QC':
      if (sever === SeverEnum.Live) {
        return liveUrlQc;
      }
      if (sever === SeverEnum.Test) {
        return testUrlQC;
      }
      return '';
    default: return '';
  }
};
const useAuth = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const signin = async (email: string, password: string, sever: SeverEnum) => {
    try {
      const params = {
        username: email,
        password,
      };
      // dispatch(clearInitData());
      dispatch(setIsAuth(false));
      const connection = getConnection(sever, 'PRODUCTION');
      const severConnect = sever;
      if (!connection) {
        throw Error('Error');
      }
      // const { data: res } = await axios.post(`${connection}/identity/Auth/Login`, params);
      const { data: res } = await axios.post('http://172.16.39.135:8101/identity/Auth/Login', params);
      if (!res.token) {
        throw Error(res.message);
      }
      const {
        token, userId, refreshToken, isAdmin, ...rest
      } = res;
      setLocalStorage('isAdmin', isAdmin);
      setLocalStorage('token', token || '');
      setLocalStorage('userId', userId);
      setLocalStorage('refreshToken', refreshToken || '');
      setLocalStorage('connection', connection);
      setLocalStorage('server', severConnect);
      const decodeToken = decodeJwt(token);
      setLocalStorage('expiredToken', moment(new Date(decodeToken.exp * 1000)).utcOffset(7).format('YYYY-MM-DD HH:mm:ss'));
      const response = await getPermission();
      const IS_ADMIN = response?.isAdmin ?? false;
      const roleDetailMap = new Map<IRoleResponses['featureCode'], IRoleResponses>(Object.values(featureCodeRecord).map((item) => {
        const target = response.permission.find((ele) => ele.featureCode === item);
        return [item, {
          featureCode: item,
          possibleToCreate: IS_ADMIN ? true : target?.actions.Create ?? false,
          possibleToRead: IS_ADMIN ? true : target?.actions.Read ?? false,
          possibleToExport: IS_ADMIN ? true : target?.actions.Export ?? false,
          possibleToApprove: IS_ADMIN ? true : target?.actions.Approve ?? false,
          possibleToImport: IS_ADMIN ? true : target?.actions.Import ?? false,
          possibleDelete: IS_ADMIN ? true : target?.actions.Delete ?? false,
          possibleToTransfer: IS_ADMIN ? true : target?.actions.Transfer ?? false,
          possibleToLock: IS_ADMIN ? true : target?.actions.Lock ?? false,
          possibleToUpdate: IS_ADMIN ? true : target?.actions.Update ?? false,
          possibleToConfirm: IS_ADMIN ? true : target?.actions.Confirm ?? false,
          possibleToUnLock: IS_ADMIN ? true : target?.actions.Unlock ?? false,
          possibleToReject: IS_ADMIN ? true : (target?.actions?.Reject ?? false),
        }];
      }));
      // permissionGroupAccess
      const wfxSampleOrderAccess = roleDetailMap.get(featureCodeRecord.WFX_SAMPLE_ORDER);
      const sampleRequestAccess = roleDetailMap.get(featureCodeRecord.SAMPLE_REQUEST);
      const transactionAccess = roleDetailMap.get(featureCodeRecord.TRANSACTION);
      const userPermissionAccess = roleDetailMap.get(featureCodeRecord.USER_PERMISSION);
      const reportAccess = roleDetailMap.get(featureCodeRecord.REPORT);
      const mapUserGroupAccess = roleDetailMap.get(featureCodeRecord.MAP_USER_GROUP);
      const mapUserSiteAccess = roleDetailMap.get(featureCodeRecord.MAP_USER_SITE);
      const bookSRAccess = roleDetailMap.get(featureCodeRecord.BOOK_SR);
      const sampleRequestDetailAccess = roleDetailMap.get(featureCodeRecord.SAMPLE_REQUEST_DETAIL);
      const permissionGroupAccess = roleDetailMap.get(featureCodeRecord.PERMISSION_GROUP);
      const operationDetailAccess = roleDetailMap.get(featureCodeRecord.OPERATION_DETAIL);
      const warehouseRptAccess = roleDetailMap.get(featureCodeRecord.warehouse_rpt);
      const stockRptAccess = roleDetailMap.get(featureCodeRecord.stock_rpt);
      const inventoryRptAccess = roleDetailMap.get(featureCodeRecord.inventory_rpt);

      console.log({
        wfxSampleOrderAccess,
        sampleRequestAccess,
        transactionAccess,
        userPermissionAccess,
        reportAccess,
        mapUserGroupAccess,
        mapUserSiteAccess,
        bookSRAccess,
        sampleRequestDetailAccess,
        permissionGroupAccess,
        operationDetailAccess,
        warehouseRptAccess,
        stockRptAccess,
        inventoryRptAccess,
      });
      dispatch(setIsAuth(true));// token is valid
      dispatch(setStaffDetail({
        staffDetail: { ...res },
        roles: {
          wfxSampleOrderAccess,
          sampleRequestAccess,
          transactionAccess,
          userPermissionAccess,
          reportAccess,
          mapUserGroupAccess,
          mapUserSiteAccess,
          bookSRAccess,
          sampleRequestDetailAccess,
          permissionGroupAccess,
          operationDetailAccess,
          warehouseRptAccess,
          stockRptAccess,
          inventoryRptAccess,
        },
        isAdmin,
        defaultFactory: response.defaultFactory,
      }));
    } catch (error: any) {
      const { message: message2, ...rest2 } = error;
      throw Error(message2 || rest2?.response?.data);
    }
  };

  const signup = (email: string, password: string) => {
    //
  };

  const signout = () => {
    // logoutApi();
    dispatch(setStaffDetail({
      staffDetail: {} as any,
      roles: {},
      isAdmin: false,
      defaultFactory: undefined,
    }));
    dispatch(setIsAuth(false));
    removeLocalStorage('isAdmin');
    removeLocalStorage('token');
    removeLocalStorage('userId');
    removeLocalStorage('refreshToken');
    removeLocalStorage('connection');
    removeLocalStorage('server');
    // history.go(0);
    history.push('/login');
  };

  return {
    signin,
    signup,
    signout,
    // onAuthenticated,
  };
};

export default useAuth;
