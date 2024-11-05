import { connectDb } from '@/lib/connect-db'
import { DetailWork } from '@/models/detail-work-schema'
import { ObjectId } from 'mongodb'

export async function GET(request, { params }) {
  try {
    await connectDb()
    const detailWork = await DetailWork.findById(params.id)

    // 문서가 존재하지 않으면 404 반환
    if (!detailWork) {
      return new Response(JSON.stringify({ error: 'ID-NOT-FOUND' }), {
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
