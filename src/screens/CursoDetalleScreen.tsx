import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Search, ClipboardCheck, Sparkles, ClipboardList, ChevronRight } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { Avatar } from '../components/Avatar';
import { mockAlumnos, mockCursos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CursoDetalle'>;

export function CursoDetalleScreen({ route, navigation }: Props) {
  const { cursoId } = route.params;
  const curso = mockCursos.find((c) => c.id === cursoId) ?? mockCursos[0];
  const [busqueda, setBusqueda] = useState('');

  const alumnos = useMemo(
    () =>
      mockAlumnos
        .filter((a) => a.cursoId === cursoId)
        .filter((a) => a.nombre.toLowerCase().includes(busqueda.toLowerCase())),
    [cursoId, busqueda]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackLink label="Cursos" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>{curso.nombre}</Text>
        <Text style={styles.subtitle}>{curso.estudiantes} estudiantes · toca uno para registrar</Text>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Search size={16} color={colors.gris400} strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar estudiante"
            placeholderTextColor={colors.gris400}
          />
        </View>
        <Pressable style={styles.listaButton} onPress={() => navigation.navigate('PasarLista', { cursoId })}>
          <ClipboardCheck size={16} color={colors.blanco} strokeWidth={2} />
          <Text style={styles.listaButtonText}>Pasar lista</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {alumnos.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => navigation.navigate('FichaAlumno', { alumnoId: a.id, tabInicial: 'nota' })}
          >
            <HomeCard style={styles.alumnoCard}>
              <Avatar iniciales={a.iniciales} bg={colors.cielo} color={colors.indigo} size={36} />
              <Text style={styles.alumnoNombre}>{a.nombre}</Text>
              <ChevronRight size={16} color={colors.gris400} strokeWidth={2} />
            </HomeCard>
          </Pressable>
        ))}

        <Pressable
          style={styles.tareaCard}
          onPress={() => navigation.navigate('NuevaTarea', { cursoId })}
        >
          <ClipboardList size={16} color={colors.noche} strokeWidth={2} />
          <Text style={styles.tareaText}>Nueva tarea grupal</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.anotacionButton}
          onPress={() => navigation.navigate('NuevaAnotacion', { modo: 'curso', cursoId })}
        >
          <Sparkles size={16} color={colors.noche} strokeWidth={2} />
          <Text style={styles.anotacionButtonText}>Anotación para todo el curso</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  header: { backgroundColor: colors.noche, paddingTop: 56, paddingBottom: 16, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  searchRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md, paddingBottom: spacing.sm },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.niebla,
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 14, color: colors.noche },
  listaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.indigo,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  listaButtonText: { color: colors.blanco, fontSize: 13, fontWeight: '600' },
  body: { paddingHorizontal: spacing.md + 2, paddingTop: spacing.xs, gap: spacing.xs + 4 },
  alumnoCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, paddingVertical: 11, paddingHorizontal: 14 },
  alumnoNombre: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.noche },
  tareaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing.sm,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: colors.gris200,
    borderRadius: radii.lg,
  },
  tareaText: { fontSize: 13, fontWeight: '600', color: colors.noche },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  anotacionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.gris200,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
  },
  anotacionButtonText: { ...typeScale.button, color: colors.noche },
});
