import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Label,
  Input,
  makeStyles,
  tokens,
  mergeClasses,
} from '@fluentui/react-components'
import { useEffect, useState } from 'react'

import { FluentButton } from '../button/button.tsx'

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '12px',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    '@media (min-width: 600px)': {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  label: {
    minWidth: '100px',
    fontWeight: 500,
    wordBreak: 'break-word',
  },
  input: {
    flex: 1,
    minWidth: '0',
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

type EditReportProps<T extends Record<string, unknown>> = {
  isDialogOpen: boolean
  editItem: T | null
  onCancel: () => void
  onSave: (_updated: T) => void
}

export default function EditReport<T extends Record<string, unknown>>({
  isDialogOpen,
  editItem,
  onCancel,
  onSave,
}: EditReportProps<T>) {
  const styles = useStyles()
  const [localItem, setLocalItem] = useState<T | null>(editItem)

  useEffect(() => {
    setLocalItem(editItem)
  }, [editItem])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (localItem) {
      setLocalItem({ ...localItem, [key]: e.target.value })
    }
  }

  const handleSave = () => {
    if (localItem) {
      onSave(localItem)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={(_, data) => !data.open && onCancel()}>
      <DialogSurface>
        <form onSubmit={e => e.preventDefault()}>
          <DialogBody>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogContent className={styles.content}>
              {localItem &&
                Object.entries(localItem)
                  .filter(([key]) => key !== 'id')
                  .map(([key, value]) => (
                    <div className={styles.formField} key={key}>
                      <Label className={styles.label}>{key}</Label>
                      <Input
                        className={mergeClasses(styles.input, styles.borderColor)}
                        value={String(value)}
                        onChange={e => handleChange(e, key)}
                      />
                    </div>
                  ))}
            </DialogContent>
            <DialogActions>
              <FluentButton
                appearance="secondary"
                label="Cancel"
                shape="rounded"
                size="medium"
                onClick={onCancel}
              />
              <FluentButton
                appearance="primary"
                label="Save"
                shape="rounded"
                size="medium"
                onClick={handleSave}
              />
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  )
}
