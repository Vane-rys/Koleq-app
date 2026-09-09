import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, Sparkles, CircleAlert, House, GraduationCap, FileText, User } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { DarkHeader } from '../components/DarkHeader';
import { HomeCard } from '../components/HomeCard';
import { BottomNavBar } from '../components/BottomNavBar';
import { BackLink } from '../components/BackLink';
import { Avatar } from '../components/Avatar';
import { mockApoderado, mockHojaDeVida } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'HojaDeVida'>;

const hijo = mockApoderado.hijos[0];

export function HojaDeVidaScreen({ navigation }: Props) {
  const [seleccionId, setSeleccionId] = useState<string | null>(null);
  const seleccion = mockHojaDeVida.anotaciones.find((a) => a.id === seleccionId);

  if (seleccion) {
    const positiva = seleccion.tipo === 'positiva';
    return (
      <View style={styles.container}>
        <DarkHeader>
          <BackLink label="Hoja de vida" onPress={() => setSeleccionId(null)} />
          <Text style={styles.detalleTitle}>Detalle de anotación</Text>
          <Text style={styles.subtitle}>{hijo.nombre} · {hijo.curso}</Text>
        </DarkHeader>

        <ScrollView contentContainerStyle={styles.detalleBody}>
          <View style={styles.detalleHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: positiva ? colors.exitoBg : colors.advertenciaBg }]}>
              {positiva ? (
                <Sparkles size={22} color={colors.exito} strokeWidth={2} />
              ) : (
                <CircleAlert size={22} color={colors.advertencia} strokeWidth={2} />
              )}
            </View>
            <View style={styles.flex}>
              <Text style={[styles.tipoLabel, { color: positiva ? colors.exito : colors.advertencia }]}>
                {positiva ? 'Positiva' : 'Seguimiento'}
              </Text>
              <Text style={styles.detalleAnotacionTitulo}>{seleccion.titulo}</Text>
            </View>
          </View>

          <HomeCard>
            <Text style={styles.detalleTexto}>{seleccion.detalle}</Text>
          </HomeCard>

          <HomeCard style={styles.autorCard}>
            <Avatar iniciales={seleccion.autorIniciales} bg={colors.cielo} color={colors.indigo} size={36} />
            <View>
              <Text style={styles.autorNombre}>{seleccion.autor}</Text>
              <Text style={styles.autorMeta}>Prof. {seleccion.ramo} · {seleccion.fechaHora}</Text>
            </View>
          </HomeCard>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.outlineButton} onPress={() => setSeleccionId(null)}>
            <Text style={styles.outlineButtonText}>Volver a Hoja de vida</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DarkHeader>
        <BackLink label="Inicio" onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Hoja de vida</Text>
        <Text style={styles.subtitle}>{hijo.nombre} · {hijo.curso}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValor}>{mockHojaDeVida.positivas}</Text>
            <Text style={styles.statLabel}>Positivas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValor}>{mockHojaDeVida.seguimiento}</Text>
            <Text style={styles.statLabel}>Seguimiento</Text>
          </View>
        </View>
      </DarkHeader>

      <ScrollView contentContainerStyle={styles.body}>
        {mockHojaDeVida.anotaciones.map((a) => {
          const positiva = a.tipo === 'positiva';
          return (
            <Pressable key={a.id} onPress={() => setSeleccionId(a.id)}>
              <HomeCard style={styles.rowCard}>
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
                  <Text style={styles.anotacionMeta}>
                    {a.autor} · {a.ramo} · {a.fecha}
                  </Text>
                </View>
                <ChevronRight size={16} color={colors.gris400} strokeWidth={2} />
              </HomeCard>
            </Pressable>
          );
        })}
      </ScrollView>

      <BottomNavBar
        activeKey="hoja"
        items={[
          { key: 'inicio', label: 'Inicio', icon: House, onPress: () => navigation.goBack() },
          {
            key: 'notas',
            label: 'Notas',
            icon: GraduationCap,
            onPress: () => navigation.navigate('Notas'),
          },
          { key: 'hoja', label: 'Hoja de vida', icon: FileText },
          { key: 'perfil', label: 'Perfil', icon: User, onPress: () => navigation.navigate('Perfil', { rol: 'apoderado' }) },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  flex: { flex: 1 },
  title: { ...typeScale.h2, color: colors.blanco, marginTop: spacing.sm },
  detalleTitle: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  statValor: { fontFamily: 'PlusJakartaSans_700Bold', color: colors.blanco, fontSize: 18 },
  statLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2 },
  rowCard: { flexDirection: 'row', gap: spacing.sm + 2, alignItems: 'center' },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipoLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  anotacionTitulo: { fontSize: 14, fontWeight: '600', color: colors.noche, marginTop: 2 },
  anotacionMeta: { fontSize: 12, color: colors.gris400, marginTop: 2 },
  detalleBody: { padding: spacing.md + 2, gap: spacing.sm + 6 },
  detalleHeaderRow: { flexDirection: 'row', gap: spacing.sm + 2, alignItems: 'center' },
  detalleAnotacionTitulo: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: colors.noche,
    fontSize: 16,
    marginTop: 2,
  },
  detalleTexto: { fontSize: 13, color: colors.noche, lineHeight: 21 },
  autorCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  autorNombre: { fontSize: 13, fontWeight: '600', color: colors.noche },
  autorMeta: { fontSize: 12, color: colors.gris400, marginTop: 1 },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: colors.gris200,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  outlineButtonText: { ...typeScale.button, color: colors.noche },
});
