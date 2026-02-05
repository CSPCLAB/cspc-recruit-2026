import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: { headers: request.headers },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return request.cookies.getAll(); },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // 현재 로그인된 유저 정보 가져오기
    const { data: { user } } = await supabase.auth.getUser();

    // 1. 로그인 안 했는데 '/admin'으로 시작하는 페이지에 가려고 하면?
    if (!user && request.nextUrl.pathname.startsWith("/admin")) {
        // 로그인 페이지로 쫓아냄
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 2. 이미 로그인했는데 '/login' 페이지에 가려고 하면?
    if (user && request.nextUrl.pathname.startsWith("/login")) {
        // 대시보드로 보내줌
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return response;
}

export const config = {
    matcher: ["/admin/:path*", "/login"], // 감시할 경로들
};
