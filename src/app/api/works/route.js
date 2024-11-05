import { connectDb } from '@/lib/connect-db'
import { DetailWork } from '@/models/detail-work-schema'

export async function GET(request) {
  try {
    await connectDb()
    const data = await DetailWork.find()
      .select('_id title thumbnailImg category oneLiner Name') // 필요한 필드만 지정
      .exec()

    return new Response(JSON.stringify({ data }), {
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
