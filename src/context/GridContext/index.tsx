/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/require-default-props */
import { ColumnState, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AppState } from 'hooks/useGridHook';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from 'utils/authUtil';
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import reducer from './reducer';

interface AppContextInt extends AppState {
  setRowData: (
    data: any,
    isSelectedAll?: boolean,
    isClearAllFilter?: boolean
  ) => void;
  openModalTable?: () => void;
  openModalSize?: () => void;
  openModalWashing?: () => void;
  openModal?: (data?: any) => void;
  closeModal?: () => void;
  pinColumn: (list: string) => void;
  selectValue?: (idTemp: string, rowData?: any[]) => void;
  selectValueTPCheckList?: (idTemp: string, rowData?: any[]) => void;
  unSelectValue?: (idTemp: string) => void;
  selectAllFunc?: (value: boolean, rowData?: any[]) => void;
  setActiveMenu?: (idTemp: string) => void;
  setNotActiveMenu?: (idTemp: string) => void;
  setGridApi?: (event: GridReadyEvent) => void;
  resetState?: () => void;
  restoreState?: (gridApiTemp?: GridReadyEvent | undefined) => void;
  saveState?: () => void;
  setTextHighLight?: (text: string) => void;
  setOrderData?: (data: any) => void;
  selectValueRedux?: (data: any) => void;
  handleSetSelectRow?: (data: any) => void;
  handleListShowDate?: () => void;
  setAddingAction?: () => void;
  setEditingAction?: (payload: any) => void;
  clearEditAddAction?: (data: any) => void;
  setCreateAdmin?: (data?: any) => void;
  setIsAdiminUserPermission?: (data?: any) => void;
  removeAdiminUserPermission?: (data?: any) => void;
  setDataUserPerGroup?: (data: any) => void;
  handleOpenModalUserPermisson?: (data?: any) => void;
  handleOpenModal?: (dataModal?: any) => void;
  /* closeCancelModal?:() =>void,
  handleOpenCancel?:(dataModal?:any) =>void,
  handleCancelTransaction?:(dataModal?:any) =>void,
  cancelModal?:boolean, */
  handleUpdateUserModalDetail?: (dataModal?: any, checked?: boolean) => void;
  handleDeleteModal?: (dataModal?: any) => void;
  widthScreen?: number;
  setOptionsData?: (payload: any) => void;
  setSampleID?: (payload: any) => void;
  selectValueWfxUser: (idTemp: string) => void;
  selectValueUserDetail: (idTemp: string) => void;
  selectValueUserDetailView: (data: any) => void;
  setListSelectOperationParent: (data: any) => void;
  clearListWfxUser: () => void;
  clearListUserDetail: () => void;
  clearListUserDetailView: () => void;
  mapData?: Map<any, any>;
  changleMapData?: any;
  replaceMapData?: (data: any) => void;
  callback?: any;
  disabledGridAction?: boolean;
  restartStore?: () => void;
  selectOperationList: (idTemp: string) => void;
  setMapData: any;
  dispatch: any;
  hiddenPinColumn?: boolean;
  setBookDetail?: (data: any) => void;
  setListBookData?: (data: any) => void;
  setListBookSrData?: (data: any) => void;
  setListSizeBookSR?: (data: any) => void;
  setListOperationBookSR?: (data: any) => void;
  setListSelectOperations?: (data: any) => void;
  selectValueUserDetailPermission?: (data: any) => void;
  setListPageName?: (data: any) => void;
  clearListSelect3D?: () => void;
  conditions?: any;
  errorData?: Set<any>;
  dataGlobal?: any;
  autoFillItem?: any;
  copyFunction?: any;
  pasteFunction?: any;
  showEditButton?: any;
  showDeleteButton?: any;
}

// eslint-disable-next-line import/prefer-default-export
export const AppContext = createContext<AppContextInt>({} as AppContextInt);

