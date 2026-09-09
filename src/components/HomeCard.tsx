import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, radii, spacing } from '../theme';

// Reproduce la clase .card del handoff: tarjeta blanca, borde suave,
// sombra ligera — jerarquía sin depender de sombras pesadas (ver DESIGN.md).
export function HomeCard({ style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.blanco,
    borderWidth: 1,
    borderColor: colors.gris200,
    borderRadius: radii.lg,
    padding: spacing.sm + 6,
    shadowColor: colors.noche,
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
});
