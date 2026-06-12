import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

type RegistrationData = {
  childName: string;
  childAge: string;
  parentName: string;
  phone: string;
  email: string;
  workshop: string;
  notes: string;
};

export async function POST(request: NextRequest) {
  const data: RegistrationData = await request.json();

  // Validate required fields
  if (!data.childName || !data.childAge || !data.parentName || !data.phone || !data.workshop) {
    return NextResponse.json(
      { error: "חסרים שדות חובה" },
      { status: 400 }
    );
  }

  // Validate age range
  const age = parseInt(data.childAge, 10);
  if (isNaN(age) || age < 8 || age > 15) {
    return NextResponse.json(
      { error: "גיל חייב להיות בין 8 ל-15" },
      { status: 400 }
    );
  }

  // Validate phone format (Israeli)
  const phoneClean = data.phone.replace(/[-\s]/g, "");
  if (!/^0[0-9]{9}$/.test(phoneClean)) {
    return NextResponse.json(
      { error: "מספר טלפון לא תקין" },
      { status: 400 }
    );
  }

  // Save to Supabase (client instantiated lazily; missing config is handled)
  let dbError: { message: string } | null = null;
  try {
    const supabase = getSupabase();
    const res = await supabase.from("registrations").insert({
      child_name: data.childName,
      child_age: age,
      parent_name: data.parentName,
      phone: phoneClean,
      email: data.email || null,
      workshop: data.workshop,
      notes: data.notes || null,
    });
    dbError = res.error;
  } catch (e) {
    console.error("[HiTechKids] Supabase init error:", (e as Error).message);
    return NextResponse.json(
      { error: "שירות ההרשמה אינו זמין כרגע. נסו שוב או צרו קשר בטלפון 052-542-7474." },
      { status: 503 }
    );
  }

  if (dbError) {
    console.error("[HiTechKids] Supabase error:", dbError.message);
    return NextResponse.json(
      { error: "שגיאה בשמירת ההרשמה. נסו שוב." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, message: "ההרשמה התקבלה בהצלחה!" });
}
