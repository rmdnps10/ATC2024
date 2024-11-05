import { connectDb } from '@/lib/connect-db'
import { DetailWork } from '@/models/detail-work-schema'

export async function GET(request, { params }) {
  const { id } = params // URL 매개변수에서 id 추출
  try {
    await connectDb()
    const detailWork = await DetailWork.findById(id)
    if (!detailWork) {
      return new Response(JSON.stringify({ error: 'DetailWork not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    return new Response(JSON.stringify(detailWork), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
