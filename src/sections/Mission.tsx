import { Container } from '../components/Container'
import { LinkRow } from '../components/Controls'
import { Reveal } from '../components/Reveal'
import { Skyline } from '../components/Skyline'
import { mission } from '../content'

/** "Build something that lasts": the neon panel with three ways in. */
export function Mission() {
  return (
    <section aria-labelledby="mission-title" className="pb-24 pt-8 sm:pb-32">
      <Container>
        <Reveal>
          <div className="depth relative isolate grid overflow-hidden rounded-panel bg-[radial-gradient(90%_120%_at_0%_100%,#6d5bd0_0%,#3b2f96_28%,#221a63_58%,#0d0a2c_100%)] p-7 [--depth-edge:rgb(196_181_253/0.25)] sm:p-10 lg:min-h-[440px] lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-14">
            <div className="grain pointer-events-none absolute inset-0 -z-10" aria-hidden />
            <div className="pointer-events-none absolute -left-24 top-1/2 -z-10 size-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(217,70,239,0.25),transparent)]" aria-hidden />
            <div className="flex flex-col">
              <h2 id="mission-title" className="display text-[44px] sm:text-[56px]">
                {mission.title.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </h2>
              <Skyline className="-mb-14 -ml-14 mt-10 w-[min(520px,calc(100%+56px))] sm:-mb-10 sm:-ml-10 lg:-mb-14 lg:-ml-14 lg:mt-auto" />
            </div>
            <ul className="mt-12 flex flex-col self-center lg:mt-0">
              {mission.rows.map((r) => (
                <li key={r.title}>
                  <LinkRow href={r.href} title={r.title} body={r.body} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
