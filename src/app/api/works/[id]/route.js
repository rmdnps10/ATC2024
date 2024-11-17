import { connectDb } from '@/lib/connect-db'
import { DetailWork } from '@/models/detail-work-schema'
import { ObjectId } from 'mongodb'

export async function GET(request, { params }) {
  try {
    await connectDb()
    const data = await DetailWork.findById(params.id)

    if (!data) {
      return new Response(JSON.stringify({ error: 'ID-NOT-FOUND' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

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

export async function PUT(request, { params }) {
  try {
    await connectDb()
    const { name, comment } = await request.json()
    const { id } = await params
    const data = await DetailWork.findById(id)

    if (!data) {
      return new Response(JSON.stringify({ error: 'ID-NOT-FOUND' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '.')

    data.commentList.push({ name, comment, date })
    await data.save()

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
