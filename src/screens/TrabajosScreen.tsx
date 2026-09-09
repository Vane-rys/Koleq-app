import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Check, Clock, Briefcase, House, GraduationCap, MessageCircle, User } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { DarkHeader } from '../components/DarkHeader';
import { HomeCard } from '../components/HomeCard';
import { BottomNavBar } from '../components/BottomNavBar';
import { mockTrabajos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Trabajos'>;

const pendiente = mockTrabajos.individual.find((t) => !t.entregado);

export function TrabajosScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <DarkHeader>
        <Text style={styles.title}>Mis trabajos</Text>
        <Text style={styles.subtitle}>6° Básico B</Text>
      </DarkHeader>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionLabel}>Grupal</Text>
        {mockTrabajos.grupal.map((t) => (
          <HomeCard key={t.id} style={styles.rowCard}>
            <View style={[styles.iconBox, { backgroundColor: colors.niebla }]}>
              <Briefcase size={16} color={colors.indigo} strokeWidth={2} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.trabajoTitulo}>{t.titulo}</Text>
              <Text style={styles.trabajoMeta}>{t.meta}</Text>
            </View>
            {t.entregado && <Check size={16} color={colors.exito} strokeWidth={2} />}
          </HomeCard>
        ))}

        <Text style={[styles.sectionLabel, styles.sectionLabelSeparado]}>Individual</Text>
        {mockTrabajos.individual.map((t) => (
          <Pressable key={t.id} onPress={() => navigation.navigate('TrabajoDetalle', { trabajoId: t.id })}>
            <HomeCard style={styles.rowCard}>
              <View style={[styles.iconBox, { backgroundColor: t.entregado ? colors.niebla : colors.advertenciaBg }]}>
                {t.entregado ? (
                  <Check size={16} color={colors.exito} strokeWidth={2} />
                ) : (
                  <Clock size={16} color={colors.advertencia} strokeWidth={2} />
                )}
              </View>
              <View style={styles.flex}>
                <Text style={styles.trabajoTitulo}>{t.titulo}</Text>
                <Text style={styles.trabajoMeta}>{t.meta}</Text>
              </View>
            </HomeCard>
          </Pressable>
        ))}
      </ScrollView>

      {pendiente && (
        <View style={styles.footer}>
          <Pressable
            style={styles.outlineButton}
            onPress={() => navigation.navigate('TrabajoDetalle', { trabajoId: pendiente.id })}
          >
            <Text style={styles.outlineButtonText}>Ver detalle · {pendiente.titulo}</Text>
          </Pressable>
        </View>
      )}

      <BottomNavBar
        activeKey="trabajos"
        items={[
          { key: 'inicio', label: 'Inicio', icon: House, onPress: () => navigation.goBack() },
          { key: 'notas', label: 'Notas', icon: GraduationCap, onPress: () => navigation.navigate('NotasEstudiante') },
          { key: 'trabajos', label: 'Trabajos', icon: Briefcase },
          {
            key: 'mensajes',
            label: 'Mensajes',
            icon: MessageCircle,
            onPress: () => navigation.navigate('MensajesEstudiante'),
          },
          { key: 'perfil', label: 'Perfil', icon: User, onPress: () => navigation.navigate('Perfil', { rol: 'estudiante' }) },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  flex: { flex: 1 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2 },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#5A5A5A' },
  sectionLabelSeparado: { marginTop: spacing.sm },
  rowCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  iconBox: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  trabajoTitulo: { fontSize: 13, fontWeight: '600', color: colors.noche },
  trabajoMeta: { fontSize: 12, color: colors.gris400, marginTop: 1 },
  footer: { paddingHorizontal: spacing.md + 2, paddingBottom: spacing.sm },
  outlineButton: { borderWidth: 1.5, borderColor: colors.gris200, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  outlineButtonText: { ...typeScale.button, color: colors.noche },
});
