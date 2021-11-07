import { useState } from "react";
import { requests, RequestParams, Response } from "@common/helpers/requests";

export interface UseRequestParams extends RequestParams {
  onSuccess?: (response: Response) => any;
  onError?: (response: Response) => any;
}

export interface UseRequestState {
  data?: any;
  error?: any;
  errors?: any[];
  result?: boolean;
  loading?: boolean;
}

const INITIAL_STATE: UseRequestState = { data: false, errors: [], error: false, result: false, loading: false };

export const useRequest = ({ onSuccess, onError, ...p }: Partial<UseRequestParams> = {}) => {
  const [state, setState] = useState<UseRequestState>(INITIAL_STATE);

  const request = async (params: Partial<RequestParams> = {}) => {
    setState((prevState) => ({ ...prevState, errors: [], error: false, loading: true }));

    try {
      const { data }: Response = await requests.request({ ...p, ...params } as RequestParams);

      setState((prevState) => ({ ...prevState, ...data, loading: false }));

      if (data?.result) {
        onSuccess?.(data);
      } else {
        onError?.(data);
      }

      return data;
    } catch (e) {
      const data = e?.response?.data;

      onError?.(data);

      setState((prevState) => ({ ...prevState, ...data, loading: false }));
    }
  };

  return { ...state, request };
};

export default useRequest;
