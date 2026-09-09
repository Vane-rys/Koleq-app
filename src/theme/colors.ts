// Paleta Koleq — extraída de DESIGN.md
export const colors = {
  // Primarios
  noche: '#0F1B3D',      // texto principal, base oscura
  indigo: '#3D52D5',     // acento primario (CTAs, botones)
  violeta: '#6C63FF',    // acento secundario (badges/highlights, NUNCA fondo completo)

  // Fondos y superficies
  cielo: '#E8ECFF',      // fondos tintados (badges, pills)
  niebla: '#F5F4FF',     // superficies / tarjetas
  blanco: '#FFFFFF',     // base principal

  // Estados semánticos (ver README del handoff)
  exito: '#166534',
  exitoBg: '#F0FAF4',
  error: '#991B1B',
  errorBg: '#FEF2F2',
  advertencia: '#92400E',
  advertenciaBg: '#FFFBEB',
  info: '#3D52D5',
  infoBg: '#E8ECFF',

  // Neutros de apoyo (grises usados en los mockups)
  gris400: '#9A9A9A',
  gris200: '#F0F0F5',
} as const;

export type ColorToken = keyof typeof colors;
