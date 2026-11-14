/*
  Todo texto, número e registro do site vive aqui. Edite este arquivo primeiro.
  As páginas e seções só fazem o layout. Conteúdo baseado no site real da
  ARVION Lab (arvionlab.wuaze.com).
*/

export const brand = {
  name: 'ARVION Lab',
  short: 'ARVION Lab',
  tagline: 'Digital Engineering & Creative Technology',
  whatsapp: '+55 21 98358-7707',
  whatsappUrl: 'https://wa.me/5521983587707',
  instagram: '@arvionlab',
  instagramUrl: 'https://www.instagram.com/arvionlab/',
  location: 'Atendimento online · Rio de Janeiro, Brasil',
}

export const nav = [
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Planos', href: '/planos' },
  { label: 'Novidades', href: '/novidades' },
]

export const cta = { label: 'Solicitar orçamento', href: '/orcamento' }

export const hero = {
  eyebrow: 'Black November: R$ 180/mês e entrega em até 7 dias',
  title: ['Tecnologia que', 'transforma ideias', 'em soluções reais.'],
  body: 'Desenvolvemos sites, sistemas e produtos digitais personalizados para empresas que buscam evoluir, inovar e conquistar espaço no ambiente digital.',
  primary: { label: 'Conheça nossas soluções', href: '/solucoes' },
  secondary: { label: 'Ver projetos', href: '/projetos' },
  stats: [
    { value: '3', unit: '', label: 'Divisões de serviço' },
    { value: '5', unit: '', label: 'Projetos no ar' },
    { value: '7', unit: 'dias', label: 'Entrega na promoção' },
  ],
}

export type Segment = 'landing' | 'site' | 'sistema' | 'outro'

export const audiences: Array<{ id: string; title: string; body: string; href: string; art: 'product' | 'ai' | 'platform' }> = [
  {
    id: 'sites',
    title: 'Sites e presença digital',
    body: 'Institucionais, landing pages e portfólios com identidade própria e agendamento pelo WhatsApp.',
    href: '/orcamento?segment=site',
    art: 'product',
  },
  {
    id: 'sistemas',
    title: 'Sistemas e plataformas',
    body: 'Painéis administrativos, controle de dados e automações sob medida para a sua operação.',
    href: '/orcamento?segment=sistema',
    art: 'platform',
  },
  {
    id: 'produtos',
    title: 'Produtos próprios',
    body: 'Apps e plataformas da ARVION Products, como o PASSIN cut para barbearias.',
    href: '/projetos',
    art: 'ai',
  },
]

export const why = {
  title: ['Por que a', 'ARVION Lab?'],
  cards: [
    {
      kind: 'team' as const,
      title: 'Atendimento direto',
      body: 'Você fala com quem desenvolve, do briefing à publicação. Sem intermediários e sem repassar o projeto adiante.',
    },
    {
      kind: 'prototype' as const,
      title: 'Solução sob medida',
      body: 'Cada projeto começa ouvindo você: entendemos o objetivo, desenhamos a solução e acompanhamos a entrega.',
    },
    {
      kind: 'volume' as const,
      title: 'Entrega em até 7 dias',
      body: 'Com a promoção Black November, seu site fica pronto em até 7 dias, por R$ 180/mês.',
      stat: '7',
      unit: 'dias',
    },
  ],
  // Palavras que resumem o serviço, definidas como wordmarks tipográficos.
  marks: [
    { name: 'Sites', style: 'wide' as const },
    { name: 'SISTEMAS', style: 'mono' as const },
    { name: 'Apps', style: 'serif-caps' as const },
    { name: 'Design', style: 'serif' as const },
  ],
}

export const process = [
  { when: '01', title: 'Briefing', body: 'Entendemos o negócio, o público e os objetivos do cliente.' },
  { when: '02', title: 'Planejamento', body: 'Definimos a estrutura, as referências e as prioridades do projeto.' },
  { when: '03', title: 'Desenvolvimento', body: 'Construímos com atenção ao visual, à responsividade e à experiência do usuário.' },
  { when: '04', title: 'Revisão e publicação', body: 'Revisamos os detalhes, testamos as funcionalidades e preparamos a publicação.' },
]

