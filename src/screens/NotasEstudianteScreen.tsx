import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { GraduationCap, House, Briefcase, MessageCircle, User, ChevronDown, FileText } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typeScale, fonts } from '../theme';
import { DarkHeader } from '../components/DarkHeader';
import { HomeCard } from '../components/HomeCard';
import { BottomNavBar } from '../components/BottomNavBar';
import { mockNotas } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'NotasEstudiante'>;
type TabKey = 'sem1' | 'sem2' | 'final';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'sem1', label: 'Sem. 1' },
  { key: 'sem2', label: 'Sem. 2' },
  { key: 'final', label: 'Final' },
];

export function NotasEstudianteScreen({ navigation }: Props) {
  // El primer semestre es el que ya tiene notas (el segundo recién empieza),
  // así que parte abierto en "Sem. 1".
  const [tab, setTab] = useState<TabKey>('sem1');
  const [abierta, setAbierta] = useState<string | null>(null);
  const semestre = mockNotas[tab];

  const onCambiarTab = (t: TabKey) => {
    setTab(t);
    setAbierta(null);
  };

  return (
    <View style={styles.container}>
      <DarkHeader>
        <Text style={styles.title}>Mis notas</Text>
        <Text style={styles.subtitle}>6° Básico B</Text>

        <View style={styles.tabsRow}>
          {TABS.map((t) => (
            <Pressable key={t.key} style={[styles.tab, tab === t.key && styles.tabActive]} onPress={() => onCambiarTab(t.key)}>
              <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.promedioCard}>
          <Text style={styles.promedioLabel}>Promedio {tab === 'final' ? 'final' : 'parcial'}</Text>
          <Text style={styles.promedioValor}>{semestre.promedio ?? '-'}</Text>
        </View>
      </DarkHeader>

      {semestre.materias.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <FileText size={26} color={colors.indigo} strokeWidth={2} />
          </View>
          <Text style={styles.emptyTitle}>Aún no hay notas registradas</Text>
          <Text style={styles.emptyText}>Cuando tus profesores registren la primera evaluación, aparecerá aquí.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.body}>
          {semestre.materias.map((m) => {
            const expandida = abierta === m.nombre;
            return (
              <HomeCard key={m.nombre} style={styles.expandedCard}>
                <Pressable
                  style={styles.expandedHeader}
                  onPress={() => setAbierta(expandida ? null : m.nombre)}
                >
                  <View>
                    <Text style={styles.materiaNombre}>{m.nombre}</Text>
                    <Text style={styles.materiaProfe}>{m.profesor} · {m.evaluaciones} evaluaciones</Text>
                  </View>
                  <View style={styles.rowCenter}>
                    <Text style={styles.notaValor}>{m.nota}</Text>
                    <ChevronDown
                      size={16}
                      color={colors.gris400}
                      strokeWidth={2}
                      style={expandida && styles.chevronUp}
                    />
                  </View>
                </Pressable>
                {expandida &&
                  m.detalle?.map((d) => (
                    <View key={d.label} style={styles.detalleRow}>
                      <Text style={styles.detalleLabel}>{d.label}</Text>
                      <Text style={styles.detalleNota}>{d.nota}</Text>
                    </View>
                  ))}
              </HomeCard>
            );
          })}
        </ScrollView>
      )}

      <BottomNavBar
        activeKey="notas"
        items={[
          { key: 'inicio', label: 'Inicio', icon: House, onPress: () => navigation.goBack() },
          { key: 'notas', label: 'Notas', icon: GraduationCap },
          { key: 'trabajos', label: 'Trabajos', icon: Briefcase, onPress: () => navigation.navigate('Trabajos') },
          { key: 'mensajes', label: 'Mensajes', icon: MessageCircle, onPress: () => navigation.navigate('MensajesEstudiante') },
          { key: 'perfil', label: 'Perfil', icon: User, onPress: () => navigation.navigate('Perfil', { rol: 'estudiante' }) },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  title: { ...typeScale.h2, color: colors.blanco },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  tabsRow: { flexDirection: 'row', gap: 6, marginTop: spacing.md, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 999, padding: 4 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 7, borderRadius: 999 },
  tabActive: { backgroundColor: colors.indigo },
  tabText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  tabTextActive: { color: colors.blanco },
  promedioCard: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: spacing.sm + 6, marginTop: spacing.sm + 4 },
  promedioLabel: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  promedioValor: { fontFamily: fonts.displayBold, color: colors.blanco, fontSize: 24, marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2 },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  materiaNombre: { fontSize: 14, fontWeight: '600', color: colors.noche },
  materiaProfe: { fontSize: 12, color: colors.gris400, marginTop: 1 },
  notaValor: { fontFamily: fonts.displayBold, color: colors.indigo, fontSize: 16 },
  chevronUp: { transform: [{ rotate: '180deg' }] },
  expandedCard: { padding: 0, overflow: 'hidden', gap: 0 },
  expandedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm + 6,
  },
  detalleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.gris200,
    paddingVertical: 10,
    paddingHorizontal: spacing.sm + 6,
  },
  detalleLabel: { fontSize: 12, color: '#5A5A5A' },
  detalleNota: { fontSize: 12, fontWeight: '600', color: colors.noche },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, gap: 4 },
  emptyIcon: { width: 56, height: 56, borderRadius: 16, backgroundColor: colors.niebla, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  emptyTitle: { fontSize: 15, fontWeight: '600', color: colors.noche },
  emptyText: { fontSize: 13, color: colors.gris400, textAlign: 'center', maxWidth: 220 },
});
