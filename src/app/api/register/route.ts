import { NextRequest, NextResponse } from "next/server";

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

  // TODO: Connect to Supabase when ready
  // const supabase = createClient(...)
  // await supabase.from('registrations').insert(data)

  console.log("[HiTechKids] New registration:", {
    childName: data.childName,
    childAge: data.childAge,
    parentName: data.parentName,
    phone: phoneClean,
    workshop: data.workshop,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, message: "ההרשמה התקבלה בהצלחה!" });
}
