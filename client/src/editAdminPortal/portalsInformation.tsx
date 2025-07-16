import {
  Checkbox,
  Dropdown,
  Option,
  Field,
  Input,
  Text,
  DropdownProps,
} from '@fluentui/react-components'
import { DatePicker } from '@fluentui/react-datepicker-compat'
import { useCallback } from 'react'

import { useEditAdminPortalFormStyles } from './index.tsx'

interface PortalsInformationProps {
  portalInfo: {
    portalName: string
    company: string
    activeDate: Date
    portalStatus: string
    check1: boolean
    check2: boolean
  }
  setPortalInfo: React.Dispatch<
    React.SetStateAction<{
      portalName: string
      company: string
      activeDate: Date
      portalStatus: string
      check1: boolean
      check2: boolean
    }>
  >
}

const onFormatDate = (date?: Date | null): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return ''
  }
  return `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear() % 100}`
}


const PortalsInformation = ({ portalInfo, setPortalInfo }: PortalsInformationProps) => {
  const styles = useEditAdminPortalFormStyles()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handlePortalInfoChange =
    (field: keyof typeof portalInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      setPortalInfo(prev => ({
        ...prev,
        [field]: value,
      }))
    }

  const onActiveOptionChange = useCallback<NonNullable<DropdownProps['onActiveOptionChange']>>(
    (_, data) => {
      if (data?.nextOption?.value) {
        setPortalInfo(prev => ({
          ...prev,
          portalStatus: data?.nextOption?.value ?? '',
        }))
      }
    },
    [setPortalInfo],
  )

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Text className={styles.heading}>PORTAL MANAGEMENT</Text>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Portals Information</legend>
          <div className={styles.grid}>
            <Field label="Portal Name:">
              <Input
                className={styles.borderColor}
                value={portalInfo.portalName}
                onChange={handlePortalInfoChange('portalName')}
              />
            </Field>

            <Field label="Company:">
              <Input
                className={styles.borderColor}
                value={portalInfo.company}
                onChange={handlePortalInfoChange('company')}
              />
            </Field>

            <Field label="Active Date:">
              <DatePicker
                className={styles.borderColor}
                formatDate={onFormatDate}
                placeholder="Select a date..."
                value={portalInfo.activeDate}
                onSelectDate={(date) => {
                  if (date instanceof Date && !isNaN(date.getTime())) {
                    setPortalInfo(prev => ({ ...prev, activeDate: date }))
                  }
                }}
              />
            </Field>


            <Field label="Portal Status:">
              <Dropdown
                className={styles.borderColor}
                placeholder="Select portal status"
                value={portalInfo.portalStatus}
                onActiveOptionChange={onActiveOptionChange}
              >
                <Option aria-selected disabled key="">
                  Select
                </Option>
                <Option className={styles.hoverDropDown} key="active">
                  Active
                </Option>
                <Option className={styles.hoverDropDown} key="inactive">
                  In Active
                </Option>
                <Option className={styles.hoverDropDown} key="pending">
                  Pending
                </Option>
              </Dropdown>
            </Field>
            <Checkbox
              className={styles.checkbox}
              checked={portalInfo.check1}
              label="Can See Tomorrow's Post Date"
              style={{ maxWidth: '400px' }}
              onChange={handlePortalInfoChange('check1')}
            />
            <span style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              *Do not check for Next Day Settlement
            </span>
          </div>

          <Checkbox
            className={styles.checkbox}
            label="Hide Clark specific items"
            style={{ maxWidth: '400px' }}
            onChange={handlePortalInfoChange('check2')}
            checked={portalInfo.check2}
          />
        </fieldset>
      </form>
    </div>
  )
}

export default PortalsInformation
