import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// API Route에서 DB 쓸 때 이거 부르면 됨
export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // API Route(서버)에서는 쿠키 설정 무시해도 됨
                    }
                },
            },
        }
    )
}
