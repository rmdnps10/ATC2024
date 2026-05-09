export const getAllWorks = async () => {
  const res = await fetch('/api/works')
  if (!res.ok) throw new Error(`works API error: ${res.status}`)
  const { data } = await res.json()
  return data
}
