import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { Newsletter } from '../components/Newsletter'
import { brand, footer } from '../content'
import { useSiteText } from '../lib/os'
import { Link } from '../lib/router'

export function Footer() {
  const blurb = useSiteText('footer.blurb', footer.blurb)
  return (
    <footer className="border-t border-white/[0.08] bg-black pb-10 pt-16">
      <Container size="xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.6fr_0.6fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Início da ARVION Lab" className="-m-2 self-start rounded-[12px] p-2">
              <Logo />
            </Link>
            <p className="max-w-[280px] text-[15px] text-muted">{blurb}</p>
            <address className="text-[14px] not-italic leading-relaxed text-faint">
              <span className="block">{brand.location}</span>
              <a href={brand.whatsappUrl} target="_blank" rel="noreferrer" className="mt-1 inline-flex min-h-8 items-center hover:text-white">
                WhatsApp {brand.whatsapp}
              </a>
            </address>
          </div>
          {footer.columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="text-[14px] font-medium text-white">{c.title}</h2>
              <ul className="mt-3 flex flex-col">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-10 min-w-10 items-center text-[15px] text-muted transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="max-w-[420px]">
            <Newsletter compact />
          </div>
        </div>
        <p className="mt-14 border-t border-white/[0.08] pt-6 text-[13px] text-faint">{footer.legal}</p>
      </Container>
    </footer>
  )
}
