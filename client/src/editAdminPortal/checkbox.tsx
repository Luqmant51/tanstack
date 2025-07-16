import React from 'react'
import { Checkbox } from '@fluentui/react-components'

import { useEditAdminPortalFormStyles } from './index.tsx'

const checkboxItems = [
  { label: 'Daily Summary', name: 'dailySummary' },
  { label: 'Daily Batch', name: 'dailyBatch' },
  { label: 'Daily Adjustment', name: 'dailyAdjustment' },
  { label: 'Daily Transaction', name: 'dailyTransaction' },
  { label: 'Chargebacks', name: 'chargebacks' },
  { label: 'Retrieval', name: 'retrieval' },
  { label: 'Report By Entry Method', name: 'reportByEntryMethod' },
  { label: 'Gift Card Summary', name: 'giftCardSummary' },
  { label: 'Gift Card Detail', name: 'giftCardDetail' },
  { label: 'Big Ticket Exceptions', name: 'bigTicketExceptions' },
  { label: 'MultiUse Transactions', name: 'multiUseTransactions' },
  { label: 'Monthly By Card', name: 'monthlyByCard' },
  { label: 'Monthly By Date', name: 'monthlyByDate' },
]

interface EditAdminPortalCheckBoxProps {
  selected: Record<string, boolean>
  onChange: (_updated: Record<string, boolean>) => void
}

const EditAdminPortalCheckBox = ({ selected, onChange }: EditAdminPortalCheckBoxProps) => {
  const allSelected = checkboxItems.every(item => selected[item.name])
  const styles = useEditAdminPortalFormStyles()

  const toggleAll = (checked: boolean) => {
    const newState: Record<string, boolean> = {}
    checkboxItems.forEach(item => {
      newState[item.name] = checked
    })
    onChange(newState)
  }

  const handleChange = (name: string, checked: boolean) => {
    onChange({
      ...selected,
      [name]: checked,
    })
  }

  return (
    <div className={styles.container}>
      <form onSubmit={e => e.preventDefault()}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Reports</legend>
          <div className={styles.grid}>
            <Checkbox
              checked={allSelected}
              className={styles.checkbox}
              label="Select All"
              onChange={(_updated, data) => toggleAll(data.checked as boolean)}
            />
            {checkboxItems.map(item => (
              <Checkbox
                checked={!!selected[item.name]}
                className={styles.checkbox}
                key={item.name}
                label={item.label}
                name={item.name}
                onChange={(_updated, data) => handleChange(item.name, data.checked as boolean)}
              />
            ))}
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default EditAdminPortalCheckBox
