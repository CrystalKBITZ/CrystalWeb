import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>CrystalWeb</h1>
      <p style={{ color: '#666' }}>
        数据来自 Supabase，每次刷新都会重新查询
      </p>
      {posts?.map((post) => (
        <article
          key={post.id}
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
          }}
        >
          <h2 style={{ margin: '0 0 0.5rem' }}>{post.title}</h2>
          <p style={{ margin: '0 0 0.5rem' }}>{post.content}</p>
          <small style={{ color: '#999' }}>
            {new Date(post.created_at).toLocaleString('zh-CN')}
          </small>
        </article>
      ))}
      {!posts?.length && (
        <p style={{ marginTop: '1rem' }}>暂无内容，去 /admin 添加吧。</p>
      )}
    </main>
  )
}
