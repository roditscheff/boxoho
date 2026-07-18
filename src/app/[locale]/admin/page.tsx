import { redirect } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { localePath } from "@/i18n/paths";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) redirect("/en/admin");
  const locale = raw as Locale;
  const authed = await isAdminAuthenticated();

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
      <p className="eyebrow mb-4">Admin</p>
      <h1 className="text-4xl text-ink md:text-5xl">BOXOHO backend</h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Manage artworks and see collectors. Public site:{" "}
        <a href={localePath(locale)} className="text-stamp underline-offset-2 hover:underline">
          {localePath(locale)}
        </a>
      </p>
      <div className="mt-12">
        {authed ? <AdminDashboard /> : <AdminLogin />}
      </div>
    </div>
  );
}
