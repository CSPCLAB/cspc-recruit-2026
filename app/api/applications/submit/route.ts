import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 프론트에서 합쳐서 보낸 모든 데이터 추출
        const {
<<<<<<< HEAD
            name,
            student_id,
            department,
            phone,
            intro,
            motivation,
            goal,
            comment,
            interview_dates,
            // github_link 등 필요한 거 추가
=======
            name, student_id, department, phone, intro,
            motivation, goal, comment, orientation,
            selectedDates // 면접일 선택 페이지에서 넘어온 데이터
>>>>>>> main
        } = body;

        // 1. 필수값 통합 검증 (1페이지 + 2페이지 데이터 모두 확인)
        if (!name || !student_id || !selectedDates || selectedDates.length === 0) {
            return NextResponse.json({ message: '누락된 정보가 있습니다.' }, { status: 400 });
        }
        if (!Array.isArray(interview_dates) || interview_dates.length===0){
            return NextResponse.json({ message: '면접일을 1개 이상 선택해주세요.' }, { status: 400 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 2. 지원서 정보 저장 (applicants 테이블)
        const { error: appError } = await supabase
            .from('applicants')
            .insert({
<<<<<<< HEAD
                name,
                student_id,
                department,
                phone,
                intro,
                motivation,
                goal,
                comment,
                interview_dates,
                // 만약 body에 'is_passed: true'가 있어도, 여기서 안 넣어주면 무시됨! (보안 통과)
            })
            .select();
=======
                name, student_id, department, phone,
                intro, motivation, goal, comment, orientation
            });
>>>>>>> main

        if (appError) {
            if (appError.code === '23505') {
                return NextResponse.json({ message: '이미 지원한 학번입니다.' }, { status: 409 });
            }
            throw appError;
        }

        // 3. 면접 시간 정보 저장 (applicant_interview_selections 테이블)
        const { error: interviewError } = await supabase
            .from('applicant_interview_selections')
            .insert({
                student_id: student_id,
                selected_dates: selectedDates
            });

        if (interviewError) {
            console.error('면접 시간 저장 실패:', interviewError);
            return NextResponse.json({ message: '면접 시간 저장 중 오류가 발생했습니다.' }, { status: 500 });
        }

        return NextResponse.json({ message: '전체 제출 성공' }, { status: 200 });

    } catch (e) {
        console.error('Server Error:', e);
        return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}