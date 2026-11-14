import { useEffect, useState } from 'react'

/*
  Ligação com o ARVION OS (painel único). O site lê o conteúdo publicado, envia
  formulários como leads e conta acessos anônimos. Se o OS estiver fora do ar,
  o site continua funcionando com o conteúdo de content.ts.
  O "&i=1" evita a página de verificação da InfinityFree em chamadas de API.
*/
const OS_API = 'https://arvionsystem.wuaze.com/api.php'
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
    cache = fetch(url('pub'))
      .then((r) => (r.ok ? r.json() : null))
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

export function forwardLead(type: 'contact' | 'early-access' | 'subscribe', data: unknown) {
  if (typeof data !== 'object' || data === null) return
  try {
    void fetch(url('intake'), {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: JSON.stringify({ type, ...(data as Record<string, unknown>) }),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* o formulário já foi salvo pela API do próprio site */
  }
}

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
export function trackHit(path: string) {
  try {
    const ref = first ? document.referrer : ''
    first = false
    void fetch(url('hit'), {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: JSON.stringify({ path, vid: visitorId(), ref }),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* contagem é opcional */
  }
}
