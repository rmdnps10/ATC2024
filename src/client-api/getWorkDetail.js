const API_END_POINT = process.env.NEXT_PUBLIC_BASE_URL

export const getWorkDetail = async id => {
  if (!API_END_POINT) {
    console.log('api connection error')
  }
  const res = await fetch(`${API_END_POINT}api/works/${id}`)
  const { data } = await res.json()
  return data
}
// console.log(process.env.NEXT_PUBLIC_BASE_URL)
