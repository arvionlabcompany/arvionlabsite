import { Beacon } from '../components/Beacon'
import { TextLink } from '../components/Button'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/Typography'
import { audiences } from '../content'

/** "Para quem desenvolvemos": as três frentes de serviço. */
export function Audiences() {
  return (
    <section aria-labelledby="audiences-title" className="pb-10 pt-24 sm:pb-12 sm:pt-32">
      <Container>
        <Reveal>
          <SectionHeading id="audiences-title" title="Soluções para cada etapa do seu negócio" size="md" />
        </Reveal>
        <ul className="mx-auto mt-14 grid max-w-[1080px] gap-14 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.id} delay={i * 0.08} className="flex flex-col items-center text-center">
              <Beacon kind={a.art} className="h-[96px] w-auto" decorative />
              <h3 className="mt-5 text-[17px] font-medium">{a.title}</h3>
              <p className="mt-2 max-w-[300px] text-pretty text-[15px] leading-[1.5] text-muted">{a.body}</p>
              <TextLink href={a.href} className="mt-3 text-[14px]">
                Solicitar orçamento
              </TextLink>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
