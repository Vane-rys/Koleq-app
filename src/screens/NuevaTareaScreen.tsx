import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Upload } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { LightField } from '../components/LightField';
import { DatePickerField, formatFechaCorta } from '../components/DatePickerField';
import { mockCursos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'NuevaTarea'>;
type TipoTarea = 'grupal' | 'individual';

export function NuevaTareaScreen({ route, navigation }: Props) {
  const { cursoId } = route.params;
  const curso = mockCursos.find((c) => c.id === cursoId) ?? mockCursos[0];

  const [tipo, setTipo] = useState<TipoTarea>('grupal');
  const [titulo, setTitulo] = useState('');
  const [grupoDe, setGrupoDe] = useState('4 estudiantes');
  const [entregaFecha, setEntregaFecha] = useState<Date | null>(null);
  const [instrucciones, setInstrucciones] = useState('');

  const puedeContinuar = titulo.trim().length > 0 && entregaFecha !== null;

  const onContinuar = () => {
    if (!puedeContinuar || !entregaFecha) return;
    const entrega = formatFechaCorta(entregaFecha);
    if (tipo === 'grupal') {
      navigation.navigate('AsignarIntegrantes', { titulo, grupoDe, entrega, cursoId });
    } else {
      Alert.alert('Tarea asignada', `${titulo} · individual · entrega ${entrega}`);
      navigation.navigate('SeguimientoEntregas', { titulo });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <BackLink label={curso.nombre} onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Nueva tarea</Text>
        <View style={styles.tabsRow}>
          <Pressable style={[styles.tab, tipo === 'grupal' && styles.tabActive]} onPress={() => setTipo('grupal')}>
            <Text style={[styles.tabText, tipo === 'grupal' && styles.tabTextActive]}>Grupal</Text>
          </Pressable>
          <Pressable style={[styles.tab, tipo === 'individual' && styles.tabActive]} onPress={() => setTipo('individual')}>
            <Text style={[styles.tabText, tipo === 'individual' && styles.tabTextActive]}>Individual</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <LightField label="Título" value={titulo} onChangeText={setTitulo} placeholder="Maqueta del sistema solar" />
        <View style={styles.row}>
          {tipo === 'grupal' && (
            <View style={styles.flex}>
              <LightField label="Grupos de" value={grupoDe} onChangeText={setGrupoDe} placeholder="4 estudiantes" />
            </View>
          )}
          <View style={styles.flex}>
            <DatePickerField label="Entrega" value={entregaFecha} onChange={setEntregaFecha} />
          </View>
        </View>
        <LightField
          label="Instrucciones"
          value={instrucciones}
          onChangeText={setInstrucciones}
          placeholder="Describe qué debe incluir el trabajo…"
          multiline
          style={styles.instruccionesInput}
        />
        <Pressable style={styles.uploadBox} onPress={() => Alert.alert('Adjuntar', 'Selector de archivos — próximamente.')}>
          <Upload size={16} color={colors.indigo} strokeWidth={2} />
          <Text style={styles.uploadText}>Adjuntar material</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.outlineButton, !puedeContinuar && styles.disabled]} disabled={!puedeContinuar} onPress={onContinuar}>
          <Text style={styles.outlineButtonText}>
            {tipo === 'grupal' ? 'Continuar · asignar integrantes' : 'Asignar tarea'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.blanco },
  header: { backgroundColor: colors.noche, paddingTop: 56, paddingBottom: 16, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  tabsRow: { flexDirection: 'row', gap: 6, marginTop: spacing.md, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 999, padding: 4 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 7, borderRadius: 999 },
  tabActive: { backgroundColor: colors.indigo },
  tabText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  tabTextActive: { color: colors.blanco },
  body: { padding: spacing.md + 2, gap: spacing.md },
  row: { flexDirection: 'row', gap: spacing.sm + 2 },
  instruccionesInput: { textAlignVertical: 'top', minHeight: 100 },
  uploadBox: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 1.5, borderColor: '#C7D2FE', borderStyle: 'dashed', borderRadius: radii.lg,
    paddingVertical: 14, backgroundColor: colors.niebla,
  },
  uploadText: { fontSize: 12, fontWeight: '600', color: colors.indigo },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  outlineButton: { borderWidth: 1.5, borderColor: colors.gris200, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  disabled: { opacity: 0.4 },
  outlineButtonText: { ...typeScale.button, color: colors.noche },
});
