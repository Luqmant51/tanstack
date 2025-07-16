import { useEditAdminPortalFormStyles } from './index.tsx'
import { CustomDataGrid } from '../dataGrids/index.tsx'

const StoresGrid = () => {
  const styles = useEditAdminPortalFormStyles()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Stores</legend>
          <CustomDataGrid
            searchBool
            deleteBool={false}
            editBool={false}
          />
        </fieldset>
      </form>
    </div>
  )
}

export default StoresGrid
