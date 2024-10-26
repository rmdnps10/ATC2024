// 작품 목록을 모두 가져오는 api
import { connectDb } from '@/lib/connect-db'
import { Work } from '@/models/work-schema'

export async function GET(request) {
  try {
    await connectDb()
    const data = await Work.find()
    return Response.json({ data })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
