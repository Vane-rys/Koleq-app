import { Pressable, StyleSheet, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, typeScale } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  /** true = texto/ícono claro (para fondos oscuros como .dhead), false = oscuro (fondos blancos) */
  light?: boolean;
};

// El "‹ Volver" que aparece arriba en casi todas las pantallas del handoff (dhead).
export function BackLink({ label, onPress, light = true }: Props) {
  const color = light ? 'rgba(255,255,255,0.6)' : colors.gris400;
  return (
    <Pressable onPress={onPress} style={styles.row} hitSlop={8}>
      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Path d="m12 19-7-7 7-7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  label: {
    ...typeScale.body,
    fontSize: 13,
  },
});
