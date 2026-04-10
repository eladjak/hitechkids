import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

  // Save to Supabase
  const { error: dbError } = await supabase.from("registrations").insert({
    child_name: data.childName,
    child_age: age,
    parent_name: data.parentName,
    phone: phoneClean,
    email: data.email || null,
    workshop: data.workshop,
    notes: data.notes || null,
  });

  if (dbError) {
    console.error("[HiTechKids] Supabase error:", dbError.message);
    return NextResponse.json(
      { error: "שגיאה בשמירת ההרשמה. נסו שוב." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, message: "ההרשמה התקבלה בהצלחה!" });
}
