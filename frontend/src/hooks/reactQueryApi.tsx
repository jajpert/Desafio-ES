import { AxiosError, AxiosResponse } from "axios";
import { MutationFunction, useMutation, useQuery } from "@tanstack/react-query";
import { ResponseData } from "../types/responseData.types";
import axios from "./axios";

function useFetchData<T = unknown>(
  queryKey: unknown[],
  url: string,
  staleTime: number,
  gcTime: number,
): ResponseData<T> {
  const { data, isLoading, isError, error, isFetching } = useQuery<
    AxiosResponse<ResponseData<T>>,
    AxiosError
  >({
    queryKey,
    queryFn: async () => await axios<ResponseData<T>>({ method: "get", url }),
    staleTime,
    gcTime,
  });

  const result = {
    success: data?.data.success,
    object: data?.data.object || null,
    errors: data?.data.errors || null,
    isLoading: isLoading,
    isFetching: isFetching,
    isError: isError,
    error: error,
  } as ResponseData<T>;

  return result;
}

function useMutationQuery<TResquest, TResult>(
  mutationFn: MutationFunction<ResponseData<TResult>, TResquest>,
  mutationKey?: unknown[],
) {
  return useMutation<ResponseData<TResult>, AxiosError, TResquest>({
    mutationKey,
    mutationFn,
  });
}

export { useFetchData, useMutationQuery };
