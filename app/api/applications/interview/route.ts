import { createClient } from '@/app/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { student_id, selectedDates } = body;

        // 필수값 검증
        if (!student_id || !selectedDates || selectedDates.length === 0) {
            return NextResponse.json({ message: '학번과 면접 시간을 모두 확인해주세요.' }, { status: 400 });
        }

        const supabase = await createClient();

        // 데이터 삽입 (이미 존재하면 업데이트하는 upsert 방식 추천)
        const { data, error } = await supabase
            .from('applicant_interview_selections')
            .upsert({
                student_id: student_id,
                selected_dates: selectedDates,
            }, { onConflict: 'student_id' }) // 학번이 같으면 덮어쓰기
            .select();

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ message: '면접 시간 저장 실패' }, { status: 500 });
        }

        return NextResponse.json({ message: '면접 시간 선택 완료', data }, { status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: '서버 에러' }, { status: 500 });
    }
}