export const GridProvider: React.FC<{
  children: React.ReactNode;
  initState?: AppState;
  isClearAllFilterGrid?: any;
}> = ({
  children, initState, isClearAllFilterGrid,
}) => {
  const [store, dispatch] = useReducer(reducer, {
    doubleClickToDetail: true,
    rowData: [],
    modal: false,
    listPinColumn: [] as string[],
    isSelectAll: false,
    checkList: [] as string[],
    listDataTable: [],
    selectAllValue: false,
    isClearAllFilter: false,
    listActiveMenu: [],
    gridApi: undefined,
    name: 'UNKNOWN_TABLE',
    textHighLight: '',
    hiddenSelect: false,
    rowSelected: null,
    listShowDate: ['materialDate', 'o_DD_1'],
    ...initState,
  });

  const { gridApi, name } = store;
  const setRowData = (
    tempData: any[],
    isSelectedAll = false,
    isClearAllFilter = false,
  ) => {
    dispatch({
      type: 'SET_ROW_DATA',
      payload: { data: tempData, isSelectedAll, isClearAllFilter },
    });
  };

  const selectAllFunc = useCallback(
    (value: boolean, replaceRowData = store.rowData) => {
      // const instances = gridApi?.api?.getCellRendererInstances();
      const listIdTemp = [] as any[];
      // if (instances) {

      // }
      // instances.forEach((instance: any) => {
      //   const { params: { data } } = instance;
      //   listIdTemp.push(data.idReplace);
      // });
      replaceRowData.forEach((data: any) => {
        listIdTemp.push(data.idReplace);
      });
      if (value) {
        const newState = [...store.checkList, ...listIdTemp];
        const temp = replaceRowData.filter((item: any) => newState.some((j) => item.idReplace === j));
        dispatch({
          type: 'SELECT_ALL',
          payload: {
            rowSelect: newState,
            listData: temp,
            value,
          },
        });
        // setValue('exportOrder', temp.length);
      } else {
        dispatch({
          type: 'UN_SELECT_ALL',
          payload: listIdTemp,
        });
        // setValue('exportOrder', '');
      }
    },
    [store.rowData, gridApi, store.checkList],
  );

  const selectValue = useCallback(
    (idTemp: string, replaceRowData = store.rowData) => {
      if (store.checkList.includes(idTemp)) {
        const newState = store.checkList.filter((item: any) => item !== idTemp);
        const temp = replaceRowData.filter((item: any) => newState.some((j: any) => item.idReplace === j));
        dispatch({
          type: 'SELECT_ROW',
          payload: { rowSelect: newState, listData: temp },
        });
        // setValue('exportOrder', newState.length);
      } else {
        const newState = [...store.checkList, idTemp];
        const temp = replaceRowData.filter((item: any) => newState.some((j) => item.idReplace === j));
        dispatch({
          type: 'SELECT_ROW',
          payload: { rowSelect: newState, listData: temp },
        });
        // setValue('exportOrder', newState.length);
      }
    },
    [store.rowData, store.checkList],
  );

  const unSelectValue = useCallback((idTemp: string) => {
    dispatch({ type: 'UN_SELECT_ROW', payload: idTemp });
  }, []);

  const selectValueRedux = useCallback((data: any) => {
    dispatch({ type: 'SELECT_ROW_REDUX', payload: data });
  }, []);

  const pinColumn = (id: string) => {
    if (gridApi) {
      if (store.listPinColumn.includes(id)) {
        const newState = store.listPinColumn.filter((item: any) => item !== id);
        gridApi.columnApi.applyColumnState({
          state: newState.map((item: any) => ({ colId: item, pinned: 'left' })),
          defaultState: { pinned: null },
        });
        dispatch({ type: 'PIN_ROW', payload: newState });
      } else {
        const newState = [...store.listPinColumn, id];
        gridApi.columnApi.applyColumnState({
          state: newState.map((item) => ({ colId: item, pinned: 'left' })),
          defaultState: { pinned: null },
        });
        dispatch({ type: 'PIN_ROW', payload: newState });
      }
    }
  };

  const setActiveMenu = useCallback((idTemp: string) => {
    dispatch({ type: 'SET_ACTIVE_MENU', payload: idTemp });
    // callBack && callBack(true);
  }, []);

  const setNotActiveMenu = useCallback((idTemp: string) => {
    dispatch({ type: 'SET_NOT_ACTIVE_MENU', payload: idTemp });
    // callBack && callBack(false);
  }, []);

  const setGridApi = useCallback((params: GridReadyEvent) => {
    dispatch({ type: 'SET_GRID_API', payload: params });
  }, []);

  const saveState = useCallback(() => {
    if (gridApi) {
      // (window as any).colState = gridApi.columnApi.getColumnState();
      const temp = gridApi.columnApi.getColumnState();
      const target: string[] = [];
      temp.forEach((element: any) => {
        if (element.pinned && element.colId) {
          target.push(element.colId);
        }
      });
      dispatch({ type: 'PIN_ROW', payload: target });
      setLocalStorage(name || 'UNKNOWN_TABLE', JSON.stringify(temp));
    }
  }, [gridApi]);

  const restoreState = useCallback(
    (gridApiTemp: GridReadyEvent | undefined = gridApi) => {
      try {
        const stateColumn: ColumnState[] = JSON.parse(
          getLocalStorage(name || 'UNKNOWN_TABLE'),
        );
        if (!stateColumn) {
          return;
        }
        const target: string[] = [];
        stateColumn.forEach((element) => {
          if (element.pinned && element.colId) {
            target.push(element.colId);
          }
        });
        dispatch({ type: 'PIN_ROW', payload: target });
        if (gridApiTemp) {
          gridApiTemp.columnApi.applyColumnState({
            state: stateColumn,
            applyOrder: true,
          });
        }
      } catch (error: any) {
        removeLocalStorage(name || 'UNKNOWN_TABLE');
      }
    },
    [gridApi],
  );

  const resetState = useCallback(() => {
    if (gridApi) {
      gridApi.columnApi.resetColumnState();
      removeLocalStorage(name || 'UNKNOWN_TABLE');
      dispatch({ type: 'PIN_ROW', payload: [] });
    }
  }, [gridApi]);

  const setTextHighLight = useCallback((text: string) => {
    dispatch({ type: 'SET_TEXT_HIGHLIGHT', payload: text });
  }, []);

  const handleSetSelectRow = useCallback((row: any) => {
    dispatch({ type: 'SET_SELECT_ROW', payload: row });
  }, []);

  const handleListShowDate = useCallback(() => ['materialDate', 'o_DD_1'], []);

  useEffect(() => {
    if (isClearAllFilterGrid) {
      dispatch({ type: 'CLEAR_ALL' });
    }
  }, [isClearAllFilterGrid]);
  return (
    <AppContext.Provider
      value={{
        ...store,
        setRowData,
        pinColumn,
        setActiveMenu,
        setNotActiveMenu,
        saveState,
        setGridApi,
        restoreState,
        resetState,
        selectAllFunc,
        selectValue,
        unSelectValue,
        setTextHighLight,
        selectValueRedux,
        handleSetSelectRow,
        handleListShowDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
