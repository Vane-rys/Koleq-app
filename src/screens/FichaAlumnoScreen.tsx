import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Award, Star, History, Sparkles, CircleAlert } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale, fonts } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { LightField } from '../components/LightField';
import { Avatar } from '../components/Avatar';
import { mockAlumnos, mockAnotacionesAlumno, mockCursos, mockMedallas } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FichaAlumno'>;
type Tab = 'nota' | 'anotacion' | 'medalla';

const MEDALLA_ICONO = { 'buena-onda': Award, 'top-esfuerzo': Star, constancia: History } as const;

export function FichaAlumnoScreen({ route, navigation }: Props) {
  const { alumnoId, tabInicial } = route.params;
  const alumno = mockAlumnos.find((a) => a.id === alumnoId) ?? mockAlumnos[0];
  const curso = mockCursos.find((c) => c.id === alumno.cursoId);
  const [tab, setTab] = useState<Tab>(tabInicial ?? 'nota');

  // --- Nota ---
  const [evaluacion, setEvaluacion] = useState('Prueba fracciones');
  const [nota, setNota] = useState('6.4');
  const [comentarioNota, setComentarioNota] = useState('');

  // --- Medalla ---
  const [medalla, setMedalla] = useState(mockMedallas[0].key);
  const [motivoMedalla, setMotivoMedalla] = useState('');

  const onGuardarNota = () => {
    Alert.alert('Nota guardada', `${evaluacion} · ${nota}`);
    navigation.goBack();
  };

  const onOtorgarMedalla = () => {
    if (!motivoMedalla.trim()) return;
    const label = mockMedallas.find((m) => m.key === medalla)?.label;
    Alert.alert('Medalla otorgada', `${label} para ${alumno.nombre}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackLink label={curso?.nombre ?? 'Curso'} onPress={() => navigation.goBack()} light={false} />
        <View style={styles.alumnoRow}>
          <Avatar iniciales={alumno.iniciales} bg={colors.violeta} size={36} />
          <Text style={styles.alumnoNombre}>{alumno.nombre}</Text>
        </View>
        <View style={styles.tabsRow}>
          <Pressable style={[styles.tab, tab === 'nota' && styles.tabActive]} onPress={() => setTab('nota')}>
            <Text style={[styles.tabText, tab === 'nota' && styles.tabTextActive]}>Nota</Text>
          </Pressable>
          <Pressable style={[styles.tab, tab === 'anotacion' && styles.tabActive]} onPress={() => setTab('anotacion')}>
            <Text style={[styles.tabText, tab === 'anotacion' && styles.tabTextActive]}>Anotación</Text>
          </Pressable>
          <Pressable style={[styles.tab, tab === 'medalla' && styles.tabActive]} onPress={() => setTab('medalla')}>
            <Text style={[styles.tabText, tab === 'medalla' && styles.tabTextActive]}>Medalla</Text>
          </Pressable>
        </View>
      </View>

      {tab === 'nota' && (
        <>
          <ScrollView contentContainerStyle={styles.body}>
            <LightField label="Evaluación" value={evaluacion} onChangeText={setEvaluacion} />
            <View>
              <Text style={styles.label}>Nota (1.0 – 7.0)</Text>
              <HomeCard style={styles.notaCard}>
                <TextInput
                  style={styles.notaInput}
                  value={nota}
                  onChangeText={(texto) => setNota(texto.replace(',', '.').replace(/[^0-9.]/g, ''))}
                  onBlur={() => {
                    const valor = parseFloat(nota);
                    setNota((Number.isNaN(valor) ? 1 : Math.min(7, Math.max(1, valor))).toFixed(1));
                  }}
                  keyboardType="decimal-pad"
                  maxLength={3}
                  textAlign="center"
                />
              </HomeCard>
              <View style={styles.notaStepperRow}>
                <Pressable
                  style={styles.stepper}
                  onPress={() => setNota((n) => (Math.max(1, parseFloat(n || '1') - 0.1)).toFixed(1))}
                >
                  <Text style={styles.stepperText}>−0.1</Text>
                </Pressable>
                <Pressable
                  style={styles.stepper}
                  onPress={() => setNota((n) => (Math.min(7, parseFloat(n || '1') + 0.1)).toFixed(1))}
                >
                  <Text style={styles.stepperText}>+0.1</Text>
                </Pressable>
              </View>
            </View>
            <LightField
              label="Comentario (opcional)"
              value={comentarioNota}
              onChangeText={setComentarioNota}
              placeholder="Ej: Buen manejo de fracciones equivalentes"
              multiline
              style={styles.comentarioInput}
            />
          </ScrollView>
          <View style={styles.footer}>
            <Pressable style={styles.primaryButton} onPress={onGuardarNota}>
              <Text style={styles.primaryButtonText}>Guardar nota</Text>
            </Pressable>
          </View>
        </>
      )}

      {tab === 'anotacion' && (
        <>
          <ScrollView contentContainerStyle={styles.body}>
            <Text style={styles.sectionLabel}>Historial de anotaciones</Text>
            {mockAnotacionesAlumno.map((a) => {
              const positiva = a.tipo === 'positiva';
              return (
                <HomeCard key={a.id} style={styles.anotacionCard}>
                  <View style={[styles.iconBox, { backgroundColor: positiva ? colors.exitoBg : colors.advertenciaBg }]}>
                    {positiva ? (
                      <Sparkles size={16} color={colors.exito} strokeWidth={2} />
                    ) : (
                      <CircleAlert size={16} color={colors.advertencia} strokeWidth={2} />
                    )}
                  </View>
                  <View style={styles.flex}>
                    <Text style={[styles.tipoLabel, { color: positiva ? colors.exito : colors.advertencia }]}>
                      {positiva ? 'Positiva' : 'Seguimiento'}
                    </Text>
                    <Text style={styles.anotacionTitulo}>{a.titulo}</Text>
                    <Text style={styles.anotacionMeta}>{a.autor} · {a.ramo} · {a.fecha}</Text>
                  </View>
                </HomeCard>
              );
            })}
          </ScrollView>
          <View style={styles.footer}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => navigation.navigate('NuevaAnotacion', { modo: 'alumno', alumnoId })}
            >
              <Text style={styles.primaryButtonText}>Nueva anotación</Text>
            </Pressable>
          </View>
        </>
      )}

      {tab === 'medalla' && (
        <>
          <ScrollView contentContainerStyle={styles.body}>
            <Text style={styles.label}>Elige una medalla</Text>
            <View style={styles.medallasRow}>
              {mockMedallas.map((m) => {
                const Icon = MEDALLA_ICONO[m.key as keyof typeof MEDALLA_ICONO];
                const activa = medalla === m.key;
                return (
                  <Pressable key={m.key} style={styles.flex} onPress={() => setMedalla(m.key)}>
                    <HomeCard style={[styles.medallaCard, activa && styles.medallaCardActiva]}>
                      <View style={[styles.medallaCircle, { backgroundColor: activa ? colors.violeta : colors.niebla }]}>
                        <Icon size={18} color={activa ? colors.blanco : colors.indigo} strokeWidth={2} />
                      </View>
                      <Text style={styles.medallaLabel}>{m.label}</Text>
                    </HomeCard>
                  </Pressable>
                );
              })}
            </View>
            <LightField
              label="Motivo"
              value={motivoMedalla}
              onChangeText={setMotivoMedalla}
              placeholder="Ayudó a una compañera nueva durante toda la semana"
            />
          </ScrollView>
          <View style={styles.footer}>
            <Pressable
              style={[styles.primaryButton, !motivoMedalla.trim() && styles.disabled]}
              disabled={!motivoMedalla.trim()}
              onPress={onOtorgarMedalla}
            >
              <Text style={styles.primaryButtonText}>Otorgar medalla</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  flex: { flex: 1 },
  header: { backgroundColor: colors.noche, paddingTop: 56, paddingBottom: 16, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  alumnoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  alumnoNombre: { ...typeScale.h3, fontSize: 18, color: colors.blanco },
  tabsRow: { flexDirection: 'row', gap: 6, marginTop: spacing.md, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 999, padding: 4 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 7, borderRadius: 999 },
  tabActive: { backgroundColor: colors.indigo },
  tabText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  tabTextActive: { color: colors.blanco },
  body: { padding: spacing.md + 2, gap: spacing.md },
  label: { ...typeScale.caption, color: '#5A5A5A', marginBottom: 6 },
  notaCard: { alignItems: 'center', paddingVertical: 10 },
  notaInput: { fontFamily: fonts.displayBold, fontSize: 20, color: colors.indigo, padding: 0, minWidth: 60 },
  notaStepperRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  stepper: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: radii.md, backgroundColor: colors.niebla },
  stepperText: { fontSize: 12, fontWeight: '600', color: colors.indigo },
  comentarioInput: { textAlignVertical: 'top', minHeight: 70 },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#5A5A5A' },
  anotacionCard: { flexDirection: 'row', gap: spacing.sm + 2 },
  iconBox: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  tipoLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  anotacionTitulo: { fontSize: 14, fontWeight: '600', color: colors.noche, marginTop: 2 },
  anotacionMeta: { fontSize: 12, color: colors.gris400, marginTop: 2 },
  medallasRow: { flexDirection: 'row', gap: spacing.sm },
  medallaCard: { alignItems: 'center', paddingVertical: 14, gap: 8 },
  medallaCardActiva: { borderColor: colors.violeta, backgroundColor: colors.niebla },
  medallaCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  medallaLabel: { fontSize: 11, fontWeight: '600', color: colors.noche, textAlign: 'center' },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  disabled: { opacity: 0.4 },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
