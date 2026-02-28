import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 프론트에서 합쳐서 보낸 모든 데이터 추출
        const {
            name, student_id, department, phone, intro,
            motivation, goal, comment, orientation,
            selectedDates // 면접일 선택 페이지에서 넘어온 데이터
        } = body;

        // 1. 필수값 통합 검증 (1페이지 + 2페이지 데이터 모두 확인)
        if (!name || !student_id || !selectedDates || selectedDates.length === 0) {
            return NextResponse.json({ message: '누락된 정보가 있습니다.' }, { status: 400 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 2. 지원서 + 면접 시간 한번에 저장
        const { error: appError } = await supabase
            .from('applicants')
            .insert({
                name, student_id, department, phone,
                intro, motivation, goal, comment, orientation,
                interview_periods: selectedDates  // applicants 테이블의 기존 컬럼 활용
            });

        if (appError) {
            if (appError.code === '23505') {
                return NextResponse.json({ message: '이미 지원한 학번입니다.' }, { status: 409 });
            }
            throw appError;
        }

        return NextResponse.json({ message: '전체 제출 성공' }, { status: 200 });

    } catch (e) {
        console.error('Server Error:', e);
        return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}