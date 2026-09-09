// Tipografía Koleq — Plus Jakarta Sans (display) + DM Sans (cuerpo)
// Los nombres de fontFamily deben coincidir con las claves cargadas por useFonts() en App.tsx

export const fonts = {
  displayMedium: 'PlusJakartaSans_500Medium',
  displaySemiBold: 'PlusJakartaSans_600SemiBold',
  displayBold: 'PlusJakartaSans_700Bold',
  bodyRegular: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
} as const;

// Jerarquía (tamaño / lineHeight aproximado) — ver DESIGN.md
export const typeScale = {
  h1: { fontFamily: fonts.displayBold, fontSize: 32, lineHeight: 38 },
  h2: { fontFamily: fonts.displaySemiBold, fontSize: 22, lineHeight: 28 },
  h3: { fontFamily: fonts.displaySemiBold, fontSize: 16, lineHeight: 22 },
  body: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 24 },
  caption: { fontFamily: fonts.bodyRegular, fontSize: 12, lineHeight: 16 },
  button: { fontFamily: fonts.displaySemiBold, fontSize: 15, lineHeight: 20 },
} as const;
