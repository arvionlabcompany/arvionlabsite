import { ArrowUpRight } from 'lucide-react'

import { ButtonLink } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { ShardField } from '../components/ShardField'
import { projects } from '../content'
import type { Project } from '../content'
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
      <div className={featured ? 'relative aspect-[16/10] overflow-hidden rounded-[22px] ring-1 ring-inset ring-white/10' : 'relative aspect-[16/10] overflow-hidden rounded-t-card'}>
        <ShardField variant={project.art} />
      </div>
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

export function Applications() {
  const [featured, ...rest] = projects

  return (
    <>
      <PageHeader
        eyebrow="Projetos"
        title="Trabalho real, em produção."
        body="Sites, sistemas e produtos digitais que já estão no ar — cada um com a identidade do negócio para o qual foi feito."
        aside={
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute inset-x-[12%] inset-y-[16%] -z-10 rounded-full bg-cyan-400/20 blur-[80px]" aria-hidden />
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
          <Reveal>
            <ProjectCard project={featured} featured />
          </Reveal>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal as="li" key={p.name} delay={(i % 2) * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-[13px] text-faint">As imagens de capa são ilustrações da identidade de cada projeto; os sites reais estão nos links.</p>
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
