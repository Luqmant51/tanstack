import React, { useMemo, useState, useEffect } from 'react'
import {
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  TableColumnId,
  Input,
  makeStyles,
  tokens,
} from '@fluentui/react-components'
import { Edit20Regular, Delete20Regular } from '@fluentui/react-icons'
import { FluentButton } from '../button/button.tsx'

const useStyles = makeStyles({
  tableWrapper: {
    '@media (min-width: 1000px)': {
      minWidth: '1000px',
    },
  },
  dataGridBodyWrapper: {
    height: 'auto',
  },
  controls: {
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    flexWrap: 'wrap',
  },
  pagination: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    '@media (min-width: 600px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  borderColor: {
    '&::after': {
      borderBottom: `2px solid ${tokens.colorBrandBackground2}`,
      transition: 'border-bottom 1s ease-in-out',
    },
    ':focus-within:active::after': {
      borderBottom: `2px solid ${tokens.colorBrandBackground2}`,
    },
  },
})

type CustomDataGridProps<T extends Record<string, unknown>> = {
  items?: T[]
  getRowId?: (_item: T) => number | string
  filters?: {
    portalName?: string
    marketerName?: string
    portalUser?: string
    marketerId?: string
  }
  label?: string
  searchBool?: boolean
  viewBool?: boolean
  deleteBool?: boolean
  editBool?: boolean
  size?: 'medium' | 'small' | 'large'
  onEditClick?: (_item: T) => void
  onDeleteClick?: (_item: T) => void
  onAddButton?: () => void
}

type ColumnDefinition<T> = {
  columnId: string
  renderHeaderCell: () => React.ReactNode
  renderCell: (_item: T) => React.ReactNode
  compare: (_a: T, _b: T) => number
}

