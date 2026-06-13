import { NextResponse } from "next/server";
import { routeLeadSchema } from "@/lib/formSchema";
import { routeLead } from "@/lib/routing";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = routeLeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = routeLead(parsed.data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Routing failed" }, { status: 500 });
  }
}