export const mission = {
  title: ['Seu próximo', 'projeto começa', 'aqui.'],
  rows: [
    { title: 'Solicitar orçamento', body: 'Conte o que você precisa e receba uma proposta.', href: '/orcamento' },
    { title: 'Ver planos e valores', body: 'Criação, mensalidade e o que está incluso.', href: '/planos' },
    { title: 'Falar pelo WhatsApp', body: '+55 21 98358-7707 · atendimento direto', href: brand.whatsappUrl },
  ],
}

export const footer = {
  blurb: 'Digital Engineering & Creative Technology. Desenvolvimento, programação e design.',
  columns: [
    {
      title: 'Navegação',
      links: [
        { label: 'Soluções', href: '/solucoes' },
        { label: 'Projetos', href: '/projetos' },
        { label: 'Planos', href: '/planos' },
        { label: 'Sobre', href: '/sobre' },
      ],
    },
    {
      title: 'Serviços',
      links: [
        { label: 'ARVION Web', href: '/solucoes' },
        { label: 'ARVION Solutions', href: '/solucoes' },
        { label: 'ARVION Products', href: '/projetos' },
        { label: 'Guia de estilo', href: '/guia' },
      ],
    },
  ],
  legal: '© 2026 ARVION Lab · desenvolvimento, programação e design.',
}

/* ---------- Soluções ---------- */

export const solutions = {
  eyebrow: 'Soluções',
  title: 'Três divisões. Uma mesma engenharia.',
  body: 'Unimos desenvolvimento, programação e design para construir experiências digitais que ajudam empresas e profissionais a evoluírem.',
  parts: [
    {
      id: 'web',
      name: 'ARVION Web',
      body: 'Desenvolvimento de sites institucionais, landing pages, portfólios e experiências digitais personalizadas.',
      spec: 'Sites · Landing · Portfólio',
      x: 50,
      y: 28,
    },
    {
      id: 'solutions',
      name: 'ARVION Solutions',
      body: 'Sistemas empresariais, painéis administrativos, plataformas de gestão e soluções personalizadas.',
      spec: 'Sistemas · Painéis',
      x: 50,
      y: 52,
    },
    {
      id: 'products',
      name: 'ARVION Products',
      body: 'Criação e comercialização de produtos digitais próprios, aplicativos e plataformas.',
      spec: 'Apps · Plataformas',
      x: 50,
      y: 76,
    },
  ],
  specs: [
    { label: 'Site: criação a partir de', value: 'R$ 297' },
    { label: 'Mensalidade de sites', value: 'R$ 89,90' },
    { label: 'Sistema: criação a partir de', value: 'R$ 597' },
    { label: 'Mensalidade de sistemas', value: 'R$ 249,90' },
    { label: 'Entrega na promoção', value: 'Até 7 dias' },
    { label: 'Responsivo', value: 'Celular, tablet e desktop' },
  ],
  principles: [
    { title: 'Projeto sob medida', body: 'Nada de template genérico: cada site e sistema tem identidade própria para o negócio do cliente.' },
    { title: 'Comunicação direta', body: 'Briefing, revisões e entrega conversados diretamente com você, do início ao fim.' },
    { title: 'Pronto para o celular', body: 'Sites e sistemas desenvolvidos para adaptar-se a celular, tablet e computador.' },
  ],
}

/* ---------- Projetos ---------- */

export type Project = {
  name: string
  category: string
  summary: string
  href?: string
  note?: string
  art: 'cyan' | 'magenta' | 'mixed'
}

export const projects: Project[] = [
  {
    name: 'Barbeiro Jacke',
    category: 'Site · Barbearia',
    summary: 'Presença digital para barbearia com atendimento a domicílio, em duas versões visuais e agendamento pelo WhatsApp.',
    href: 'https://barbeirojacke.htmly.com.br/',
    art: 'cyan',
  },
  {
    name: 'PASSIN cut',
    category: 'App / Web · ARVION Products',
    summary: 'Aplicativo de assinaturas para barbearias: planos mensais, cobrança por Pix e controle de assinantes, planos e faturas.',
    href: 'https://assinaturasjacke.wuaze.com/',
    art: 'magenta',
  },
  {
    name: 'Controle Veicular Pro',
    category: 'Sistema web · ARVION Solutions',
    summary: 'Sistema de uso interno com dashboard de indicadores e gráficos, financeiro, notas e histórico.',
    note: 'Acesso restrito',
    art: 'mixed',
  },
  {
    name: 'Beatriz Bhering',
    category: 'Site · Nail designer',
    summary: 'Presença digital para nail designer, com valores, trabalhos, espaço e agendamento, em duas versões visuais.',
    href: 'https://beatrizbhering.htmly.com.br/',
    art: 'magenta',
  },
  {
    name: 'JR Barbearia',
    category: 'Site · Barbearia',
    summary: 'Site em preto e vermelho com foto de impacto em tela cheia e agendamento direto pelo WhatsApp.',
    art: 'cyan',
  },
]

