import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json()

    if (!title) {
      return NextResponse.json({ error: '标题不能为空' }, { status: 400 })
    }

    await sql`
      insert into posts (title, content)
      values (${title}, ${content || ''})
    `

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || '数据库错误' },
      { status: 500 }
    )
  }
}
