import { useEffect, useState } from 'react'

/*
  Ligação com o ARVION OS (painel único). Leads e acessos são gravados pelo
  servidor do site (api/os_bridge.php) direto no banco do OS; o navegador só
  fala com o próprio site. A leitura de projetos/textos do OS fica para a etapa 2.
*/
const OS_API = 'https://arvionsystem.wuaze.com/ponte.php'
/** Etapa 2: leitura de projetos/textos do OS (ainda desligada). */
const PUB_ENABLED = false
const url = (a: string) => `${OS_API}?a=${a}&i=1`

export type SiteItem = {
  id: number
  kind: 'projeto' | 'produto' | 'servico' | 'texto'
  slug: string | null
  title: string
  category: string | null
  summary: string | null
  href: string | null
  note: string | null
  image: string | null
  image2: string | null
  image3: string | null
  price_text: string | null
  sort: number
}

let cache: Promise<SiteItem[] | null> | null = null
export function loadSiteItems(): Promise<SiteItem[] | null> {
  if (!cache) {
    cache = (PUB_ENABLED ? fetch(url('pub')) : Promise.resolve(null as unknown as Response))
      .then((r) => (r && r.ok ? r.json() : null))
      .then((j) => (j && Array.isArray(j.items) ? (j.items as SiteItem[]) : null))
      .catch(() => null)
  }
  return cache
}

/** undefined = carregando · null = OS indisponível · lista = conteúdo do OS */
export function useSiteItems(): SiteItem[] | null | undefined {
  const [items, setItems] = useState<SiteItem[] | null | undefined>(undefined)
  useEffect(() => {
    let live = true
    loadSiteItems().then((v) => live && setItems(v))
    return () => {
      live = false
    }
  }, [])
  return items
}

/** Texto editável no OS (tipo "texto", pela Chave); usa o padrão se não houver. */
export function useSiteText(slug: string, fallback: string): string {
  const items = useSiteItems()
  const hit = items?.find((i) => i.kind === 'texto' && i.slug === slug && i.summary)
  return hit?.summary ?? fallback
}

export const siteImg = (u: string) => u

function visitorId(): string {
  try {
    let v = localStorage.getItem('av_vid')
    if (!v) {
      v = Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) => b.toString(16).padStart(2, '0')).join('')
      localStorage.setItem('av_vid', v)
    }
    return v
  } catch {
    return ''
  }
}

let first = true
/** Conta o acesso de forma anônima: o servidor do site grava no ARVION OS. */
export function trackHit(path: string) {
  try {
    const ref = first ? document.referrer : ''
    first = false
    void fetch('/api/hit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ path, vid: visitorId(), ref }),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* contagem é opcional */
  }
}
