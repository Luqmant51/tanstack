// hooks/useCrud.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiCall } from '../utils/apiCall.ts'
import { Result } from '../utils/result.ts'

export function useGetAll<T>(key: string, path: string) {
  return useQuery<Result<T[]>>({
    queryKey: [key],
    queryFn: () => apiCall({ path }),
  })
}

export function useGetById<T>(key: string, path: string, id: string | number) {
  return useQuery<Result<T>>({
    queryKey: [key, id],
    queryFn: () => apiCall<T>({ path: `${path}/${id}` }),
    enabled: !!id,
  })
}

export function useCreate<T>(key: string, path: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<T>) =>
      apiCall<T>({ path, method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  })
}

export function useUpdate<T>(key: string, path: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: Partial<T> }) =>
      apiCall<T>({ path: `${path}/${id}`, method: 'PUT', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  })
}

export function useDelete<T>(key: string, path: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string | number) =>
      apiCall<T>({ path: `${path}/${id}`, method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  })
}
