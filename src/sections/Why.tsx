import { Card, CardText } from '../components/Card'
import { Container } from '../components/Container'
import { FireStreaks } from '../components/FireStreaks'
import { Monolith } from '../components/Monolith'
import { Pedigree } from '../components/Pedigree'
import { Reveal } from '../components/Reveal'
import { ShardField } from '../components/ShardField'
import { SectionHeading } from '../components/Typography'
import { why } from '../content'

/** "Por que a ARVION Lab?": três cartões de prova sobre faixas neon. */
export function Why() {
  const [team, prototype, volume] = why.cards
  return (
    <section aria-labelledby="why-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading id="why-title" title={why.title} />
        </Reveal>
      </Container>
      <div className="relative mt-14 sm:mt-20">
        <div className="absolute inset-x-0 top-1/2 -z-10 h-[150%] -translate-y-1/2" aria-hidden>
          <FireStreaks intensity={1.2} />
        </div>
        <Container size="xl">
          <ul className="mx-auto grid max-w-[420px] gap-4 lg:max-w-[1180px] lg:grid-cols-3 lg:gap-8">
            <Reveal as="li">
              <Card tone="fire" as="article" className="flex h-[560px] flex-col sm:h-[600px]">
                <div className="absolute inset-0 -z-10">
                  <ShardField variant="magenta" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,#120629_0%,rgba(10,4,26,0.35)_35%,rgba(10,4,26,0.6)_100%)]" />
                  <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#3b0764] from-10% via-[#6d28d9]/60 to-transparent" />
                </div>
                <CardText title={team.title} body={team.body} />
                <div className="mt-auto p-1.5">
                  <Pedigree marks={why.marks} />
                </div>
              </Card>
            </Reveal>
            <Reveal as="li" delay={0.08}>
              <Card tone="ocean" as="article" className="flex h-[560px] flex-col sm:h-[600px]">
                <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-[#0a1038] to-transparent" aria-hidden />
                <CardText title={prototype.title} body={prototype.body} />
                <div className="relative mx-auto mt-auto w-[84%] translate-y-[3%]">
                  <div className="absolute inset-[14%] -z-10 rounded-full bg-fuchsia-500/30 blur-[50px]" aria-hidden />
                  <Monolith className="w-full" label="" />
                </div>
              </Card>
            </Reveal>
            <Reveal as="li" delay={0.16}>
              <Card tone="stripes" as="article" className="flex h-[560px] flex-col sm:h-[600px]">
                <div className="absolute inset-x-0 top-0 -z-10 h-[45%] bg-gradient-to-b from-[#1a1f5c] via-[#2a2f7a]/70 to-transparent" aria-hidden />
                <CardText title={volume.title} body={volume.body} />
                <p className="mt-auto px-6 pb-8 text-center text-[88px] font-medium leading-none tracking-[-0.05em] sm:text-[104px]">
                  {volume.stat}
                  <span className="ml-1 text-[0.62em]">{volume.unit}</span>
                </p>
              </Card>
            </Reveal>
          </ul>
        </Container>
      </div>
    </section>
  )
}
