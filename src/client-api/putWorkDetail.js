const API_END_POINT = process.env.NEXT_PUBLIC_BASE_URL

export const putWorkDetail = async ({ id, name, comment }) => {
  if (!API_END_POINT) {
    console.log('api connection error')
  }
  try {
    const res = await fetch(`${API_END_POINT}api/works/${id}`, {
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
