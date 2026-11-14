import { ButtonLink } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { ShardField } from '../components/ShardField'
import { SectionHeading } from '../components/Typography'
import { brand, company } from '../content'
import { Milestones } from '../sections/Milestones'

/** Iniciais sobre um gradiente neon, para as divisões. */
function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .replace('ARVION ', '')
    .split(' ')
    .map((p) => p[0])
    .join('')
  const hues = ['#c084fc,#4c1d95', '#67e8f9,#0e7490', '#a6c0ff,#1e3a8a']
  return (
    <span
      className="round grid size-14 shrink-0 place-items-center rounded-full text-[16px] font-medium uppercase text-white"
      style={{ background: `linear-gradient(140deg,${hues[index % hues.length]})` }}
      aria-hidden
    >
      {initials}
    </span>
  )
}

export function Company() {
  return (
    <>
      <PageHeader
        tone="fire"
        eyebrow={company.eyebrow}
        title={company.title}
        body={company.paragraphs[0]}
        aside={
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute inset-[12%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(217,70,239,0.25),transparent)]" aria-hidden />
            <Card tone="fire" className="aspect-[4/4.2] w-full">
              <ShardField variant="magenta" />
              <div className="absolute inset-x-0 bottom-0 p-1.5">
                <p className="rounded-[18px] bg-black/90 px-4 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white/90 ring-1 ring-white/10">
                  Desenvolvimento · Programação · Design
                </p>
              </div>
            </Card>
          </div>
        }
      />

      <section aria-label="A ARVION em números" className="py-12">
        <Container size="xl">
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {company.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05} className="flex flex-col gap-1 border-t border-white/12 pt-5">
                <dt className="order-2 text-[14px] text-muted">{s.label}</dt>
                <dd className="order-1 text-[36px] font-medium tracking-[-0.04em] sm:text-[46px]">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="about-title" className="py-14 sm:py-20">
        <Container size="lg">
          <Reveal>
            <p id="about-title" className="text-pretty text-[20px] leading-[1.65] text-soft">
              {company.paragraphs[1]}
            </p>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="divisions-title" className="py-14 sm:py-20">
        <Container size="xl">
          <Reveal>
            <SectionHeading id="divisions-title" title="Três divisões, um só time" body="Cada frente tem um foco, mas todas compartilham o mesmo cuidado com design e código." size="md" />
          </Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {company.divisions.map((d, i) => (
              <Reveal as="li" key={d.name} delay={i * 0.06}>
                <Card className="flex h-full flex-col gap-4 p-6">
                  <Avatar name={d.name} index={i} />
                  <div>
                    <h3 className="text-[19px] font-medium">{d.name}</h3>
                    <p className="text-[14px] text-plasma-text">{d.role}</p>
                    <p className="mt-2 text-pretty text-[15px] leading-[1.5] text-muted">{d.bio}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <Milestones title="Nosso processo" />

      <section aria-labelledby="values-title" className="py-14 sm:py-20">
        <Container size="xl">
          <Reveal>
            <SectionHeading id="values-title" title="Como trabalhamos" size="md" />
          </Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {company.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.06}>
                <Card tone={i === 0 ? 'fire' : i === 1 ? 'ocean' : 'stripes'} className="flex h-[280px] flex-col justify-end p-7">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 to-transparent" aria-hidden />
                  <h3 className="text-[22px] font-medium tracking-[-0.02em]">{v.title}</h3>
                  <p className="mt-2 text-pretty text-[16px] leading-[1.5] text-white/85">{v.body}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="contact-cta-title" className="pb-24 pt-8">
        <Container size="xl" className="flex flex-col items-center gap-6 text-center">
          <h2 id="contact-cta-title" className="display max-w-[720px] text-balance text-[34px] sm:text-[46px]">
            Precisa de um site ou sistema sob medida?
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[1.55] text-muted">
            Conte o que você precisa e receba uma proposta com escopo, prazo e valores claros. Atendimento direto pelo WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/orcamento" size="lg">
              Solicitar orçamento
            </ButtonLink>
            <a
              href={brand.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-control bg-white/[0.08] px-7 text-[16px] font-medium text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/[0.14]"
            >
              WhatsApp {brand.whatsapp}
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
