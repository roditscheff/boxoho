import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  matchesCustomerFilter,
  toCsv,
  type CustomerFilter,
  type PostcardCustomerRow,
} from "@/lib/postcard-customers";
import {
  createAdminClient,
  isSupabaseConfigured,
} from "@/lib/supabase/admin";

const FILTERS: CustomerFilter[] = [
  "all",
  "active_monthly",
  "yearly",
  "cancelled",
  "ship_this_month",
];

function parseFilter(value: string | null): CustomerFilter {
  if (value && FILTERS.includes(value as CustomerFilter)) {
    return value as CustomerFilter;
  }
  return "ship_this_month";
}

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const filter = parseFilter(searchParams.get("filter"));

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("postcard_locations")
    .select(
      "id, first_name, email, place_text, plan, status, shipping_name, shipping_line1, shipping_line2, shipping_city, shipping_postal_code, shipping_state, shipping_country, period_start, period_end, cancelled_at, stripe_customer_id, stripe_subscription_id, map_consent, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = ((data ?? []) as PostcardCustomerRow[]).filter((row) =>
    matchesCustomerFilter(row, filter),
  );
  const csv = toCsv(rows);
  const stamp = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="boxoho-customers-${filter}-${stamp}.csv"`,
    },
  });
}
