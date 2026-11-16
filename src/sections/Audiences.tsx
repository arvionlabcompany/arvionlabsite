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
              <div className="relative w-full max-w-[320px]">
                <div className="absolute inset-[-8%] -z-10 bg-[radial-gradient(closest-side,rgba(139,92,246,0.28),transparent)]" aria-hidden />
                <img
                  src={a.image}
                  alt={a.imageAlt}
                  width={480}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-[20px] object-cover ring-1 ring-inset ring-white/15"
                />
              </div>
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
