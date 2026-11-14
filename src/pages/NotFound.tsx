import { Beacon } from '../components/Beacon'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { LinkRow } from '../components/Controls'
import { notFound } from '../content'

export function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="ocean-wash relative isolate overflow-hidden pb-24 pt-36 sm:pt-44">
      <Container size="md" className="flex flex-col items-center text-center">
        <Beacon kind="platform" className="h-[110px] w-auto animate-float opacity-80" decorative />
        <p className="mt-8 text-[15px] font-medium text-plasma-text">Erro 404</p>
        <h1 id="nf-title" className="display mt-3 text-[48px] sm:text-[64px]">
          {notFound.title}
        </h1>
        <p className="mt-4 max-w-[460px] text-[17px] text-muted">{notFound.body}</p>
        <ButtonLink href="/" size="lg" className="mt-8">
          Voltar para o início
        </ButtonLink>
        <ul className="mt-14 w-full max-w-[520px] text-left">
          <li>
            <LinkRow href="/solucoes" title="Soluções" body="Sites, sistemas e produtos digitais." />
          </li>
          <li>
            <LinkRow href="/projetos" title="Projetos" body="Trabalho real, no ar." />
          </li>
          <li>
            <LinkRow href="/contato" title="Contato" body="Fale com a gente pelo WhatsApp." />
          </li>
        </ul>
      </Container>
    </section>
  )
}
