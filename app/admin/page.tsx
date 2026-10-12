'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Admin() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('提交中...')
    const { error } = await supabase.from('posts').insert({ title, content })
    if (error) {
      setStatus('失败：' + error.message)
    } else {
      setStatus('添加成功！')
      setTitle('')
      setContent('')
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>后台管理</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="标题"
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="内容"
          required
          rows={5}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          添加内容
        </button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </main>
  )
}