/* ---------- Planos ---------- */

export type Plan = {
  id: string
  name: string
  tagline: string
  features: string[]
  creation: number
  monthly: number
  popular?: boolean
}

export const plans = {
  eyebrow: 'Planos e contratação',
  title: 'Valores claros, sem surpresas.',
  body: 'Cada serviço tem um valor de criação (pago uma vez) e uma mensalidade, que mantém tudo funcionando.',
  site: [
    {
      id: 'essencial',
      name: 'Site Essencial',
      tagline: 'Sua presença online de forma profissional!',
      features: ['1 página (serviços, preços e localização)', 'Botão de WhatsApp', 'Design moderno e responsivo'],
      creation: 297,
      monthly: 89.9,
    },
    {
      id: 'completo',
      name: 'Site Completo',
      tagline: 'Tudo o que você precisa para crescer!',
      features: ['Galeria de imagens', 'Depoimentos de clientes', 'Agendamento por serviço', 'Google Maps integrado'],
      creation: 497,
      monthly: 89.9,
      popular: true,
    },
    {
      id: 'premium',
      name: 'Site Premium',
      tagline: 'O máximo em inovação e visibilidade!',
      features: ['Design exclusivo', 'SEO local (Google)', '2 atualizações por mês'],
      creation: 797,
      monthly: 89.9,
    },
  ] as Plan[],
  extras: [
    {
      id: 'landing',
      name: 'Landing page de campanha',
      tagline: 'Uma página focada em uma ação: contato, agendamento ou venda.',
      features: [],
      creation: 397,
      monthly: 89.9,
    },
    {
      id: 'catalogo',
      name: 'Catálogo digital',
      tagline: 'Produtos ou serviços com fotos, preços e pedido pelo WhatsApp.',
      features: [],
      creation: 697,
      monthly: 89.9,
    },
    {
      id: 'melhoria',
      name: 'Melhoria em site existente',
      tagline: 'Ajustes visuais e evolução do seu site atual, conforme avaliação.',
      features: [],
      creation: 149,
      monthly: 89.9,
    },
  ] as Plan[],
  system: {
    name: 'Sistemas',
    body: 'Sistemas e plataformas sob medida, com implantação acompanhada.',
    creationFrom: 597,
    monthly: 249.9,
  },
  includes: [
    'Hospedagem e suporte',
    'Manutenção do serviço funcionando',
    'Sites: pequenos ajustes',
    'Sistemas: atualizações',
    'Tudo conforme o escopo contratado, sem cobranças recorrentes escondidas',
  ],
  adjustments: [
    'Os valores podem ser reajustados, com aviso prévio ao cliente',
    'O novo valor considera custos, complexidade, suporte e melhorias',
    'Novas funcionalidades ou expansão do projeto são orçadas à parte',
    'Contratos promocionais seguem as condições acordadas na contratação',
  ],
  promo: {
    title: 'Black November',
    body: 'Em novembro, qualquer serviço da ARVION Lab por R$ 180/mês, com entrega em até 7 dias. Contratos promocionais seguem as condições acordadas na contratação.',
    monthly: 180,
    turnaround: 'até 7 dias',
  },
  estimator: {
    title: 'Simule o investimento',
    body: 'Escolha um serviço e por quantos meses quer manter a mensalidade para ver o custo total do período.',
    monthsLabel: 'Meses de mensalidade',
    defaultMonths: 12,
  },
  faq: [
    {
      q: 'Como funciona a criação de um site?',
      a: 'Em quatro etapas: briefing, planejamento, desenvolvimento e revisão com publicação. Tudo é conversado diretamente com você, do início ao fim.',
    },
    {
      q: 'Quanto custa?',
      a: 'Sites: criação a partir de R$ 297,00 (pago uma vez) + mensalidade a partir de R$ 89,90. Sistemas: criação e implantação a partir de R$ 597,00 + mensalidade de R$ 249,90. O valor final depende do escopo.',
    },
    {
      q: 'O que está incluso na mensalidade?',
      a: 'Hospedagem, suporte e manutenção para manter o serviço funcionando, além de pequenos ajustes (sites) ou atualizações (sistemas), conforme o escopo contratado.',
    },
    {
      q: 'Os valores podem mudar?',
      a: 'Podem ser reajustados no futuro, com aviso prévio ao cliente, considerando custos, complexidade, suporte e melhorias. Contratos promocionais seguem as condições acordadas.',
    },
    {
      q: 'O site funciona em celulares?',
      a: 'Sim. Os sites são desenvolvidos para se adaptar a celular, tablet e computador.',
    },
    {
      q: 'Posso solicitar um design personalizado?',
      a: 'Sim. O plano Premium traz design exclusivo, e os demais seguem um visual moderno pensado para a identidade do seu negócio.',
    },
    {
      q: 'Posso pedir alterações depois da entrega?',
      a: 'Pequenos ajustes estão incluídos conforme o escopo contratado. Novas funcionalidades ou expansão significativa do projeto são orçadas separadamente.',
    },
    {
      q: 'Como faço para contratar?',
      a: 'Chame no WhatsApp, conte sobre seu negócio e receba uma proposta. Informações do negócio, textos, logotipo e imagens ajudam no briefing.',
    },
  ],
}

