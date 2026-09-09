import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Check, X } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { Avatar } from '../components/Avatar';
import { mockAlumnos, mockCursos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PasarLista'>;
type Estado = 'presente' | 'ausente' | null;

export function PasarListaScreen({ route, navigation }: Props) {
  const { cursoId } = route.params;
  const curso = mockCursos.find((c) => c.id === cursoId) ?? mockCursos[0];
  const alumnos = mockAlumnos.filter((a) => a.cursoId === cursoId);

  const [estados, setEstados] = useState<Record<string, Estado>>(
    Object.fromEntries(alumnos.map((a) => [a.id, 'presente' as Estado]))
  );
  const marcados = Object.values(estados).filter((e) => e !== null).length;

  const onGuardar = () => {
    Alert.alert('Asistencia guardada', `${curso.nombre} · ${marcados}/${alumnos.length} marcados`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackLink label="Cursos" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Pasar lista</Text>
        <Text style={styles.subtitle}>
          {curso.nombre} · hoy · {marcados}/{alumnos.length} marcados
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {alumnos.map((a) => (
          <HomeCard key={a.id} style={styles.rowCard}>
            <Avatar iniciales={a.iniciales} bg={colors.cielo} color={colors.indigo} size={36} />
            <View style={styles.flex}>
              <Text style={styles.alumnoNombre}>{a.nombre}</Text>
              {estados[a.id] === 'ausente' && <Text style={styles.ausenteLabel}>Ausente</Text>}
            </View>
            <View style={styles.togglesRow}>
              <Pressable
                style={[styles.toggle, estados[a.id] === 'presente' && styles.togglePresente]}
                onPress={() => setEstados((prev) => ({ ...prev, [a.id]: 'presente' }))}
              >
                <Check
                  size={15}
                  color={estados[a.id] === 'presente' ? colors.exito : colors.gris400}
                  strokeWidth={2.5}
                />
              </Pressable>
              <Pressable
                style={[styles.toggle, estados[a.id] === 'ausente' && styles.toggleAusente]}
                onPress={() => setEstados((prev) => ({ ...prev, [a.id]: 'ausente' }))}
              >
                <X
                  size={14}
                  color={estados[a.id] === 'ausente' ? colors.error : colors.gris400}
                  strokeWidth={2.5}
                />
              </Pressable>
            </View>
          </HomeCard>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.primaryButton} onPress={onGuardar}>
          <Text style={styles.primaryButtonText}>Guardar asistencia</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  flex: { flex: 1 },
  header: { backgroundColor: colors.noche, paddingTop: 56, paddingBottom: 16, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2 },
  rowCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 2 },
  alumnoNombre: { fontSize: 14, fontWeight: '600', color: colors.noche },
  ausenteLabel: { fontSize: 11, fontWeight: '600', color: colors.error, marginTop: 1 },
  togglesRow: { flexDirection: 'row', gap: 6 },
  toggle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: colors.gris200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglePresente: { backgroundColor: colors.exitoBg, borderColor: '#A8DDB8' },
  toggleAusente: { backgroundColor: colors.errorBg, borderColor: '#FECACA' },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
