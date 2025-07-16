export type ColumnDefinition<T> = {
  columnId: string
  renderHeaderCell: () => React.ReactNode
  renderCell: (_item: T) => React.ReactNode
  compare: (_a: T, _b: T) => number
}

export interface PortalRow {
  id: number
  portalName: string
  portalStatus: 'Active' | 'InActive'
  portalInfo: {
    portalName: string
    company: string
    activeDate: Date
    portalStatus: string
    check1: boolean
    check2: boolean
  }
  portalCredentials: {
    userName: string
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    check1: boolean
  }
  reportPreferences: Record<string, boolean>
  [key: string]: unknown
}