/* ---------- Sobre ---------- */

export const company = {
  eyebrow: 'Sobre a ARVION',
  title: 'Necessidades reais, soluções digitais eficientes.',
  paragraphs: [
    'A ARVION Lab nasceu com o propósito de transformar necessidades reais em soluções digitais eficientes. Unimos desenvolvimento, programação e design para construir experiências tecnológicas que ajudam empresas e profissionais a evoluírem.',
    'Cada projeto começa ouvindo você: entendemos seu objetivo, desenhamos a solução sob medida e acompanhamos a entrega com atendimento direto e comunicação objetiva.',
  ],
  stats: [
    { value: '3', label: 'Divisões de serviço' },
    { value: '5', label: 'Projetos no ar' },
    { value: '7', label: 'Dias na promoção' },
    { value: 'R$ 89,90', label: 'Mensalidade de sites' },
  ],
  divisions: [
    { name: 'ARVION Web', role: 'Sites e experiências digitais', bio: 'Institucionais, landing pages, portfólios e projetos com identidade própria.' },
    { name: 'ARVION Solutions', role: 'Sistemas e plataformas', bio: 'Painéis administrativos, gestão e automações para a operação de cada negócio.' },
    { name: 'ARVION Products', role: 'Apps e produtos próprios', bio: 'Produtos digitais criados e comercializados pela própria ARVION Lab.' },
  ],
  values: [
    { title: 'Nossa proposta', body: 'Sites e sistemas sob medida, com identidade própria para cada negócio.' },
    { title: 'Nosso compromisso', body: 'Projeto conforme o que foi combinado, com suporte e comunicação direta.' },
    { title: 'Design e código juntos', body: 'A mesma equipe desenha e programa: menos ruído, entrega mais rápida.' },
  ],
}

/* ---------- Novidades ---------- */

export const newsCategories = ['Projetos', 'Produtos', 'Sistemas', 'Promoção'] as const
export type NewsCategory = (typeof newsCategories)[number]

export type Post = {
  slug: string
  title: string
  category: NewsCategory
  date: string
  summary: string
  body: string[]
  tone: 'fire' | 'ocean' | 'steel'
  /** Texto grande na capa (apenas capas "fire"). */
  cover?: string
}

