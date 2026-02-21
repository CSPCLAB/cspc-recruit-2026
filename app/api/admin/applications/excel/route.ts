export const runtime = "nodejs";

import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { createClient } from "@/app/lib/supabase/server";

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("applicants")
        .select("*")
        .order("created_at", { ascending: false });
    
    if (error) {
        console.error("Excel fetch error:",error);
        return NextResponse.json({ error: error.message }, {status: 500});
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("지원자 목록");

    sheet.columns = [
        { header: "지원일", key: "created_at", width: 22 },
        { header: "이름", key: "name", width: 14 },
        { header: "학번", key: "student_id", width: 14 },
        { header: "학과", key: "department", width: 18 },
        { header: "전화번호", key: "phone", width: 16 },
    ];

    for (const a of data ?? []) {
        sheet.addRow({
            created_at: a.created_at ? new Date(a.created_at).toLocaleString("ko-KR") : "",
            name: a.name ?? "",
            student_id: a.student_id ?? "",
            department: a.department ?? "",
            phone: a.phone ?? "",
        });
    }

    sheet.getRow(1).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = `applicants_${new Date().toISOString().slice(0,10)}.xlsx`;

    return new NextResponse(Buffer.from(buffer), {
        headers: {
            "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": `attachment; filename="${fileName}"`,
        },
    });
}