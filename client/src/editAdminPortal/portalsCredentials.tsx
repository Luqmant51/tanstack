import { Checkbox, Field, Input } from '@fluentui/react-components'

import { useEditAdminPortalFormStyles } from './index.tsx'

interface PortalsCredentialsProps {
  portalCredentials: {
    userName: string
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    check1: boolean
  }
  setPortalCredentials: React.Dispatch<
    React.SetStateAction<{
      userName: string
      firstName: string
      lastName: string
      email: string
      password: string
      confirmPassword: string
      check1: boolean
    }>
  >
}

const PortalsCredentials = ({
  portalCredentials,
  setPortalCredentials,
}: PortalsCredentialsProps) => {
  const styles = useEditAdminPortalFormStyles()
  const handleCredentialChange =
    (field: keyof typeof portalCredentials) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setPortalCredentials(prev => ({
        ...prev,
        [field]: value,
      }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Portals Credentials</legend>
          <div className={styles.grid}>
            <Field label="User Name:">
              <Input
                className={styles.borderColor}
                value={portalCredentials.userName}
                onChange={handleCredentialChange('userName')}
              />
            </Field>
            <Field label="First Name:">
              <Input
                className={styles.borderColor}
                value={portalCredentials.firstName}
                onChange={handleCredentialChange('firstName')}
              />
            </Field>
            <Field label="Last Name:">
              <Input
                className={styles.borderColor}
                value={portalCredentials.lastName}
                onChange={handleCredentialChange('lastName')}
              />
            </Field>
            <Field label="Email Address:">
              <Input
                className={styles.borderColor}
                type="email"
                value={portalCredentials.email}
                onChange={handleCredentialChange('email')}
              />
            </Field>
            <Field label="Password:">
              <Input
                className={styles.borderColor}
                type="password"
                value={portalCredentials.password}
                onChange={handleCredentialChange('password')}
              />
            </Field>
            <Field label="Confirm Password:">
              <Input
                className={styles.borderColor}
                type="password"
                value={portalCredentials.confirmPassword}
                onChange={handleCredentialChange('confirmPassword')}
              />
            </Field>
            <Checkbox
              className={styles.checkbox}
              label="Can See Tomorrow's Post Date"
              onChange={handleCredentialChange('check1')}
              checked={portalCredentials.check1}
            />
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default PortalsCredentials
