import { PortalRow } from '../types/types'
import { useGetAll, useDelete, useCreate, useUpdate } from './useCrud.ts'

const API_PATH = '/api/portals'
const QUERY_KEY = 'portals'

export function useGetAllPortals() {
  return useGetAll<PortalRow>(QUERY_KEY, API_PATH)
}

export function useDeletePortal() {
  return useDelete<PortalRow>(QUERY_KEY, API_PATH)
}

export function useCreatePortal() {
  return useCreate<PortalRow>(QUERY_KEY, API_PATH)
}

export function useUpdatePortal() {
  return useUpdate<PortalRow>(QUERY_KEY, API_PATH)
}
