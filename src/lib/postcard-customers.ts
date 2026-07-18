export type PostcardPlan = "monthly" | "yearly";
export type PostcardStatus = "active" | "cancelled" | "expired";

export type CustomerFilter =
  | "all"
  | "active_monthly"
  | "yearly"
  | "cancelled"
  | "ship_this_month";

export type PostcardCustomerRow = {
  id: string;
  first_name: string;
  email: string;
  place_text: string;
  plan: string | null;
  status: string;
  shipping_name: string | null;
  shipping_line1: string | null;
  shipping_line2: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  shipping_state: string | null;
  shipping_country: string | null;
  period_start: string | null;
  period_end: string | null;
  cancelled_at: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  map_consent: boolean;
  created_at: string;
};

export function startOfMonth(d = new Date()): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

export function addMonths(d: Date, months: number): Date {
  const next = new Date(d);
  next.setUTCMonth(next.getUTCMonth() + months);
  return next;
}

/** Still entitled to receive mail this calendar month (UTC). */
export function shipsThisMonth(row: {
  status: string;
  period_end: string | null;
  shipping_line1: string | null;
}): boolean {
  if (!row.shipping_line1?.trim()) return false;
  if (row.status === "expired") return false;
  if (row.status !== "active" && row.status !== "cancelled") return false;
  if (!row.period_end) return row.status === "active";
  return new Date(row.period_end) >= startOfMonth();
}

export function matchesCustomerFilter(
  row: PostcardCustomerRow,
  filter: CustomerFilter,
): boolean {
  const plan = row.plan;
  const status = deriveStatus(row);

  switch (filter) {
    case "all":
      return true;
    case "active_monthly":
      return plan === "monthly" && status === "active";
    case "yearly":
      return plan === "yearly" && (status === "active" || status === "cancelled");
    case "cancelled":
      return status === "cancelled" || status === "expired";
    case "ship_this_month":
      return shipsThisMonth({ ...row, status });
    default:
      return true;
  }
}

export function deriveStatus(row: {
  status: string;
  period_end: string | null;
}): PostcardStatus {
  if (row.status === "cancelled") {
    if (row.period_end && new Date(row.period_end) < new Date()) return "expired";
    return "cancelled";
  }
  if (row.period_end && new Date(row.period_end) < new Date()) return "expired";
  if (row.status === "expired") return "expired";
  return "active";
}

export function formatAddressLines(row: {
  shipping_name: string | null;
  shipping_line1: string | null;
  shipping_line2: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  shipping_state: string | null;
  shipping_country: string | null;
  first_name: string;
}): string {
  const cityLine = [row.shipping_postal_code, row.shipping_city].filter(Boolean).join(" ");
  return [
    row.shipping_name || row.first_name,
    row.shipping_line1,
    row.shipping_line2,
    cityLine || null,
    row.shipping_state,
    row.shipping_country,
  ]
    .filter(Boolean)
    .join(", ");
}

export function toCsv(rows: PostcardCustomerRow[]): string {
  const headers = [
    "first_name",
    "email",
    "plan",
    "status",
    "shipping_name",
    "shipping_line1",
    "shipping_line2",
    "shipping_city",
    "shipping_postal_code",
    "shipping_state",
    "shipping_country",
    "period_start",
    "period_end",
    "place_text",
    "stripe_customer_id",
    "created_at",
  ];

  const escape = (value: string | null | undefined) => {
    const s = value ?? "";
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const lines = [headers.join(",")];
  for (const row of rows) {
    const status = deriveStatus(row);
    lines.push(
      [
        row.first_name,
        row.email,
        row.plan,
        status,
        row.shipping_name,
        row.shipping_line1,
        row.shipping_line2,
        row.shipping_city,
        row.shipping_postal_code,
        row.shipping_state,
        row.shipping_country,
        row.period_start,
        row.period_end,
        row.place_text,
        row.stripe_customer_id,
        row.created_at,
      ]
        .map(escape)
        .join(","),
    );
  }
  return `${lines.join("\n")}\n`;
}
