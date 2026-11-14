// Validação compartilhada entre os formulários e a API PHP, para as duas
// pontas darem a mesma resposta.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const SEGMENTS = ['landing', 'site', 'sistema', 'outro'] as const
export const TOPICS = ['orcamento', 'suporte', 'parceria', 'outro'] as const

type Errors<T> = Partial<Record<keyof T, string>>

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return 'Informe seu e-mail.'
  if (!EMAIL_RE.test(email.trim())) return 'Informe um e-mail válido, como voce@empresa.com.'
  return undefined
}

function validateName(name: string): string | undefined {
  const n = name.trim()
  if (n.length < 2) return 'Informe seu nome completo.'
  if (n.length > 80) return 'Mantenha o nome com até 80 caracteres.'
  return undefined
}

export type EarlyAccessInput = {
  name: string
  email: string
  organisation: string
  role?: string
  segment: string
  fleetSize: string
  timeline: string
  notes?: string
}

export function validateEarlyAccessStep1(v: Partial<EarlyAccessInput>): Errors<EarlyAccessInput> {
  const e: Errors<EarlyAccessInput> = {}
  const name = validateName(v.name ?? '')
  if (name) e.name = name
  const email = validateEmail(v.email ?? '')
  if (email) e.email = email
  const org = (v.organisation ?? '').trim()
  if (org.length < 2) e.organisation = 'Informe o nome do seu negócio.'
  else if (org.length > 100) e.organisation = 'Mantenha este campo com até 100 caracteres.'
  if (!SEGMENTS.includes((v.segment ?? '') as (typeof SEGMENTS)[number])) e.segment = 'Escolha uma opção.'
  return e
}

export function validateEarlyAccessStep2(v: Partial<EarlyAccessInput>): Errors<EarlyAccessInput> {
  const e: Errors<EarlyAccessInput> = {}
  if (!v.fleetSize) e.fleetSize = 'Escolha o tamanho do negócio.'
  if (!v.timeline) e.timeline = 'Escolha um prazo.'
  if ((v.notes ?? '').length > 1000) e.notes = 'Mantenha as observações com até 1.000 caracteres.'
  return e
}

export function validateEarlyAccess(v: Partial<EarlyAccessInput>): Errors<EarlyAccessInput> {
  return { ...validateEarlyAccessStep1(v), ...validateEarlyAccessStep2(v) }
}

export type ContactInput = { name: string; email: string; topic: string; message: string }

export function validateContact(v: Partial<ContactInput>): Errors<ContactInput> {
  const e: Errors<ContactInput> = {}
  const name = validateName(v.name ?? '')
  if (name) e.name = name
  const email = validateEmail(v.email ?? '')
  if (email) e.email = email
  if (!TOPICS.includes((v.topic ?? '') as (typeof TOPICS)[number])) e.topic = 'Escolha um assunto.'
  const msg = (v.message ?? '').trim()
  if (msg.length < 20) e.message = `Escreva pelo menos 20 caracteres (${msg.length} até agora).`
  else if (msg.length > 2000) e.message = 'Mantenha a mensagem com até 2.000 caracteres.'
  return e
}

export function hasErrors(e: object) {
  return Object.keys(e).length > 0
}
