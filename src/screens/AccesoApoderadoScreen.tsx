import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { KoleqIcon } from '../components/KoleqIcon';
import { BackLink } from '../components/BackLink';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AccesoApoderado'>;

// Solo el apoderado elige entre crear cuenta o iniciar sesión: profesor y
// estudiante no se auto-registran (ver EligeRolScreen), así que esta
// pantalla es exclusiva del rol apoderado.
export function AccesoApoderadoScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <BackLink label="Elige tu rol" onPress={() => navigation.goBack()} />

      <View style={styles.header}>
        <KoleqIcon size={44} />
        <Text style={styles.title}>Como apoderado/a</Text>
        <Text style={styles.subtitle}>¿Ya tienes cuenta en Koleq?</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login', { rol: 'apoderado' })}
        >
          <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
        </Pressable>
        <Pressable style={styles.outlineButton} onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.outlineButtonText}>Crear cuenta</Text>
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
    paddingTop: 64,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  title: {
    ...typeScale.h2,
    color: colors.blanco,
  },
  subtitle: {
    ...typeScale.body,
    color: 'rgba(255,255,255,0.5)',
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
  outlineButton: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  outlineButtonText: {
    ...typeScale.button,
    color: colors.blanco,
  },
});
