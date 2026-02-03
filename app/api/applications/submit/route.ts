import { createClient } from '@/app/lib/supabase/server';
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
            // github_link 등 필요한 거 추가
        } = body;

        // 필수값 검증
        if (!name || !student_id || !phone || !intro || !motivation || !goal) {
            return NextResponse.json({ message: '필수 항목이 누락되었습니다.' }, { status: 400 });
        }

        const supabase = await createClient();

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
                // 만약 body에 'is_passed: true'가 있어도, 여기서 안 넣어주면 무시됨! (보안 통과)
            })
            .select();

        if (error) {
            console.error('Supabase Error:', error);
            if (error.code === '23505') {
                return NextResponse.json({ message: '이미 지원한 학번입니다.' }, { status: 409 });
            }
            return NextResponse.json({ message: '저장 실패' }, { status: 500 });
        }

        return NextResponse.json({ message: '제출 성공', data }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: '서버 에러' }, { status: 500 });
    }
}
