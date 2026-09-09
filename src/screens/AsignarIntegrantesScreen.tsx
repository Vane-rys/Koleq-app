import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { PickerModal } from '../components/PickerModal';
import { mockAlumnos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AsignarIntegrantes'>;

type Grupo = { id: string; nombre: string; integranteIds: string[] };

const GRUPOS_INICIALES: Grupo[] = [
  { id: 'g1', nombre: 'Grupo 1', integranteIds: ['al1', 'al2'] }, // Emilia Reyes, Joaquín Pizarro
  { id: 'g2', nombre: 'Grupo 2', integranteIds: ['al3'] }, // Martina Soto
];

export function AsignarIntegrantesScreen({ route, navigation }: Props) {
  const { titulo, grupoDe, entrega, cursoId } = route.params;
  const [grupos, setGrupos] = useState(GRUPOS_INICIALES);
  const [grupoEnEdicion, setGrupoEnEdicion] = useState<string | null>(null);

  // Alumnos del curso de la tarea; si no hay coincidencia (mock acotado),
  // se usa el listado completo para no dejar el picker vacío.
  const alumnosDelCurso = mockAlumnos.filter((a) => a.cursoId === cursoId);
  const alumnosBase = alumnosDelCurso.length > 0 ? alumnosDelCurso : mockAlumnos;

  const alumnoPorId = (id: string) => mockAlumnos.find((a) => a.id === id);
  const grupoDeAlumno = (id: string) => grupos.find((g) => g.integranteIds.includes(id));

  const onAgregarGrupo = () => {
    setGrupos((prev) => [...prev, { id: `g${prev.length + 1}`, nombre: `Grupo ${prev.length + 1}`, integranteIds: [] }]);
  };

  const onQuitarIntegrante = (grupoId: string, alumnoId: string) => {
    setGrupos((prev) =>
      prev.map((g) => (g.id === grupoId ? { ...g, integranteIds: g.integranteIds.filter((id) => id !== alumnoId) } : g))
    );
  };

  const onConfirmarIntegrantes = (grupoId: string, ids: string[]) => {
    setGrupos((prev) => prev.map((g) => (g.id === grupoId ? { ...g, integranteIds: ids } : g)));
  };

  const onAsignar = () => {
    Alert.alert('Tarea asignada', `${titulo} · ${grupos.length} grupos · entrega ${entrega}`);
    navigation.navigate('SeguimientoEntregas', { titulo });
  };

  const grupoActivo = grupos.find((g) => g.id === grupoEnEdicion);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackLink label="Nueva tarea" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Asignar integrantes</Text>
        <Text style={styles.subtitle}>{titulo} · {grupos.length} grupos de {grupoDe}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {grupos.map((g) => (
          <HomeCard key={g.id} style={styles.grupoCard}>
            <View style={styles.grupoHeader}>
              <Text style={styles.grupoNombre}>{g.nombre}</Text>
              <Pressable hitSlop={8} onPress={() => setGrupoEnEdicion(g.id)}>
                <Plus size={16} color={colors.indigo} strokeWidth={2} />
              </Pressable>
            </View>
            <View style={styles.chipsRow}>
              {g.integranteIds.map((id) => {
                const alumno = alumnoPorId(id);
                if (!alumno) return null;
                return (
                  <Pressable key={id} style={styles.chip} onPress={() => onQuitarIntegrante(g.id, id)}>
                    <Text style={styles.chipText}>{alumno.nombre}</Text>
                    <X size={12} color={colors.indigo} strokeWidth={2.5} />
                  </Pressable>
                );
              })}
              <Pressable style={styles.chipAgregar} onPress={() => setGrupoEnEdicion(g.id)}>
                <Text style={styles.chipAgregarText}>+ agregar</Text>
              </Pressable>
            </View>
          </HomeCard>
        ))}

        <Pressable style={styles.agregarGrupoCard} onPress={onAgregarGrupo}>
          <Plus size={14} color={colors.indigo} strokeWidth={2} />
          <Text style={styles.agregarGrupoText}>Agregar grupo</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.primaryButton} onPress={onAsignar}>
          <Text style={styles.primaryButtonText}>Asignar tarea</Text>
        </Pressable>
      </View>

      <PickerModal
        visible={grupoEnEdicion !== null}
        title={grupoActivo ? `Integrantes · ${grupoActivo.nombre}` : 'Integrantes'}
        multiple
        confirmLabel="Listo"
        searchPlaceholder="Buscar alumno…"
        items={alumnosBase.map((a) => {
          const otroGrupo = grupoActivo && !grupoActivo.integranteIds.includes(a.id) ? grupoDeAlumno(a.id) : undefined;
          return {
            id: a.id,
            nombre: a.nombre,
            iniciales: a.iniciales,
            disabledLabel: otroGrupo ? `Ya está en ${otroGrupo.nombre}` : undefined,
          };
        })}
        selectedIds={grupoActivo?.integranteIds ?? []}
        onClose={() => setGrupoEnEdicion(null)}
        onConfirm={(ids) => grupoEnEdicion && onConfirmarIntegrantes(grupoEnEdicion, ids)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  header: { backgroundColor: colors.noche, paddingTop: 56, paddingBottom: 16, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.xs + 4 },
  grupoCard: { padding: 0, overflow: 'hidden' },
  grupoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.sm + 6, backgroundColor: colors.niebla },
  grupoNombre: { fontSize: 13, fontWeight: '600', color: colors.noche },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, padding: spacing.sm + 6 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.cielo, borderRadius: 999, paddingVertical: 5, paddingHorizontal: 10 },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.indigo },
  chipAgregar: { backgroundColor: colors.niebla, borderRadius: 999, paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, borderColor: '#C7D2FE', borderStyle: 'dashed' },
  chipAgregarText: { fontSize: 12, fontWeight: '600', color: colors.gris400 },
  agregarGrupoCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.gris200 },
  agregarGrupoText: { fontSize: 13, fontWeight: '600', color: colors.indigo },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
