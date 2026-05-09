export const putWorkDetail = async ({ id, name, comment }) => {
  try {
    const res = await fetch(`/api/works/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, comment })
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`)
    }

    const { data } = await res.json()
    return data
  } catch (error) {
    console.error('Error in postWorkDetail:', error)
    throw error
  }
}
