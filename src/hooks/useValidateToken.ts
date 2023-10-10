import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { setIsAuth, setStaffDetail } from '../redux/auth/actions';

import { getPermission } from 'api/authApi';
import { setIsAuth, setStaffDetail } from 'store/auth';
import { useAppDispatch } from 'store/hooks';
import { featureCodeRecord, IRoleResponses } from 'types/authType';
import { getLocalStorage, removeLocalStorage } from 'utils/authUtil';

/**
 * Check token's validity
 * if valid, set isAuth to True
 */
const useValidateToken = () => {
  const dispatch = useAppDispatch();
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const accessToken = getLocalStorage('token');

  const validate = async (tokenToValidate: string) => {
    if (isTokenChecked) return;
    try {
      console.log('accessToken', tokenToValidate);
      if (!tokenToValidate) throw new Error();
      const isAuthorized = true;
      // setLocalStorage('useInfo', JSON.stringify(response));
      const response = await getPermission();
      const IS_ADMIN = response?.isAdmin ?? false;
      // const tempArray = Array.from(
      //   { length: 9 },
      //   (_, index) => {
      //     const start = index * maxMoviePerPage;
      //     return filterDefectListData.slice(start, start + maxMoviePerPage);
      //   },
      // );

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

      dispatch(setIsAuth(isAuthorized));// token is valid
      dispatch(setStaffDetail({
        staffDetail: { ...response },
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
        isAdmin: IS_ADMIN,
        defaultFactory: response.defaultFactory,
      }));
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
        warehouseRptAccess,
        stockRptAccess,
        inventoryRptAccess,
      });
      setIsTokenChecked(true);
    } catch (error) {
      setIsTokenChecked(true);
      removeLocalStorage('token');
      removeLocalStorage('userId');
      removeLocalStorage('refreshToken');
      removeLocalStorage('userInfo');
    }
  };
  useEffect(() => {
    validate(accessToken);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTokenChecked]);

  return {
    isTokenChecked,
  };
};

export default useValidateToken;
