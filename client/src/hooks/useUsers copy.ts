import { useQuery, useQueryClient } from '@tanstack/react-query'

export type UserData = {
  id: number
  email: string
  first_name: string
  last_name: string
}

const fetchUsers = async (): Promise<UserData[]> => {
  const res = await fetch('http://localhost:7000/api/users')
  if (!res.ok) throw new Error(`Request failed - ${res.status}`)
  return res.json()
}

export const useUsers = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['users'] })

  const handleSubmit = async (
    formData: { name: string; job?: string; email: string },
    isEditing: boolean,
    userId?: number
  ) => {
    const [first_name, last_name] = formData.name.split(' ')
    const payload = {
      first_name: first_name || '',
      last_name: last_name || '',
      email: formData.email || '',
    }

    const url = isEditing
      ? `http://localhost:7000/api/users/${userId}`
      : 'http://localhost:7000/api/users'

    const method = isEditing ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) throw new Error(`Submit failed - ${res.status}`)

    invalidate()
  }

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:7000/api/users/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error(`Delete failed - ${res.status}`)
    invalidate()
  }

  return {
    ...query,
    invalidate,
    handleSubmit,
    handleDelete,
  }
}
