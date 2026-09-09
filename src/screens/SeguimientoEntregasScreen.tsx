import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Check, Clock } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { mockGruposTarea } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SeguimientoEntregas'>;

export function SeguimientoEntregasScreen({ route, navigation }: Props) {
  const { titulo } = route.params;
  const entregadas = mockGruposTarea.filter((g) => g.entregado).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackLink label="Cursos" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.subtitle}>{mockGruposTarea.length} grupos · {entregadas} entregas recibidas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {mockGruposTarea.map((g) => (
          <Pressable
            key={g.id}
            disabled={!g.entregado}
            onPress={() => navigation.navigate('EntregaDetalle', { grupoNombre: g.nombre })}
          >
            <HomeCard style={[styles.grupoCard, !g.entregado && styles.grupoCardPendiente]}>
              <View style={[styles.iconBox, { backgroundColor: g.entregado ? colors.exitoBg : colors.niebla }]}>
                {g.entregado ? (
                  <Check size={16} color={colors.exito} strokeWidth={2} />
                ) : (
                  <Clock size={16} color="#5A5A5A" strokeWidth={2} />
                )}
              </View>
              <View style={styles.flex}>
                <Text style={styles.grupoNombre}>{g.nombre}</Text>
                <Text style={styles.grupoIntegrantes}>
                  {g.integrantes.slice(0, 2).join(', ')}
                  {g.integrantes.length > 2 ? ` + ${g.integrantes.length - 2}` : ''} ·{' '}
                  {g.entregado ? 'entregado' : 'pendiente'}
                </Text>
              </View>
            </HomeCard>
          </Pressable>
        ))}
      </ScrollView>
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
  grupoCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  grupoCardPendiente: { opacity: 0.5 },
  iconBox: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  grupoNombre: { fontSize: 13, fontWeight: '600', color: colors.noche },
  grupoIntegrantes: { fontSize: 12, color: colors.gris400, marginTop: 1 },
});
