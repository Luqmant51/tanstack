import React, { useState } from 'react'
import { useUsers, UserData } from './hooks/useUsers.ts'

const UserProfile = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    handleSubmit,
    handleDelete,
    isSubmitting,
    isDeleting,
    submitError,
    deleteError,
  } = useUsers()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [formData, setFormData] = useState({ name: '', job: '', email: '' })

  const openCreateDialog = () => {
    setIsEditing(false)
    setFormData({ name: '', job: '', email: '' })
    setIsDialogOpen(true)
  }

  const openEditDialog = (user: UserData) => {
    setIsEditing(true)
    setSelectedUser(user)
    setFormData({
      name: `${user.first_name} ${user.last_name}`,
      job: '',
      email: user.email || '',
    })
    setIsDialogOpen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async () => {
    try {
      await handleSubmit(formData, isEditing, selectedUser?.id)
      setIsDialogOpen(false)
    } catch (err) {
      alert('Something went wrong!')
    }
  }

  const onDelete = async (id: number) => {
    try {
      await handleDelete(id)
    } catch {
      alert('Delete failed')
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>

  console.log(users);
  
  return (
    <div style={styles.container}>
      <h2>User Profiles</h2>
      <button onClick={openCreateDialog} style={{ marginBottom: 20 }}>
        + Create User
      </button>

      <div style={styles.grid}>
        {users.map((user, index) => (
          <div key={user.id} style={styles.card}>
            <img
              src={`https://reqres.in/img/faces/${index + 1}-image.jpg`}
              alt={`${user.first_name} ${user.last_name}`}
              style={styles.avatar}
            />
            <div style={styles.info}>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button onClick={() => openEditDialog(user)}>Edit</button>{' '}
            <button onClick={() => onDelete(user.id)} disabled={isDeleting}>Delete</button>
            {deleteError && <p style={{ color: 'red' }}>Delete failed</p>}
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <div style={styles.dialog}>
          <h3>{isEditing ? 'Edit User' : 'Create User'}</h3>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} style={styles.input} />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
          <input name="job" placeholder="Job (optional)" value={formData.job} onChange={handleChange} style={styles.input} />
          <div style={{ marginTop: 10 }}>
            <button onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update' : 'Create')}
            </button>{' '}
            <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
            {submitError && <p style={{ color: 'red' }}>Submit failed</p>}
          </div>
        </div>
      )}
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    maxWidth: 900,
    margin: '0 auto',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 16,
    width: 200,
    textAlign: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 8,
  },
  dialog: {
    background: '#fff',
    border: '1px solid #aaa',
    padding: 40,
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    borderRadius: 8,
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
  },
  input: {
    display: 'block',
    marginBottom: 10,
    width: '100%',
    padding: 8,
    fontSize: 14,
  }
}

export default UserProfile
