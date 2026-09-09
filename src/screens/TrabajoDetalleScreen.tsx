import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Upload, CircleCheck } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { mockTrabajos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TrabajoDetalle'>;

export function TrabajoDetalleScreen({ route, navigation }: Props) {
  const { trabajoId } = route.params;
  const trabajo =
    [...mockTrabajos.grupal, ...mockTrabajos.individual].find((t) => t.id === trabajoId) ??
    mockTrabajos.individual[0];
  const { instrucciones, ramo } = trabajo;

  const [enviado, setEnviado] = useState(trabajo.entregado);

  const onEnviar = () => {
    setEnviado(true);
    Alert.alert('Trabajo enviado', `${trabajo.titulo} — tu profesor lo revisará pronto.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackLink label="Mis trabajos" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>{trabajo.titulo}</Text>
        <Text style={styles.subtitle}>{ramo ? `${ramo} · ` : ''}{trabajo.meta}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {instrucciones && (
          <HomeCard>
            <Text style={styles.instrucciones}>{instrucciones}</Text>
          </HomeCard>
        )}

        {enviado ? (
          <HomeCard style={styles.enviadoCard}>
            <CircleCheck size={20} color={colors.exito} strokeWidth={2} />
            <Text style={styles.enviadoText}>Trabajo enviado</Text>
          </HomeCard>
        ) : (
          <Pressable style={styles.uploadBox} onPress={onEnviar}>
            <Upload size={20} color={colors.indigo} strokeWidth={2} />
            <Text style={styles.uploadText}>Subir mi respuesta</Text>
            <Text style={styles.uploadSubtext}>foto o PDF de tu cuaderno</Text>
          </Pressable>
        )}
      </ScrollView>

      {!enviado && (
        <View style={styles.footer}>
          <Pressable style={styles.primaryButton} onPress={onEnviar}>
            <Text style={styles.primaryButtonText}>Enviar trabajo</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  header: { backgroundColor: colors.noche, paddingTop: 56, paddingBottom: 16, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.md },
  instrucciones: { fontSize: 13, color: colors.noche, lineHeight: 21 },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    borderRadius: radii.lg,
    paddingVertical: 24,
    alignItems: 'center',
    backgroundColor: colors.niebla,
    gap: 4,
  },
  uploadText: { fontSize: 13, fontWeight: '600', color: colors.indigo, marginTop: 4 },
  uploadSubtext: { fontSize: 11, color: colors.gris400 },
  enviadoCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.exitoBg, borderColor: '#A8DDB8' },
  enviadoText: { fontSize: 13, fontWeight: '600', color: colors.exito },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
