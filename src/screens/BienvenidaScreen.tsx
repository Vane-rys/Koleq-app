import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { KoleqIcon } from '../components/KoleqIcon';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Bienvenida'>;

// Portada de la app: solo marca + 1 CTA. La bifurcación real
// (crear cuenta vs. iniciar sesión) depende del rol, así que se
// decide después de elegirlo en EligeRolScreen.
export function BienvenidaScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <KoleqIcon size={52} />
        <Text style={styles.title}>
          Todo tu colegio,{'\n'}en un solo lugar.
        </Text>
        <Text style={styles.subtitle}>
          Notas, mensajes, pagos y licencias en una sola app.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('EligeRol')}>
          <Text style={styles.primaryButtonText}>Comenzar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.noche,
    justifyContent: 'space-between',
    paddingTop: 96,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  content: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  title: {
    ...typeScale.h1,
    color: colors.blanco,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    ...typeScale.body,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
  actions: {
    gap: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.indigo,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typeScale.button,
    color: colors.blanco,
  },
});
