export interface ResponseData<T> {
  success: boolean;
  object: T | null;
  errors: string[] | null;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  error?: unknown;
}
