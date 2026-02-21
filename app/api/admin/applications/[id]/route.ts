import { NextResponse  } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("applicants")
        .select("*")
        .eq("id", id)
        .maybeSingle(); //0개면 null
    
    if (error) {
        console.error("Admin fetch one error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json(
            { error: "Applicant not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ applicant: data });
}