import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/Typography'
import { process } from '../content'

/** O processo em quatro etapas: briefing, planejamento, desenvolvimento e publicação. */
export function Milestones({ title = 'Como funciona' }: { title?: string }) {
  return (
    <section aria-labelledby="milestones-title" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading id="milestones-title" title={title} size="md" />
        </Reveal>
        <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-5">
          <span className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-white/12 md:left-0 md:top-[7px] md:h-px md:w-full" aria-hidden />
          {process.map((m, i) => (
            <Reveal as="li" key={m.when} delay={i * 0.06} className="relative flex flex-col gap-2 pl-8 md:pl-0 md:pt-8">
              <span className="round absolute left-0 top-0.5 size-[15px] rounded-full bg-fire-2 shadow-[0_0_24px_4px_rgb(192_132_252/0.45)] ring-4 ring-black md:top-0" aria-hidden />
              <span className="text-[14px] font-medium text-fire-3">{m.when}</span>
              <h3 className="text-[17px] font-medium">{m.title}</h3>
              <p className="text-pretty text-[15px] leading-[1.5] text-muted">{m.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
