import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { colors, spacing, typeScale } from '../theme';
import { HomeCard } from './HomeCard';

type Props = {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
};

// Los 3 accesos rápidos que aparecen bajo el header en cada Home (Mensajes/
// Pagos/Licencias para apoderado, Nota/Anotación/Comunicado para profesor, etc.)
export function QuickAction({ icon: Icon, label, onPress }: Props) {
  return (
    <Pressable style={styles.flex} onPress={onPress}>
      <HomeCard style={styles.card}>
        <Icon size={18} color={colors.indigo} strokeWidth={2} />
        <Text style={styles.label}>{label}</Text>
      </HomeCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: {
    alignItems: 'center',
    paddingVertical: spacing.sm + 4,
    gap: 6,
  },
  label: {
    ...typeScale.caption,
    fontSize: 11,
    fontWeight: '600',
    color: colors.noche,
  },
});
