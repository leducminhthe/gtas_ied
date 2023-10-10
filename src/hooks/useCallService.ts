// https://usehooks-typescript.com/react-hook/use-fetch

import { useEffect, useReducer, useRef } from 'react';

interface StateType<T> {
  status: 'pending' | 'fullfilled' | 'rejected';
  data?: T;
  error?: string;
  loading:boolean;
}

type Action<T> =
  | { type: 'pending' }
  | { type: 'fullfilled'; payload: T | undefined }
  | { type: 'rejected'; payload: any };

function useCallService<T>(
  service: (...arg: any) => Promise<T>,
  dep?:any[],
): StateType<T> {
  const cancelRequest = useRef<boolean>(false);
  const serviceReducer = (state: StateType<T>, action: Action<T>): StateType<T> => {
    switch (action.type) {
      case 'pending':
        return {
          ...state,
          status: 'pending',
          loading: true,
        };
      case 'fullfilled': {
        return {
          ...state,
          status: 'fullfilled',
          data: action.payload,
          loading: false,
        };
      }
      case 'rejected':
        return {
          ...state,
          status: 'rejected',
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };

  const initialState: StateType<T> = {
    status: 'pending',
    error: undefined,
    data: undefined,
    loading: false,
  };

  const [state, dispatch] = useReducer(serviceReducer, initialState);

  useEffect(() => {
    const callService = async () => {
      dispatch({ type: 'pending' });
      try {
        const result = await service();
        dispatch({ type: 'fullfilled', payload: result });
      } catch (error) {
        dispatch({ type: 'rejected', payload: error });
      }
    };
    callService();
    // eslint-disable-next-line consistent-return
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dep);
  return state;
}

export default useCallService;
