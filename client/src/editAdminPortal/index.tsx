import React, { useState } from 'react'
import { makeStyles, tokens } from '@fluentui/react-components'


import EditAdminPortalCheckBox from './checkbox.tsx'
import PortalsInformation from './portalsInformation.tsx'
import PortalsCredentials from './portalsCredentials.tsx'
import AssociateMarketers from './associateMarketers.tsx'
import StoresGrid from './storesGrid.tsx'
import { FluentButton } from '../button/button.tsx'
import { PortalRow } from '../portaladministration.tsx'
import { useParams } from 'react-router-dom'

export const useEditAdminPortalFormStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '15px',
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
  checkbox: {
    color: 'black',
    '& input[type="checkbox"]:checked + div': {
      backgroundColor: tokens.colorBrandBackground2,
      border: `2px solid ${tokens.colorBrandBackground2}`,
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
  hoverDropDown: {
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundSelected,
    },
  },
})

const EditAdminPortalForm = () => {
  const { id } = useParams()
  const styles = useEditAdminPortalFormStyles()
  const [checkboxSelections, setCheckboxSelections] = useState<Record<string, boolean>>({})
  const [portalInfo, setPortalInfo] = useState({
    portalName: '',
    company: '',
    activeDate: new Date(),
    portalStatus: '',
    check1: '',
    check2: '',
  })

  const [portalCredentials, setPortalCredentials] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    check1: '',
  })

  const handleSave = () => {
    console.log('Saving portal info:', portalInfo)
    console.log('Saving credentials:', portalCredentials)
    console.log('checkboxSelections', checkboxSelections)
  }

  const handleClear = () => {
    setPortalInfo({
      portalName: '',
      company: '',
      activeDate: new Date(),
      portalStatus: '',
      check1: '',
      check2: '',
    })

    setPortalCredentials({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      check1: '',
    })
    setCheckboxSelections({})
  }

  return (
    <div className={styles.wrapper}>
      <PortalsInformation portalInfo={portalInfo} setPortalInfo={setPortalInfo} />
      <PortalsCredentials
        portalCredentials={portalCredentials}
        setPortalCredentials={setPortalCredentials}
      />

      <AssociateMarketers />
      <StoresGrid />
      <EditAdminPortalCheckBox selected={checkboxSelections} onChange={setCheckboxSelections} />
      <div className={styles.buttons}>
        <FluentButton
          appearance="primary"
          label="Save"
          shape="rounded"
          size="medium"
          onClick={handleSave}
        />
        <FluentButton
          appearance="secondary"
          label="Reset"
          shape="rounded"
          size="medium"
          onClick={handleClear}
        />
      </div>
    </div>
  )
}

export default EditAdminPortalForm
