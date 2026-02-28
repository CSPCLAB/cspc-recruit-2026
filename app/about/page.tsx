import { BookOpen, Server, DoorOpen } from "lucide-react";

export default function AboutPage() {
    return (
        <>
            <div className="bg-black">
                <div className="max-w-5xl mx-auto px-10 py-6">
                    <h1 className="text-3xl font-semibold text-white">소개</h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-10 py-6">
                <div className="border-b pb-10 mb-10">
                    <div className="font-semibold text-2xl leading-10">랩실 관리</div>
                    <div className="text-lg leading-10">
                        CSPC는 다산관 104호, 105호를 관리합니다.
                    </div>
                    <div className="text-base leading-relaxed">
                        실습 수업이 원활하게 진행될 수 있도록 수업 중 관리자실에서 대기하며,<br />
                        수업에 필요한 장비 대여나, 랩실 보안 및 청결을 유지합니다.
                    </div>
                </div>

                <div className="border-b pb-10 mb-10">
                    <div className="font-semibold text-2xl leading-10">스터디/프로젝트</div>
                    <div className="text-lg leading-10">
                        CSPC는 스터디와 프로젝트를 응원합니다.
                    </div>
                    <div className="text-base leading-relaxed">
                        언제든 마음 맞는 친구와 함께,<br />
                        같이 듣는 과목이나 함께 배우고 싶은 것 무엇에 관해서든 스터디/프로젝트를 열 수 있습니다.<br />
                        스터디/프로젝트 장려를 위해 지원금의 형태로도 서포트합니다.
                    </div>
                </div>

                <div className="border-b pb-10 mb-10">
                    <div className="font-semibold text-2xl leading-10">선배 찬스</div>
                    <div className="text-lg leading-10">
                        CSPC는 선배들이 있어 든든합니다.
                    </div>
                    <div className="text-base leading-relaxed">
                        CSPC LAB은 1993년에 창설되어 다양한 분야로 진출한 선배들이 많습니다.<br />
                        졸업한 선배로부터 진로에 대한 조언을 듣거나,<br />
                        재학 중인 선배들에게도 대학 생활 팁을 얻을 수 있습니다.
                    </div>
                </div>

                <div className="border-b pb-10 mb-10">
                    <div className="font-semibold text-2xl leading-10">소수 정예 학회</div>
                    <div className="text-lg leading-10">
                        CSPC는 소수로 이루어져, 서로 끈끈한 관계를 가지고 있습니다.
                    </div>
                </div>
                

                <h2 className="text-2xl font-bold mb-8">지원 및 리소스</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 공용 전공서적 */}
                    <div className="rounded-2xl border p-6">
                        <BookOpen size={32} className="mb-4 text-gray-800" />
                        <h3 className="text-xl font-semibold mb-2">공용 전공서적</h3>
                        <p className="text-gray-700 leading-relaxed">
                            • 전공 서적 신청 가능<br />
                            • 언제든지 사용 가능
                        </p>
                    </div>

                    {/* 서버 제공 */}
                    <div className="rounded-2xl border p-6">
                        <Server size={32} className="mb-4 text-gray-800" />
                        <h3 className="text-xl font-semibold mb-2">서버 제공</h3>
                        <p className="text-gray-700 leading-relaxed">
                            • 랩원 전용 리눅스 서버
                        </p>
                    </div>

                    {/* 관리자실 */}
                    <div className="rounded-2xl border p-6">
                        <DoorOpen size={32} className="mb-4 text-gray-800" />
                        <h3 className="text-xl font-semibold mb-2">관리자실</h3>
                        <p className="text-gray-700 leading-relaxed">
                            • 언제든지 사용 가능
                            <br />• Chat GPT, Claude AI 제공
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}