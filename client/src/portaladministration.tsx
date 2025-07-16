import React, { useState } from 'react'
import { Input, Field, makeStyles, Text, tokens } from '@fluentui/react-components'

import { FluentButton } from './button/button.tsx'
import { CustomDataGrid } from './dataGrids/index.tsx'
import { useNavigate } from 'react-router-dom'
import { useDeletePortal, useGetAllPortals } from './hooks/usePortalApi.ts'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    width: '70vw',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    overflowX: 'auto',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '12px',
  },
  subHeading: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '16px 0 8px 0',
    display: 'flex',
  },
  fieldset: {
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  legend: {
    fontSize: '16px',
    fontWeight: 600,
    marginLeft: '8px',
    padding: '0 4px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'space-between',
    gap: '16px',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
  buttons: {
    marginTop: '16px',
    display: 'flex',
    gap: '12px',
  },
  borderColor: {
    '&::after': {
      borderBottom: `2px solid ${tokens.colorBrandBackground2}`,
    },
  },
})

export interface PortalRow {
  id: number
  portalName: string
  portalStatus: 'Active' | 'Inactive' | string
  [key: string]: string | number
}

const PortaladministrationForm = () => {
  const styles = useStyles()
  const { data: result } = useGetAllPortals()
  const { mutate: deletePortal } = useDeletePortal()
  const navigate = useNavigate()

  if (result?.isSuccess) {
    console.log("✅ Portals loaded:", result.value)
  } else if (result) {
    console.error("❌ API failed:", result.error)
  } else {
    console.log("⌛ Waiting for result...")
  }


  const handleEditClick = (item: PortalRow) => {
    navigate(`/portal-edit/${item.id}`)
  }

  const [filters, setFilters] = useState({
    portalName: '',
    marketerName: '',
    portalUser: '',
    marketerId: '',
  })

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleClear = () => {
    setFilters({
      portalName: '',
      marketerName: '',
      portalUser: '',
      marketerId: '',
    })
  }

  const handleAddButton = () => navigate('/portal-create')

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <Text className={styles.heading}>PORTAL ADMINISTRATION</Text>
          <Text className={styles.subHeading}>Portals</Text>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Filter</legend>

            <div className={styles.grid}>
              <Field label="Portal Name:">
                <Input
                  className={styles.borderColor}
                  value={filters.portalName}
                  onChange={handleInputChange('portalName')}
                />
              </Field>
              <Field label="Marketer Name:">
                <Input
                  className={styles.borderColor}
                  value={filters.marketerName}
                  onChange={handleInputChange('marketerName')}
                />
              </Field>
              <Field label="Portal User:">
                <Input
                  className={styles.borderColor}
                  value={filters.portalUser}
                  onChange={handleInputChange('portalUser')}
                />
              </Field>
              <Field label="Marketer ID:">
                <Input
                  className={styles.borderColor}
                  value={filters.marketerId}
                  onChange={handleInputChange('marketerId')}
                />
              </Field>
            </div>

            <div className={styles.buttons}>
              <FluentButton
                appearance="primary"
                label="Process Filter"
                shape="rounded"
                size="small"
                type="submit"
              />
              <FluentButton
                appearance="secondary"
                label="Clear"
                shape="rounded"
                size="small"
                type="button"
                onClick={handleClear}
              />
            </div>
          </fieldset>
        </form>
      </div>

      <div className={styles.container}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Listing</legend>
          <CustomDataGrid
            deleteBool
            viewBool
            editBool
            searchBool
            filters={filters}
            getRowId={item => item.id}
            items={result?.isSuccess ? result.value : []}
            label="Add New Portal"
            onDeleteClick={item => deletePortal(item.id)}
            onEditClick={handleEditClick}
            onAddButton={handleAddButton}
          />
        </fieldset>
      </div>
    </div>
  )
}

export default PortaladministrationForm
