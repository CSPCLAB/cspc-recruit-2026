import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            name,
            student_id,
            department,
            phone,
            intro,
            motivation,
            goal,
            comment,
            orientation, // 추가된 필드
        } = body;

        // 필수값 검증 (orientation은 상황에 따라 필수 여부 결정)
        if (!name || !student_id || !phone || !intro || !motivation || !goal || orientation === undefined) {
            return NextResponse.json({ message: '필수 항목이 누락되었습니다.' }, { status: 400 });
        }

        // Service Role Key로 RLS 우회 (서버 전용 API Route이므로 안전)
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data, error } = await supabase
            .from('applicants')
            .insert({
                name,
                student_id,
                department,
                phone,
                intro,
                motivation,
                goal,
                comment,
                orientation, // 테이블 컬럼명과 일치해야 합니다.
            })
            .select();

        if (error) {
            console.error('Supabase Error:', error);
            // 학번 중복 체크 (Unique 제약 조건이 있을 경우)
            if (error.code === '23505') {
                return NextResponse.json({ message: '이미 지원한 학번입니다.' }, { status: 409 });
            }
            return NextResponse.json({ message: '저장 실패: ' + error.message }, { status: 500 });
        }

        return NextResponse.json({ message: '제출 성공', data }, { status: 200 });

    } catch (e) {
        console.error('Server Error:', e);
        return NextResponse.json({ message: '서버 에러가 발생했습니다.' }, { status: 500 });
    }
}