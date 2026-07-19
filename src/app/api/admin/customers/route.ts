import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  deriveStatus,
  formatAddressLines,
  matchesCustomerFilter,
  type CustomerFilter,
  type PostcardCustomerRow,
  shipsThisMonth,
} from "@/lib/postcard-customers";
import {
  createAdminClient,
  isSupabaseConfigured,
} from "@/lib/supabase/admin";

const FILTERS: CustomerFilter[] = [
  "all",
  "active_newsletter",
  "active_monthly",
  "yearly",
  "cancelled",
  "ship_this_month",
];

function parseFilter(value: string | null): CustomerFilter {
  if (value && FILTERS.includes(value as CustomerFilter)) {
    return value as CustomerFilter;
  }
  return "all";
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

  const rows = (data ?? []) as PostcardCustomerRow[];
  const customers = rows
    .filter((row) => matchesCustomerFilter(row, filter))
    .map((row) => {
      const status = deriveStatus(row);
      return {
        id: row.id,
        firstName: row.first_name,
        email: row.email,
        place: row.place_text,
        plan: row.plan,
        status,
        address: formatAddressLines(row),
        shippingName: row.shipping_name,
        shippingLine1: row.shipping_line1,
        shippingLine2: row.shipping_line2,
        shippingCity: row.shipping_city,
        shippingPostalCode: row.shipping_postal_code,
        shippingState: row.shipping_state,
        shippingCountry: row.shipping_country,
        periodStart: row.period_start,
        periodEnd: row.period_end,
        cancelledAt: row.cancelled_at,
        mapConsent: row.map_consent,
        shipThisMonth: shipsThisMonth({ ...row, status }),
        stripeCustomerId: row.stripe_customer_id,
        createdAt: row.created_at,
      };
    });

  return NextResponse.json({
    filter,
    count: customers.length,
    customers,
  });
}
