import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

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

const createOrUpdateUser = async ({
  formData,
  isEditing,
  userId
}: {
  formData: { name: string; email: string; job?: string },
  isEditing: boolean,
  userId?: number
}) => {
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

  return res.json()
}

const deleteUser = async (id: number) => {
  const res = await fetch(`http://localhost:7000/api/users/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`Delete failed - ${res.status}`)
  return true
}

export const useUsers = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
  
  const submitMutation = useMutation({
    mutationFn: createOrUpdateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleSubmit = async (
    formData: { name: string; job?: string; email: string },
    isEditing: boolean,
    userId?: number
  ) => {
    await submitMutation.mutateAsync({ formData, isEditing, userId })
  }

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id)
  }

  return {
    ...query,
    handleSubmit,
    handleDelete,
    isSubmitting: submitMutation.isPending,
    isDeleting: deleteMutation.isPending,
    submitError: submitMutation.error,
    deleteError: deleteMutation.error,
  }
}
