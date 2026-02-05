import { createBrowserClient } from '@supabase/ssr'

// 관리자 로그인 페이지에서 쓸 거
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
