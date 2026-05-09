export const getWorkDetail = async id => {
  const res = await fetch(`/api/works/${id}`)
  if (!res.ok) throw new Error(`works/${id} API error: ${res.status}`)
  const { data } = await res.json()
  return data
}
