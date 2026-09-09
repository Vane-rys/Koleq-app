import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, spacing } from '../theme';

// Reproduce la clase .dhead del handoff: cabecera oscura con esquinas
// inferiores redondeadas, presente en (casi) toda pantalla de Koleq.
export function DarkHeader({ style, ...props }: ViewProps) {
  return <View style={[styles.header, style]} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.noche,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingTop: 64,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
});
