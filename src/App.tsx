import { lazy, Suspense, useEffect, useRef } from 'react'
import type { ComponentType, ReactNode } from 'react'

import { brand, posts } from './content'
import { match, scrollToHash, useLocation } from './lib/router'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Footer } from './sections/Footer'
import { Nav } from './sections/Nav'

// Inner pages load on demand so the landing page ships alone.
const page = <K extends string>(load: () => Promise<Record<K, ComponentType<{ slug?: string }>>>, name: K) =>
  lazy(() => load().then((m) => ({ default: m[name] })))
const Solucoes = page(() => import('./pages/Technology'), 'Technology')
const Projetos = page(() => import('./pages/Applications'), 'Applications')
const Sobre = page(() => import('./pages/Company'), 'Company')
const Planos = page(() => import('./pages/Plans'), 'Plans')
const Novidades = page(() => import('./pages/News'), 'News')
const Article = page(() => import('./pages/Article'), 'Article')
const Orcamento = page(() => import('./pages/EarlyAccess'), 'EarlyAccess')
const Contato = page(() => import('./pages/Contact'), 'Contact')
const Guia = page(() => import('./pages/StyleGuide'), 'StyleGuide')

/*
  A tabela de rotas. Adicione uma página aqui e um link em `nav`
  (src/content.ts).
*/
type Params = Record<string, string>
type Route = { path: string; title: string | ((p: Params) => string | null); render: (p: Params) => ReactNode }

const routes: Route[] = [
  { path: '/', title: brand.name, render: () => <Home /> },
  { path: '/solucoes', title: 'Soluções', render: () => <Solucoes /> },
  { path: '/projetos', title: 'Projetos', render: () => <Projetos /> },
  { path: '/sobre', title: 'Sobre', render: () => <Sobre /> },
  { path: '/planos', title: 'Planos', render: () => <Planos /> },
  { path: '/novidades', title: 'Novidades', render: () => <Novidades /> },
  { path: '/novidades/:slug', title: (p) => posts.find((x) => x.slug === p.slug)?.title ?? null, render: (p) => <Article slug={p.slug} /> },
  { path: '/orcamento', title: 'Orçamento', render: () => <Orcamento /> },
  { path: '/contato', title: 'Contato', render: () => <Contato /> },
  { path: '/guia', title: 'Guia de estilo', render: () => <Guia /> },
]

function resolve(path: string) {
  for (const r of routes) {
    const params = match(r.path, path)
    if (!params) continue
    const title = typeof r.title === 'function' ? r.title(params) : r.title
    // A detail route whose record does not exist is a 404.
    if (title === null) return null
    return { route: r, params, title }
  }
  return null
}

export function App() {
  const { path, hash } = useLocation()
  const hit = resolve(path)
  const main = useRef<HTMLElement>(null)
  const first = useRef(true)
  const title = hit ? hit.title : 'Página não encontrada'

  useEffect(() => {
    document.title = title === brand.name ? `${brand.name} · ${brand.tagline}` : `${title} | ${brand.name}`
  }, [title])

  // On navigation: jump to the hash target (after the page renders) or the
  // top, and move focus to <main> so screen readers announce the new page.
  useEffect(() => {
    // Read and clear `first` inside the frame: StrictMode runs this effect
    // twice on mount and cancels the first frame, so the page load still
    // counts as first and focus is not pulled into <main>.
    let raf = 0
    let tries = 0
    const run = () => {
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
      if (hash && !target && tries++ < 120) {
        raf = requestAnimationFrame(run)
        return
      }
      const isFirst = first.current
      first.current = false
      scrollToHash(hash, !isFirst)
      if (!isFirst && !hash) main.current?.focus({ preventScroll: true })
    }
    raf = requestAnimationFrame(run)
    return () => cancelAnimationFrame(raf)
  }, [path, hash])

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-control bg-white px-5 py-2.5 text-[14px] font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="main" ref={main} tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-screen" />}>{hit ? hit.route.render(hit.params) : <NotFound />}</Suspense>
      </main>
      <Footer />
    </>
  )
}
