import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/error";

// 🔒 Prevent duplicate toasts
let activeToastId: string | number | null = null;

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const message = getErrorMessage(error);
      if (!activeToastId) {
        activeToastId = toast.error(message, {
          onClose: () => (activeToastId = null),
        });
      }
    },
  }),

  mutationCache: new MutationCache({
    onError: (error, _variables, _context) => {
      const message = getErrorMessage(error);
      if (!activeToastId) {
        activeToastId = toast.error(message, {
          onClose: () => (activeToastId = null),
        });
      }
    },
  }),

  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export const QuerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
