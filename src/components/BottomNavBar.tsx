import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { colors, spacing } from '../theme';

export type NavItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  onPress?: () => void;
};

type Props = {
  items: NavItem[];
  activeKey: string;
};

// Barra inferior de navegación, presente en todas las vistas "Inicio" del
// handoff. Solo el tab activo (Inicio) navega de verdad por ahora; el resto
// son las secciones que se construyen en los próximos pasos.
export function BottomNavBar({ items, activeKey }: Props) {
  return (
    <View style={styles.bar}>
      {items.map((item) => {
        const active = item.key === activeKey;
        const color = active ? colors.indigo : colors.gris400;
        return (
          <Pressable key={item.key} style={styles.item} onPress={item.onPress} hitSlop={6}>
            <item.icon size={20} color={color} strokeWidth={2} />
            <Text style={[styles.label, { color, fontWeight: active ? '600' : '400' }]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm + 6,
    paddingHorizontal: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gris200,
    backgroundColor: colors.blanco,
  },
  item: {
    alignItems: 'center',
    gap: 3,
  },
  label: {
    fontSize: 10,
  },
});