export const posts: Post[] = [
  {
    slug: 'black-november',
    title: 'Black November: R$ 180/mês e entrega em até 7 dias',
    category: 'Promoção',
    date: '2026-11-03',
    summary: 'Em novembro, qualquer serviço da ARVION Lab sai por R$ 180/mês, com entrega em até 7 dias.',
    tone: 'fire',
    cover: 'R$ 180',
    body: [
      'Durante a Black November, qualquer serviço da ARVION Lab sai por R$ 180/mês, com entrega em até 7 dias.',
      'Vale para sites institucionais, landing pages, catálogos digitais e as demais soluções da ARVION Web. Contratos promocionais seguem as condições acordadas na contratação.',
      'Para aproveitar, é só chamar no WhatsApp e contar sobre o seu negócio.',
    ],
  },
  {
    slug: 'barbeiro-jacke',
    title: 'Barbeiro Jacke: presença digital em duas versões',
    category: 'Projetos',
    date: '2026-09-18',
    summary: 'Site para barbearia com atendimento a domicílio, duas versões visuais e agendamento pelo WhatsApp.',
    tone: 'ocean',
    body: [
      'O Barbeiro Jacke precisava de uma presença digital à altura do atendimento a domicílio. Desenvolvemos o site em duas versões visuais: preto e azul elétrico, e preto quente com cobre.',
      'O site apresenta serviços, trabalhos e formas de contato, com agendamento direto pelo WhatsApp para reduzir o vai e vem de mensagens.',
      'É um dos projetos da ARVION Web já no ar e pode ser visitado em barbeirojacke.htmly.com.br.',
    ],
  },
  {
    slug: 'passin-cut',
    title: 'PASSIN cut: assinaturas para barbearias',
    category: 'Produtos',
    date: '2026-10-02',
    summary: 'Aplicativo de assinaturas com planos mensais, cobrança por Pix e controle de assinantes.',
    tone: 'ocean',
    body: [
      'O PASSIN cut é um produto da ARVION Products: um aplicativo de assinaturas para barbearias, com planos mensais, cobrança por Pix e controle de assinantes, planos e faturas.',
      'A ideia é simples: o cliente assina um plano e o barbeiro acompanha tudo em um painel, sem planilhas paralelas.',
      'O produto está no ar em assinaturasjacke.wuaze.com.',
    ],
  },
  {
    slug: 'controle-veicular-pro',
    title: 'Controle Veicular Pro entrou em operação',
    category: 'Sistemas',
    date: '2026-10-21',
    summary: 'Sistema web de uso interno com dashboard de indicadores, financeiro, notas e histórico.',
    tone: 'steel',
    body: [
      'O Controle Veicular Pro é um sistema de uso interno desenvolvido pela ARVION Solutions, com dashboard de indicadores e gráficos, área financeira, notas e histórico.',
      'Por ser uma ferramenta interna, o acesso é restrito. O projeto mostra como um painel sob medida substitui controles espalhados por planilhas.',
    ],
  },
]

/* ---------- Formulários ---------- */

export const earlyAccess = {
  eyebrow: 'Orçamento',
  title: 'Seu próximo projeto começa aqui.',
  body: 'Conte o que você precisa e receba uma proposta pelo WhatsApp. O atendimento é direto, com quem vai desenvolver o projeto.',
  steps: ['Seu contato', 'Sobre o projeto', 'Revisão'],
  segments: [
    { id: 'landing', label: 'Landing page', hint: 'Uma página para uma campanha ou ação' },
    { id: 'site', label: 'Site institucional', hint: 'Presença digital do negócio' },
    { id: 'sistema', label: 'Sistema web', hint: 'Painel, gestão ou automação' },
    { id: 'outro', label: 'Outro / ainda não sei', hint: 'Conte a ideia no campo de observações' },
  ],
  businessSizes: ['Só eu', '2 a 10 pessoas', '11 a 50 pessoas', 'Mais de 50'],
  timelines: ['Quanto antes', 'Em até 30 dias', 'Próximos meses', 'Ainda pesquisando'],
  success: {
    title: 'Briefing recebido',
    body: 'Obrigado! Vamos responder com os próximos passos pelo WhatsApp informado.',
  },
}

export const contact = {
  eyebrow: 'Contato',
  title: 'Vamos conversar sobre o seu projeto.',
  body: 'Conte o que você precisa e receba uma proposta. O atendimento é feito diretamente pelo WhatsApp ou pelo Instagram.',
  topics: [
    { id: 'orcamento', label: 'Orçamento' },
    { id: 'suporte', label: 'Suporte' },
    { id: 'parceria', label: 'Parceria' },
    { id: 'outro', label: 'Outro' },
  ],
  channels: [
    { name: 'WhatsApp', value: brand.whatsapp, href: brand.whatsappUrl, note: 'Resposta mais rápida' },
    { name: 'Instagram', value: brand.instagram, href: brand.instagramUrl, note: 'Projetos e bastidores' },
  ],
  hours: 'Atendimento online, de segunda a sexta.',
}

export const notFound = {
  title: 'Página não encontrada',
  body: 'Esse link saiu do ar ou nunca existiu. Volte para o início ou veja os projetos.',
}
