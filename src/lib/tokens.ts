/*
  The design tokens as data, for the style guide. Keep in step with the
  @theme block in src/styles.css (the CSS is the source of truth).
*/
export const colorGroups = [
  {
    name: 'Surfaces',
    colors: [
      { name: 'bg', hex: '#000000' },
      { name: 'surface', hex: '#070810' },
      { name: 'surface-2', hex: '#0c0e1a' },
      { name: 'raised', hex: '#141827' },
    ],
  },
  {
    name: 'Text',
    colors: [
      { name: 'fg', hex: '#ffffff' },
      { name: 'soft', hex: '#d6dae2' },
      { name: 'muted', hex: '#9ca3af' },
      { name: 'faint', hex: '#7d8492' },
    ],
  },
  {
    name: 'Violet',
    colors: [
      { name: 'fire-1', hex: '#8b5cf6' },
      { name: 'fire-2', hex: '#c084fc' },
      { name: 'fire-3', hex: '#e9d5ff' },
      { name: 'ember', hex: '#4c1d95' },
    ],
  },
  {
    name: 'Blue',
    colors: [
      { name: 'ocean-1', hex: '#050b1e' },
      { name: 'ocean-2', hex: '#0d1838' },
      { name: 'ocean-3', hex: '#24407f' },
      { name: 'sky', hex: '#8fb0ff' },
      { name: 'ice', hex: '#e2ebff' },
      { name: 'plasma', hex: '#5b8cff' },
      { name: 'plasma-text', hex: '#a6c0ff' },
    ],
  },
  {
    name: 'Status',
    colors: [
      { name: 'success', hex: '#6ad8a2' },
      { name: 'danger', hex: '#ff8a7a' },
    ],
  },
]

export const typeScale = [
  { name: 'Display XL', cls: 'display text-[76px]', size: '76 / 1.02, 500, -0.035em' },
  { name: 'Display L', cls: 'display text-[56px]', size: '56 / 1.02, 500, -0.035em' },
  { name: 'Display M', cls: 'display text-[40px]', size: '40 / 1.02, 500, -0.035em' },
  { name: 'Title', cls: 'text-[24px] font-medium tracking-[-0.02em]', size: '24, 500' },
  { name: 'Card title', cls: 'text-[16px] font-medium', size: '16, 500' },
  { name: 'Lede', cls: 'text-[18px] leading-[1.55] text-muted', size: '18 / 1.55, 400' },
  { name: 'Body', cls: 'text-[16px] leading-[1.5] text-soft', size: '16 / 1.5, 400' },
  { name: 'Small', cls: 'text-[14px] text-muted', size: '14, 400' },
  { name: 'Caption', cls: 'text-[13px] text-faint', size: '13, 400' },
]

export const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 56, 80, 128]

export const radii = [
  { name: 'field', px: 14 },
  { name: 'card-sm', px: 20 },
  { name: 'card', px: 28 },
  { name: 'panel', px: 32 },
  { name: 'control (pill)', px: 999 },
]

export const shadows = [
  { name: 'card', value: '0 40px 80px -30px rgb(0 0 0 / 0.85)', cls: 'shadow-card' },
  { name: 'glow-fire', value: '0 0 120px -20px rgb(168 85 247 / 0.55)', cls: 'shadow-glow-fire' },
  { name: 'glow-plasma', value: '0 0 120px -10px rgb(34 211 238 / 0.45)', cls: 'shadow-glow-plasma' },
  { name: 'depth edge', value: 'inset 1px line + 1px top highlight', cls: 'depth' },
]

export const motion = [
  { name: 'reveal', value: '0.8s cubic-bezier(0.22, 1, 0.36, 1), rise 18px', kind: 'reveal' as const },
  { name: 'pulse', value: '4.8s ease-in-out infinite (core light)', kind: 'plasma' as const },
  { name: 'float', value: '8s ease-in-out infinite (monolith, beacons)', kind: 'float' as const },
  { name: 'press', value: '200ms scale 0.97 on :active', kind: 'press' as const },
  { name: 'streaks', value: 'canvas sway, paused off screen and with reduced motion', kind: 'streaks' as const },
]
