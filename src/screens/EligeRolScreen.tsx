import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { KoleqIcon } from '../components/KoleqIcon';
import { BackLink } from '../components/BackLink';
import type { RootStackParamList, Rol } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EligeRol'>;

const ROLES: { rol: Rol; label: string; desc: string }[] = [
  { rol: 'apoderado', label: 'Soy apoderado/a', desc: 'Sigo la vida escolar de mi hijo/a' },
  { rol: 'profesor', label: 'Soy profesor/a', desc: 'Registro notas, asistencia y anotaciones' },
  { rol: 'estudiante', label: 'Soy estudiante', desc: 'Reviso mis notas, tareas y agenda' },
];

export function EligeRolScreen({ navigation }: Props) {
  // Solo el apoderado se auto-registra: profesor y estudiante reciben su
  // cuenta del colegio, así que van directo a iniciar sesión.
  const onSelectRol = (rol: Rol) => {
    if (rol === 'apoderado') {
      navigation.navigate('AccesoApoderado');
    } else {
      navigation.navigate('Login', { rol });
    }
  };

  return (
    <View style={styles.container}>
      <BackLink label="Inicio" onPress={() => navigation.goBack()} />

      <View style={styles.header}>
        <KoleqIcon size={40} />
        <Text style={styles.title}>¿Con qué cuenta entras?</Text>
        <Text style={styles.subtitle}>Elige tu rol para continuar</Text>
      </View>

      <View style={styles.options}>
        {ROLES.map((r) => (
          <Pressable
            key={r.rol}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => onSelectRol(r.rol)}
          >
            <View>
              <Text style={styles.cardLabel}>{r.label}</Text>
              <Text style={styles.cardDesc}>{r.desc}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.noche,
    paddingTop: 64,
    paddingHorizontal: spacing.lg,
    gap: spacing.xl,
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  title: {
    ...typeScale.h2,
    color: colors.blanco,
    textAlign: 'center',
  },
  subtitle: {
    ...typeScale.body,
    color: 'rgba(255,255,255,0.5)',
  },
  options: {
    gap: spacing.sm,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  cardPressed: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderColor: colors.violeta,
  },
  cardLabel: {
    ...typeScale.h3,
    color: colors.blanco,
  },
  cardDesc: {
    ...typeScale.caption,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 4,
  },
});
