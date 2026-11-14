import { Check } from 'lucide-react'

import { buttonClass, TextLink } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Badge, Slider } from '../components/Controls'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { ShardField } from '../components/ShardField'
import { SectionHeading } from '../components/Typography'
import { brand, plans } from '../content'
import type { Plan } from '../content'
import { cx } from '../lib/cx'
import { useStored } from '../lib/store'
import { Mission } from '../sections/Mission'

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const waLink = (message: string) => `${brand.whatsappUrl}?text=${encodeURIComponent(message)}`
const allPlans: Plan[] = [...plans.site, ...plans.extras]

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <Reveal as="li" delay={index * 0.06}>
      <Card tone={plan.popular ? 'ocean' : 'plain'} as="article" className="relative flex h-full flex-col p-6">
        {plan.popular ? (
          <Badge tone="plasma" className="absolute right-5 top-5">
            Mais popular
          </Badge>
        ) : null}
        <h3 className="text-[22px] font-medium tracking-[-0.02em]">{plan.name}</h3>
        <p className={cx('mt-1 max-w-[280px] text-[15px]', plan.popular ? 'text-white/80' : 'text-muted')}>{plan.tagline}</p>
        {plan.features.length ? (
          <ul className="mt-6 flex flex-col gap-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-[15px] text-soft">
                <Check className="mt-0.5 size-4 shrink-0 text-plasma-text" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        ) : null}
        <dl className="mt-6 grid gap-1 border-t border-white/10 pt-5 text-[15px]">
          <div className="flex items-baseline justify-between gap-4">
            <dt className={plan.popular ? 'text-white/75' : 'text-muted'}>Criação</dt>
            <dd className="text-[22px] font-medium tracking-[-0.02em]">{brl(plan.creation)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className={plan.popular ? 'text-white/75' : 'text-muted'}>Mensalidade</dt>
            <dd className="text-[22px] font-medium tracking-[-0.02em]">
              {brl(plan.monthly)}
              <span className={cx('text-[14px] font-normal', plan.popular ? 'text-white/70' : 'text-muted')}>/mês</span>
            </dd>
          </div>
        </dl>
        <a
          href={waLink(`Olá! Tenho interesse no ${plan.name}. Pode me passar mais informações?`)}
          target="_blank"
          rel="noreferrer"
          className={buttonClass(plan.popular ? 'primary' : 'secondary', 'md', 'mt-6 w-full')}
        >
          Quero este plano
        </a>
      </Card>
    </Reveal>
  )
}

