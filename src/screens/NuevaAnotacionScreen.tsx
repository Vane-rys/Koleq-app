import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { LightField } from '../components/LightField';
import { mockAlumnos, mockCursos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'NuevaAnotacion'>;
type Alcance = 'curso' | 'alumno';
type Tipo = 'positiva' | 'seguimiento';

export function NuevaAnotacionScreen({ route, navigation }: Props) {
  const { modo, cursoId, alumnoId } = route.params;
  const [alcance, setAlcance] = useState<Alcance>(modo);
  const [tipo, setTipo] = useState<Tipo>('positiva');
  const [descripcion, setDescripcion] = useState('');

  const curso = mockCursos.find((c) => c.id === cursoId) ?? mockCursos[0];
  const alumno = mockAlumnos.find((a) => a.id === alumnoId);

  const onPublicar = () => {
    if (!descripcion.trim()) return;
    Alert.alert(
      'Anotación publicada',
      alcance === 'curso' ? `Para todo ${curso.nombre}` : `Para ${alumno?.nombre ?? 'el alumno'}`
    );
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <BackLink label={curso.nombre} onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Nueva anotación</Text>
        <View style={styles.tabsRow}>
          <Pressable style={[styles.tab, alcance === 'curso' && styles.tabActive]} onPress={() => setAlcance('curso')}>
            <Text style={[styles.tabText, alcance === 'curso' && styles.tabTextActive]}>Todo el curso</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, alcance === 'alumno' && styles.tabActive]}
            onPress={() => setAlcance('alumno')}
          >
            <Text style={[styles.tabText, alcance === 'alumno' && styles.tabTextActive]}>Alumno específico</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.label}>Tipo</Text>
          <View style={styles.tipoRow}>
            <Pressable style={styles.flex} onPress={() => setTipo('positiva')}>
              <HomeCard style={[styles.tipoCard, tipo === 'positiva' && styles.tipoCardPositiva]}>
                <Text style={[styles.tipoText, tipo === 'positiva' && { color: colors.exito }]}>Positiva</Text>
              </HomeCard>
            </Pressable>
            <Pressable style={styles.flex} onPress={() => setTipo('seguimiento')}>
              <HomeCard style={[styles.tipoCard, tipo === 'seguimiento' && styles.tipoCardSeguimiento]}>
                <Text style={[styles.tipoText, tipo === 'seguimiento' && { color: colors.advertencia }]}>
                  Seguimiento
                </Text>
              </HomeCard>
            </Pressable>
          </View>
        </View>

        <LightField
          label="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder={
            alcance === 'curso'
              ? 'Ej: El curso mostró excelente colaboración durante la salida a terreno.'
              : 'Ej: Ayudó a un compañero con la tarea de matemática.'
          }
          multiline
          style={styles.descripcionInput}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.primaryButton, !descripcion.trim() && styles.disabled]} disabled={!descripcion.trim()} onPress={onPublicar}>
          <Text style={styles.primaryButtonText}>Publicar anotación</Text>
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
  label: { ...typeScale.caption, color: '#5A5A5A', marginBottom: 6 },
  tipoRow: { flexDirection: 'row', gap: spacing.sm },
  tipoCard: { alignItems: 'center', paddingVertical: 10 },
  tipoCardPositiva: { borderColor: '#A8DDB8', backgroundColor: colors.exitoBg },
  tipoCardSeguimiento: { borderColor: '#FDE68A', backgroundColor: colors.advertenciaBg },
  tipoText: { fontSize: 13, fontWeight: '600', color: '#5A5A5A' },
  descripcionInput: { textAlignVertical: 'top', minHeight: 110 },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  disabled: { opacity: 0.4 },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
