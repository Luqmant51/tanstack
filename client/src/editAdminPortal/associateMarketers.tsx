import { CustomDataGrid } from '../dataGrids/index.tsx'
import { useEditAdminPortalFormStyles } from './index.tsx'

const AssociateMarketers = () => {
  const styles = useEditAdminPortalFormStyles()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Associate Marketers</legend>
          <CustomDataGrid
            deleteBool
            searchBool
            editBool={false}
            label="Add New Marketer"
            size="small"
          />
        </fieldset>
      </form>
    </div>
  )
}

export default AssociateMarketers
