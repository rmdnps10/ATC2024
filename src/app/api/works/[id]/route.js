// 작품 하나의 상세 정보를 몯
import { connectDb } from '@/lib/connect-db'
import { DetailWork } from '@/models/detail-work-schema'
import { Work } from '@/models/work-schema'

export async function GET(request) {
  try {
    await connectDb()
    // 해당 work id로 필터링. DB접근
    // const data = await DetailWork.find()
    return Response.json({ data })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
