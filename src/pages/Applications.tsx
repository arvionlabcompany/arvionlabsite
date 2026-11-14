import { ArrowUpRight } from 'lucide-react'

import { ButtonLink } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { ShardField } from '../components/ShardField'
import { projects } from '../content'
import type { Project } from '../content'
import { useSiteItems } from '../lib/os'
import type { SiteItem } from '../lib/os'
import { Milestones } from '../sections/Milestones'
import { Mission } from '../sections/Mission'

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article
      className={
        featured
          ? 'grid items-center gap-8 rounded-card bg-surface p-6 ring-1 ring-inset ring-white/10 sm:p-8 lg:grid-cols-2'
          : 'group flex flex-col rounded-card bg-surface ring-1 ring-inset ring-white/10'
      }
    >
      {project.images?.length ? (
        <div className={featured ? 'order-last -mx-2 lg:order-none lg:mx-0' : ''}>
          <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:px-0">
            {project.images.map((img, i) => (
              <li key={img.src} className={i === 0 ? 'w-[86%] shrink-0 snap-center sm:w-[60%] lg:col-span-2 lg:w-auto' : 'w-[86%] shrink-0 snap-center sm:w-[60%] lg:w-auto'}>
                <img
                  src={img.src}
                  alt={img.alt}
                  width={900}
                  height={900}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="aspect-square w-full rounded-[22px] object-cover ring-1 ring-inset ring-white/10"
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={featured ? 'relative aspect-[16/10] overflow-hidden rounded-[22px] ring-1 ring-inset ring-white/10' : 'relative aspect-[16/10] overflow-hidden rounded-t-card'}>
          <ShardField variant={project.art} />
        </div>
      )}
      <div className={featured ? 'flex flex-col items-start gap-3' : 'flex flex-1 flex-col items-start gap-2 p-6'}>
        <p className="text-[14px] font-medium text-plasma-text">{project.category}</p>
        <h2 className={featured ? 'display text-[34px] sm:text-[42px]' : 'text-[22px] font-medium tracking-[-0.02em]'}>{project.name}</h2>
        <p className="text-pretty text-[16px] leading-[1.55] text-muted">{project.summary}</p>
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group mt-2 inline-flex min-h-10 items-center gap-1.5 rounded-[8px] text-[15px] font-medium text-white underline-offset-4 hover:underline"
          >
            Conhecer o projeto
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        ) : project.note ? (
          <p className="mt-2 text-[14px] text-faint">{project.note}</p>
        ) : null}
      </div>
    </article>
  )
}

function toProject(i: SiteItem): Project {
  return {
    name: i.title,
    category: i.category ?? '',
    summary: i.summary ?? '',
    href: i.href ?? undefined,
    note: i.note ?? undefined,
    art: 'mixed',
    images: [i.image, i.image2, i.image3].filter((x): x is string => !!x).map((src) => ({ src, alt: i.title })),
  }
}

export function Applications() {
  const items = useSiteItems()
  const list = items ? items.filter((i) => i.kind === 'projeto').map(toProject) : projects.filter((p) => !p.hidden)
  const [featured, ...rest] = list
  const extras = items ? items.filter((i) => i.kind === 'produto' || i.kind === 'servico') : []

  return (
    <>
      <PageHeader
        eyebrow="Projetos"
        title="Trabalho real, em produção."
        body="Sites, sistemas e produtos digitais que já estão no ar — cada um com a identidade do negócio para o qual foi feito."
        aside={
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute inset-x-[12%] inset-y-[16%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.2),transparent)]" aria-hidden />
            <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-inset ring-white/10">
              <ShardField variant="mixed" />
            </div>
          </div>
        }
      >
        <ButtonLink href="/orcamento" className="mt-2">
          Quero um projeto assim
        </ButtonLink>
      </PageHeader>

      <section aria-labelledby="projects-title" className="pb-20 pt-8 sm:pb-24">
        <Container size="xl">
          <h2 id="projects-title" className="sr-only">
            Projetos selecionados
          </h2>
          {featured ? (
            <Reveal>
              <ProjectCard project={featured} featured />
            </Reveal>
          ) : (
            <p className="text-[16px] text-muted">Novos projetos em breve.</p>
          )}
          {rest.length ? (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal as="li" key={p.name} delay={(i % 2) * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
          ) : null}
          {extras.length ? (
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {extras.map((x) => (
                <li key={x.id} className="rounded-card bg-surface p-6 ring-1 ring-inset ring-white/10">
                  {x.category ? <p className="text-[13px] text-faint">{x.category}</p> : null}
                  <h3 className="mt-1 text-[20px] font-medium tracking-[-0.02em]">{x.title}</h3>
                  {x.summary ? <p className="mt-2 text-[15px] text-muted">{x.summary}</p> : null}
                  {x.price_text ? <p className="mt-3 text-[15px] font-medium">{x.price_text}</p> : null}
                  {x.href ? (
                    <a className="mt-3 inline-block text-[15px] text-cyan-300 underline-offset-4 hover:underline" href={x.href} target="_blank" rel="noreferrer">
                      Saiba mais
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>

      <Milestones title="Como desenvolvemos" />

      <section aria-labelledby="cta-title" className="pb-20">
        <Container size="xl">
          <Reveal>
            <Card tone="ocean" className="grid items-center gap-6 p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 id="cta-title" className="display text-[32px] sm:text-[42px]">
                  Seu projeto pode ser o próximo.
                </h2>
                <p className="mt-3 max-w-[520px] text-[16px] leading-[1.55] text-white/85">Conte o que você precisa e receba uma proposta com escopo, prazo e valores claros.</p>
              </div>
              <ButtonLink href="/orcamento" size="lg">
                Solicitar orçamento
              </ButtonLink>
            </Card>
          </Reveal>
        </Container>
      </section>

      <Mission />
    </>
  )
}
