import { MoveLink } from "@/components/ui/move-link";
import { PageShell } from "@/components/ui/page-shell";
import { getDict } from "@/lib/locale";

export default async function NotFound() {
  const { locale, t } = await getDict();
  return (
    <PageShell>
      <div className="flex flex-1 flex-col justify-center pt-8">
        <p className="label text-faint">404</p>
        <h1 className="display mt-5 text-[clamp(3.25rem,9vw,8rem)]">{t.notFound.title}</h1>
        <p className="mt-6 text-xl text-muted">{t.notFound.body}</p>
        <MoveLink href={`/${locale}`} className="btn mt-10 w-fit">
          ← {t.notFound.back}
        </MoveLink>
      </div>
    </PageShell>
  );
}
