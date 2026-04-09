import axios, { AxiosError } from "axios";

type ApiError = {
  message?: string;
  errorCode?: string;
};

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    return (
      axiosError.response?.data?.message || // backend message
      axiosError.message || // axios message
      "Something went wrong"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}
