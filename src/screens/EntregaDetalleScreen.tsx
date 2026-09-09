import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ImageIcon } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale, fonts } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { LightField } from '../components/LightField';
import { mockGruposTarea } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EntregaDetalle'>;

export function EntregaDetalleScreen({ route, navigation }: Props) {
  const { grupoNombre } = route.params;
  const grupo = mockGruposTarea.find((g) => g.nombre === grupoNombre) ?? mockGruposTarea[0];
  const [nota, setNota] = useState('6.8');
  const [comentario, setComentario] = useState('Excelente trabajo, faltó incluir los anillos de Saturno.');

  const onGuardar = () => {
    Alert.alert('Entrega calificada', `${grupoNombre} · ${nota}`);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <BackLink label="Entregas" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>{grupoNombre} · entrega</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <HomeCard style={styles.archivoCard}>
          <View style={styles.archivoIcon}>
            <ImageIcon size={18} color={colors.indigo} strokeWidth={2} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.archivoNombre} numberOfLines={1}>{grupo.archivo ?? 'archivo.jpg'}</Text>
            <Text style={styles.archivoMeta}>Entregado {grupo.fechaEntrega ?? '—'}</Text>
          </View>
        </HomeCard>

        <View>
          <Text style={styles.label}>Nota</Text>
          <HomeCard style={styles.notaCard}>
            <Text style={styles.notaValor}>{nota}</Text>
          </HomeCard>
        </View>

        <LightField
          label="Comentario para el grupo"
          value={comentario}
          onChangeText={setComentario}
          multiline
          style={styles.comentarioInput}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.primaryButton} onPress={onGuardar}>
          <Text style={styles.primaryButtonText}>Guardar y responder</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.blanco },
  header: { backgroundColor: colors.noche, paddingTop: 56, paddingBottom: 16, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  body: { padding: spacing.md + 2, gap: spacing.md },
  archivoCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 2 },
  archivoIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.cielo, alignItems: 'center', justifyContent: 'center' },
  archivoNombre: { fontSize: 13, fontWeight: '600', color: colors.noche },
  archivoMeta: { fontSize: 11, color: colors.gris400 },
  label: { ...typeScale.caption, color: '#5A5A5A', marginBottom: 6 },
  notaCard: { alignItems: 'center', paddingVertical: 10 },
  notaValor: { fontFamily: fonts.displayBold, fontSize: 20, color: colors.indigo },
  comentarioInput: { textAlignVertical: 'top', minHeight: 70 },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
