import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typeScale, fonts } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { mockAgenda } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Agenda'>;

export function AgendaScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackLink label="Inicio" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Agenda de evaluaciones</Text>
        <Text style={styles.subtitle}>Próximas 2 semanas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionLabel}>Esta semana</Text>
        {mockAgenda.estaSemana.map((ev) => (
          <HomeCard key={ev.titulo} style={styles.card}>
            <View style={styles.fechaBox}>
              <Text style={styles.fechaDia}>{ev.dia}</Text>
              <Text style={styles.fechaNum}>{ev.fecha}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.evTitulo}>{ev.titulo}</Text>
              <Text style={styles.evMeta}>{ev.ramo} · {ev.profesor}</Text>
            </View>
          </HomeCard>
        ))}

        <Text style={[styles.sectionLabel, styles.sectionLabelSeparado]}>Próxima semana</Text>
        {mockAgenda.proximaSemana.map((ev) => (
          <HomeCard key={ev.titulo} style={[styles.card, styles.cardTenue]}>
            <View style={styles.fechaBox}>
              <Text style={styles.fechaDia}>{ev.dia}</Text>
              <Text style={styles.fechaNum}>{ev.fecha}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.evTitulo}>{ev.titulo}</Text>
              <Text style={styles.evMeta}>{ev.ramo} · {ev.profesor}</Text>
            </View>
          </HomeCard>
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
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#5A5A5A' },
  sectionLabelSeparado: { marginTop: spacing.sm },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  cardTenue: { opacity: 0.7 },
  fechaBox: { width: 40, alignItems: 'center' },
  fechaDia: { fontSize: 10, color: colors.gris400 },
  fechaNum: { fontFamily: fonts.displayBold, color: colors.noche, fontSize: 16 },
  evTitulo: { fontSize: 13, fontWeight: '600', color: colors.noche },
  evMeta: { fontSize: 12, color: colors.gris400, marginTop: 1 },
});
