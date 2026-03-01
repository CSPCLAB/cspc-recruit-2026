"use client";

import { BookOpen, Server, DoorOpen } from "lucide-react";
import ImageSliderAbout from "../components/ImageSliderAbout";

export default function AboutPage() {
    const sections = [
        {
            title: "랩실 관리",
            lead: "CSPC는 다산관 104호, 105호를 관리합니다.",
            body: (
                <>
                    실습 수업이 원활하게 진행될 수 있도록 수업 중 관리자실에서 대기하며,
                    <br />
                    수업에 필요한 장비 대여나, 랩실 보안 및 청결을 유지합니다.
                </>
            ),
        },
        {
            title: "스터디/프로젝트",
            lead: "CSPC는 스터디와 프로젝트를 응원합니다.",
            body: (
                <>
                    언제든 마음 맞는 친구와 함께,
                    <br />
                    같이 듣는 과목이나 함께 배우고 싶은 것 무엇에 관해서든 스터디/프로젝트를 열 수 있습니다.
                    <br />
                    스터디/프로젝트 장려를 위해 지원금의 형태로도 서포트합니다.
                </>
            ),
        },
        {
            title: "선배 찬스",
            lead: "CSPC는 선배들이 있어 든든합니다.",
            body: (
                <>
                    CSPC LAB은 1993년에 창설되어 다양한 분야로 진출한 선배들이 많습니다.
                    <br />
                    졸업한 선배로부터 진로에 대한 조언을 듣거나,
                    <br />
                    재학 중인 선배들에게도 대학 생활 팁을 얻을 수 있습니다.
                </>
            ),
        },
    ];

    const resources = [
        {
            icon: <BookOpen size={32} />,
            title: "공용 전공서적",
            desc: (
                <>
                    • 전공 서적 신청 가능
                    <br />• 언제든지 사용 가능
                </>
            ),
        },
        {
            icon: <Server size={32} />,
            title: "서버 제공",
            desc: (
                <>
                    • 랩원 전용 리눅스 서버
                </>
            ),
        },
        {
            icon: <DoorOpen size={32} />,
            title: "관리자실",
            desc: (
                <>
                    • 언제든지 사용 가능
                    <br />• Chat GPT, Claude AI 제공
                </>
            ),
        },
    ];

    return (
        <main className="min-h-screen bg-white text-black">
            {/* 상단 헤더 */}
            <div className="bg-black text-white py-[clamp(16px,3vw,28px)] text-center text-[clamp(18px,2.5vw,28px)] font-semibold">
                소개
            </div>

            <div className="max-w-[1400px] mx-auto px-[clamp(16px,5vw,80px)] py-[clamp(40px,8vw,120px)]">
                {/* 소개 섹션들 */}
                {sections.map((s, i) => (
                    <section key={i} className="mb-[clamp(40px,6vw,100px)]">
                        <h2 className="text-[clamp(16px,2vw,22px)] font-bold mb-3">
                            {s.title}
                        </h2>

                        {s.lead && (
                            <p className="text-gray-600 text-[clamp(14px,1.5vw,18px)] mb-3">
                                {s.lead}
                            </p>
                        )}

                        {s.body && (
                            <div className="text-gray-700 text-[clamp(13px,1.4vw,17px)] leading-relaxed mb-6">
                                {s.body}
                            </div>
                        )}

                        <div className="border-b-2 border-black w-full" />
                    </section>
                ))}

                {/* 지원 및 리소스 */}
                <section className="mb-[clamp(20px,4vw,60px)]">
                    <h3 className="text-[clamp(16px,2vw,22px)] font-bold mb-4">
                        지원 및 리소스
                    </h3>
                    <div className="border-b-2 border-black w-full mb-[clamp(20px,3vw,50px)]" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(16px,3vw,40px)]">
                        {resources.map((r, idx) => (
                            <div
                                key={idx}
                                className="border border-gray-300 rounded-2xl p-[clamp(20px,3vw,40px)]
                transition-all duration-300 hover:bg-black hover:text-white hover:scale-105"
                            >
                                <div className="mb-4 text-gray-800 group-hover:text-white">
                                    {r.icon}
                                </div>
                                <h4 className="text-[clamp(15px,1.8vw,20px)] font-semibold mb-2">
                                    {r.title}
                                </h4>
                                <p className="text-[clamp(13px,1.4vw,17px)] leading-relaxed text-gray-700">
                                    {r.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 소수 정예 학회 */}
                <section className="mb-[clamp(40px,6vw,100px)]">
                    <h2 className="text-[clamp(16px,2vw,22px)] font-bold mb-3">
                        소수 정예 학회
                    </h2>

                    <p className="text-gray-600 text-[clamp(14px,1.5vw,18px)] mb-6">
                        CSPC는 소수로 이루어져, 서로 끈끈한 관계를 가지고 있습니다.
                    </p>

                    <div className="border-b-2 border-black w-full mb-[clamp(30px,5vw,80px)]" />

                    <ImageSliderAbout />
                </section>
            </div>
        </main>
    );
}