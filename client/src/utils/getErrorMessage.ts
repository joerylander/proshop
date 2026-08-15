import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError,
): string => {
  if ('status' in error) {
    // FetchBaseQueryError: servern svarade med felstatus, eller nätverks-/parsningsfel
    if ('data' in error) {
      const data = error.data as { message?: string } | undefined;
      return data?.message ?? JSON.stringify(error.data);
    }
    return error.error; // FETCH_ERROR | TIMEOUT_ERROR | PARSING_ERROR
  }
  // SerializedError (fel kastat i klienten)
  return error.message ?? 'Something went wrong';
};