export function CustomDataGrid<T extends Record<string, unknown>>({
  items = [],
  getRowId,
  filters = {},
  searchBool,
  deleteBool,
  viewBool,
  editBool,
  onEditClick,
  onDeleteClick,
  onAddButton,
  label
}: CustomDataGridProps<T>) {
  const styles = useStyles()
  const [filter, setFilter] = useState('')
  const [internalItems, setInternalItems] = useState<T[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    if (items && Array.isArray(items)) {
      setInternalItems(items)
    } else {
      setInternalItems([])
    }
  }, [items])

  const getCellFocusMode = (columnId: TableColumnId): 'cell' | 'group' =>
    columnId === 'edit' || columnId === 'delete' ? 'group' : 'cell'

  const generateColumns = useMemo(() => {
    if (internalItems.length === 0) return []

    const sample = internalItems[0]
    const keys = Object.keys(sample).filter(k => k !== 'id')

    const columns: ColumnDefinition<T>[] = keys.map(key => ({
      columnId: key,
      renderHeaderCell: () => (
        <div style={{ minWidth: '120px' }}>
          {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
        </div>
      ),
      renderCell: (item: T) => (
        <div style={{ width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {String(item[key])}
        </div>
      ),
      compare: (a: T, b: T) => {
        const aVal = a[key]
        const bVal = b[key]
        if (typeof aVal === 'string' && typeof bVal === 'string') return aVal.localeCompare(bVal)
        if (typeof aVal === 'number' && typeof bVal === 'number') return aVal - bVal
        return 0
      },
    }))

    if (viewBool) {
      columns.unshift({
        columnId: 'view',
        renderHeaderCell: () => <div style={{ minWidth: '80px' }}>VIEW</div>,
        renderCell: (item: T) => {
          const id = getRowId ? getRowId(item) : '#'
          return (
            <a
              href={`#${id}`}
              style={{
                color: tokens.colorBrandForeground1,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              View
            </a>
          )
        },
        compare: () => 0,
      })
    }

    if (deleteBool) {
      columns.unshift({
        columnId: 'delete',
        renderHeaderCell: () => <div style={{ minWidth: '80px' }}>DELETE</div>,
        renderCell: (item: T) => (
          <Delete20Regular
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this row?')) {
                onDeleteClick?.(item)
              }
            }}
          />
        ),
        compare: () => 0,
      })
    }

    if (editBool) {
      columns.unshift({
        columnId: 'edit',
        renderHeaderCell: () => 'EDIT',
        renderCell: (item: T) => (
          <Edit20Regular
            style={{ cursor: 'pointer' }}
            onClick={() => onEditClick?.(item)}
          />
        ),
        compare: () => 0,
      })
    }

    return columns
  }, [internalItems, deleteBool, editBool, onEditClick, onDeleteClick, getRowId])

  const filteredData = useMemo(() => {
    return internalItems.filter(item => {
      const matches = (val: string | undefined, key: keyof T) =>
        !val || String(item[key] ?? '').toLowerCase().includes(val.toLowerCase())

      return (
        matches(filters.portalName, 'portalName' as keyof T) &&
        matches(filters.marketerName, 'marketerName' as keyof T) &&
        matches(filters.portalUser, 'portalUser' as keyof T) &&
        matches(filters.marketerId, 'marketerId' as keyof T)
      )
    })
  }, [filters, internalItems])

  const fullyFilteredData = useMemo(() => {
    if (!filter.trim()) return filteredData
    const lowerFilter = filter.toLowerCase()
    return filteredData.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(lowerFilter)),
    )
  }, [filter, filteredData])

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(fullyFilteredData.length / pageSize))
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [fullyFilteredData.length, pageSize, currentPage])

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return fullyFilteredData.slice(start, start + pageSize)
  }, [fullyFilteredData, currentPage, pageSize])

  const totalPages = Math.max(1, Math.ceil(fullyFilteredData.length / pageSize))

  const pageSizeOptions = [5, 10, 20, 50, 75, 100, 150, 200, 300].filter(
    size => size <= fullyFilteredData.length,
  )
  if (pageSizeOptions.length === 0) pageSizeOptions.push(fullyFilteredData.length)

  return (
    <div>
      <div className={styles.controls}>
        {searchBool && (
          <Input
            className={styles.borderColor}
            placeholder="Search..."
            size="small"
            style={{ flex: 1, maxWidth: '250px' }}
            value={filter}
            onChange={e => {
              setFilter(e.target.value)
              setCurrentPage(1)
            }}
          />
        )}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span>Show{' '}</span>
          <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span>{' '}entries</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <DataGrid
          sortable
          columns={generateColumns}
          getRowId={getRowId}
          items={paginatedItems}
          resizableColumnsOptions={{ autoFitColumns: true }}
        >
          <DataGridHeader>
            <DataGridRow>
              {(args: { renderHeaderCell: () => React.ReactNode }) => (
                <DataGridHeaderCell>{args.renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <div className={styles.dataGridBodyWrapper}>
            <DataGridBody>
              {({ item, rowId }) => (
                <DataGridRow key={rowId}>
                  {({ renderCell, columnId }) => (
                    <DataGridCell focusMode={getCellFocusMode(columnId)}>
                      {renderCell(item)}
                    </DataGridCell>
                  )}
                </DataGridRow>
              )}
            </DataGridBody>
          </div>
        </DataGrid>
      </div>

      <div className={styles.pagination}>
        <div>
          Showing{' '}
          <strong>{fullyFilteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> to{' '}
          <strong>{Math.min(currentPage * pageSize, fullyFilteredData.length)}</strong> of{' '}
          <strong>{fullyFilteredData.length}</strong> entries
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <FluentButton
            appearance="secondary"
            disabled={currentPage === 1}
            label="Previous"
            shape="rounded"
            size="small"
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          />
          <div>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></div>
          <FluentButton
            appearance="secondary"
            disabled={currentPage * pageSize >= fullyFilteredData.length}
            label="Next"
            shape="rounded"
            size="small"
            onClick={() => setCurrentPage(p => p + 1)}
          />
        </div>
      </div>
      {label && <FluentButton
        appearance="primary"
        label={label}
        shape="rounded"
        size="small"
        onClick={onAddButton}
      />}
    </div>
  )
}
