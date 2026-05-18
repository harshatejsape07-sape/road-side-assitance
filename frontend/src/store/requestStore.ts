import { create } from 'zustand';
import { IAssistanceRequest } from '@/types';

interface RequestState {
  currentRequest: IAssistanceRequest | null;
  requests: IAssistanceRequest[];
  isLoading: boolean;
  error: string | null;
  setCurrentRequest: (request: IAssistanceRequest | null) => void;
  setRequests: (requests: IAssistanceRequest[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addRequest: (request: IAssistanceRequest) => void;
  updateRequest: (request: IAssistanceRequest) => void;
}

export const useRequestStore = create<RequestState>((set) => ({
  currentRequest: null,
  requests: [],
  isLoading: false,
  error: null,
  setCurrentRequest: (currentRequest) => set({ currentRequest }),
  setRequests: (requests) => set({ requests }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addRequest: (request) =>
    set((state) => ({
      requests: [request, ...state.requests],
    })),
  updateRequest: (request) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === request.id ? request : r
      ),
    })),
}));

export default useRequestStore;