export function Plans() {
  const est = plans.estimator
  const [planId, setPlanId] = useStored('calc-plan', 'completo')
  const [months, setMonths] = useStored('calc-months', est.defaultMonths)
  const plan = allPlans.find((p) => p.id === planId) ?? plans.site[1]
  const total = plan.creation + plan.monthly * months

  return (
    <>
      <PageHeader
        eyebrow={plans.eyebrow}
        title={plans.title}
        body={plans.body}
        aside={
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute inset-x-[12%] inset-y-[16%] -z-10 rounded-full bg-fuchsia-500/25 blur-[80px]" aria-hidden />
            <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-inset ring-white/10">
              <ShardField variant="magenta" />
            </div>
          </div>
        }
      />

      <section aria-labelledby="promo-title" className="pb-6">
        <Container size="xl">
          <Reveal>
            <Card tone="fire" className="grid items-center gap-6 p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 via-black/20 to-transparent" aria-hidden />
              <div>
                <p className="text-[14px] font-medium text-fire-3">{plans.promo.title}</p>
                <h2 id="promo-title" className="display mt-2 text-[34px] sm:text-[44px]">
                  R$ 180/mês e entrega em até 7 dias
                </h2>
                <p className="mt-3 max-w-[560px] text-[16px] leading-[1.55] text-white/85">{plans.promo.body}</p>
              </div>
              <a
                href={waLink('Olá! Quero aproveitar a promoção Black November (R$ 180/mês, pronto em até 7 dias).')}
                target="_blank"
                rel="noreferrer"
                className={buttonClass('primary', 'lg')}
              >
                Quero a promoção
              </a>
            </Card>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="site-plans-title" className="py-14 sm:py-20">
        <Container size="xl">
          <Reveal>
            <SectionHeading id="site-plans-title" title="Sites" body="Criação paga uma vez e mensalidade a partir de R$ 89,90 com hospedagem, suporte e manutenção." size="md" />
          </Reveal>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.site.map((p, i) => (
              <PlanCard key={p.id} plan={p} index={i} />
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="extras-title" className="py-10 sm:py-14">
        <Container size="xl">
          <Reveal>
            <SectionHeading id="extras-title" title="Outros serviços para sites" size="md" align="left" />
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {plans.extras.map((p, i) => (
              <PlanCard key={p.id} plan={p} index={i} />
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="system-title" className="py-10 sm:py-14">
        <Container size="xl">
          <Reveal>
            <Card tone="stripes" className="grid items-center gap-6 p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 id="system-title" className="text-[26px] font-medium tracking-[-0.02em]">
                  {plans.system.name}
                </h2>
                <p className="mt-2 max-w-[540px] text-[16px] leading-[1.55] text-white/85">{plans.system.body}</p>
                <p className="mt-4 text-[15px] text-white/85">
                  Criação e implantação a partir de <strong className="font-medium text-white">{brl(plans.system.creationFrom)}</strong> + mensalidade de{' '}
                  <strong className="font-medium text-white">{brl(plans.system.monthly)}</strong>.
                </p>
              </div>
              <a href={waLink('Olá! Quero um orçamento para um sistema web sob medida.')} target="_blank" rel="noreferrer" className={buttonClass('secondary', 'lg')}>
                Falar sobre um sistema
              </a>
            </Card>
          </Reveal>
        </Container>
      </section>

      <section id="simulador" aria-labelledby="sim-title" className="scroll-mt-20 py-14 sm:py-20">
        <Container size="xl">
          <Reveal>
            <SectionHeading id="sim-title" title={est.title} body={est.body} size="md" />
          </Reveal>
          <Card className="mt-10 grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col gap-8">
              <fieldset>
                <legend className="mb-3 text-[14px] text-muted">Serviço</legend>
                <div className="flex flex-wrap gap-2">
                  {allPlans.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={p.id === plan.id}
                      onClick={() => setPlanId(p.id)}
                      className={cx(
                        'inline-flex h-10 items-center rounded-control px-4 text-[14px] font-medium transition-colors',
                        p.id === plan.id ? 'bg-white text-black' : 'bg-white/[0.06] text-soft ring-1 ring-inset ring-white/10 hover:bg-white/[0.11] hover:text-white',
                      )}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </fieldset>
              <Slider label={est.monthsLabel} value={months} min={1} max={24} step={1} onChange={setMonths} format={(n) => `${n} ${n === 1 ? 'mês' : 'meses'}`} />
              <p className="text-[13px] leading-relaxed text-faint">
                Criação de {brl(plan.creation)} + {brl(plan.monthly)} por mês. Valores ilustrativos conforme a seção de planos; o orçamento final depende do escopo.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3" aria-live="polite">
              <div className="depth relative flex flex-col justify-between gap-6 rounded-[22px] bg-surface-2 p-5">
                <dt className="text-[14px] text-muted">Criação</dt>
                <dd className="text-[26px] font-medium tabular-nums tracking-[-0.03em]">{brl(plan.creation)}</dd>
              </div>
              <div className="depth relative flex flex-col justify-between gap-6 rounded-[22px] bg-surface-2 p-5">
                <dt className="text-[14px] text-muted">Mensalidade</dt>
                <dd className="text-[26px] font-medium tabular-nums tracking-[-0.03em]">{brl(plan.monthly)}</dd>
              </div>
              <div className="depth relative col-span-2 flex flex-col justify-between gap-4 rounded-[22px] bg-[linear-gradient(160deg,#7c3aed,#3b0764)] p-5">
                <dt className="text-[14px] text-white/85">Total em {months} {months === 1 ? 'mês' : 'meses'}</dt>
                <dd className="text-[34px] font-medium tabular-nums tracking-[-0.03em] sm:text-[42px]">{brl(total)}</dd>
              </div>
            </dl>
          </Card>
        </Container>
      </section>

      <section aria-labelledby="includes-title" className="py-14 sm:py-16">
        <Container size="xl" className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-7">
              <h2 id="includes-title" className="text-[22px] font-medium tracking-[-0.02em]">
                O que a mensalidade inclui
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {plans.includes.map((i) => (
                  <li key={i} className="flex gap-2.5 text-[15px] text-soft">
                    <Check className="mt-0.5 size-4 shrink-0 text-plasma-text" aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.06}>
            <Card className="h-full p-7">
              <h2 className="text-[22px] font-medium tracking-[-0.02em]">Reajustes e alterações</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {plans.adjustments.map((i) => (
                  <li key={i} className="flex gap-2.5 text-[15px] text-soft">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-plasma" aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="py-14 sm:py-20">
        <Container size="lg">
          <Reveal>
            <SectionHeading id="faq-title" title="Perguntas frequentes" size="md" />
          </Reveal>
          <ul className="mt-10 flex flex-col gap-3">
            {plans.faq.map((f, i) => (
              <Reveal as="li" key={f.q} delay={(i % 4) * 0.04}>
                <details className="group rounded-card bg-surface px-6 py-5 ring-1 ring-inset ring-white/10 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium">
                    {f.q}
                    <span className="text-[22px] text-plasma-text transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[720px] text-pretty text-[15px] leading-[1.6] text-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-center text-[15px] text-muted">
            Ficou com alguma dúvida?{' '}
            <TextLink href="/contato" className="text-[15px]">
              Fale com a gente
            </TextLink>
            .
          </p>
        </Container>
      </section>

      <Mission />
    </>
  )
}
