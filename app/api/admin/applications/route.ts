// app/api/admin/applications/route.ts
import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();

    // 1. 관리자 권한 체크 (나중에 로그인 기능 붙이면 여기에 추가)
    // 지금은 일단 데이터 가져오는 것부터 구현

    const { data, error } = await supabase
        .from("applicants")
        .select("*")
        .order("created_at", { ascending: false }); // 최신 지원자가 위로 오게

    if (error) {
        console.error("Admin fetch error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
        count: data.length, // 전체 인원수도 같이 주면 프론트에서 편함
        applicants: data
    });
}
