import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  House,
  GraduationCap,
  FileText,
  User,
  MessageCircle,
  CreditCard,
  CirclePlus,
  Sparkles,
} from 'lucide-react-native';
import { colors, spacing, typeScale, fonts } from '../../theme';
import { DarkHeader } from '../../components/DarkHeader';
import { HomeCard } from '../../components/HomeCard';
import { QuickAction } from '../../components/QuickAction';
import { BottomNavBar } from '../../components/BottomNavBar';
import { Avatar } from '../../components/Avatar';
import { mockApoderado } from '../../data/mockHome';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function ApoderadoHome({
  navigation,
  onAbrirPerfil,
}: {
  navigation: Nav;
  onAbrirPerfil: () => void;
}) {
  const [hijoId, setHijoId] = useState(mockApoderado.hijos[0].id);
  const hijo = mockApoderado.hijos.find((h) => h.id === hijoId) ?? mockApoderado.hijos[0];

  return (
    <View style={styles.container}>
      <DarkHeader>
        <Text style={styles.hsub}>Hola, {mockApoderado.nombre} 👋</Text>
        <Text style={styles.htitle}>Esto pasó hoy</Text>
        <Text style={styles.streak}>
          🔥 {hijo.nombre.split(' ')[0]} lleva {mockApoderado.rachaDias} días de asistencia
          seguidos
        </Text>

        <View style={styles.pillsRow}>
          {mockApoderado.hijos.map((h) => (
            <Pressable
              key={h.id}
              style={[styles.pill, h.id === hijoId && styles.pillActive]}
              onPress={() => setHijoId(h.id)}
            >
              <Text style={[styles.pillText, h.id === hijoId && styles.pillTextActive]}>
                {h.nombre.split(' ')[0]}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.childCard}>
          <Avatar iniciales={hijo.iniciales} />
          <View style={styles.flex}>
            <Text style={styles.childName}>{hijo.nombre}</Text>
            <Text style={styles.childCurso}>{hijo.curso}</Text>
          </View>
          <View style={styles.alignEnd}>
            <Text style={styles.promedio}>{hijo.promedio}</Text>
            <Text style={styles.promedioLabel}>promedio</Text>
          </View>
        </View>
      </DarkHeader>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.quickRow}>
          <QuickAction icon={MessageCircle} label="Mensajes" onPress={() => navigation.navigate('Mensajes')} />
          <QuickAction icon={CreditCard} label="Pagos" onPress={() => navigation.navigate('Pagos')} />
          <QuickAction icon={CirclePlus} label="Licencias" onPress={() => navigation.navigate('LicenciaMedica')} />
        </View>

        <Text style={styles.sectionLabel}>Notas nuevas</Text>
        <Pressable onPress={() => navigation.navigate('Notas')}>
          <HomeCard style={styles.rowCard}>
            <View>
              <Text style={styles.cardTitle}>{mockApoderado.notaNueva.ramo}</Text>
              <Text style={styles.cardSubtitle}>{mockApoderado.notaNueva.detalle}</Text>
            </View>
            <Text style={styles.notaValor}>{mockApoderado.notaNueva.nota}</Text>
          </HomeCard>
        </Pressable>

        <Text style={styles.sectionLabel}>Hoja de vida</Text>
        <Pressable onPress={() => navigation.navigate('HojaDeVida')}>
          <HomeCard style={styles.hojaCard}>
            <View style={styles.hojaIcon}>
              <Sparkles size={15} color={colors.exito} strokeWidth={2} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{mockApoderado.hojaDeVida.titulo}</Text>
              <Text style={styles.cardSubtitle}>{mockApoderado.hojaDeVida.autor}</Text>
            </View>
          </HomeCard>
        </Pressable>
      </ScrollView>

      <BottomNavBar
        activeKey="inicio"
        items={[
          { key: 'inicio', label: 'Inicio', icon: House },
          { key: 'notas', label: 'Notas', icon: GraduationCap, onPress: () => navigation.navigate('Notas') },
          {
            key: 'hoja',
            label: 'Hoja de vida',
            icon: FileText,
            onPress: () => navigation.navigate('HojaDeVida'),
          },
          { key: 'perfil', label: 'Perfil', icon: User, onPress: onAbrirPerfil },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  flex: { flex: 1 },
  alignEnd: { alignItems: 'flex-end' },
  hsub: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)' },
  htitle: { ...typeScale.h2, color: colors.blanco, marginTop: 2 },
  streak: {
    ...typeScale.caption,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.xs + 2,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: spacing.xs + 2,
    marginTop: spacing.sm + 4,
  },
  pill: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  pillActive: { backgroundColor: colors.indigo },
  pillText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
  pillTextActive: { color: colors.blanco },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: spacing.sm + 6,
    marginTop: spacing.sm + 2,
  },
  childName: { fontSize: 14, fontWeight: '600', color: colors.blanco },
  childCurso: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 1 },
  promedio: { ...typeScale.h3, fontSize: 18, color: colors.blanco },
  promedioLabel: { fontSize: 10, color: 'rgba(255,255,255,0.4)' },
  body: {
    padding: spacing.md + 2,
    gap: spacing.sm + 2,
  },
  quickRow: { flexDirection: 'row', gap: spacing.sm + 2 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5A5A5A',
    marginTop: spacing.xs,
  },
  rowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 13, fontWeight: '600', color: colors.noche },
  cardSubtitle: { fontSize: 12, color: colors.gris400, marginTop: 1 },
  notaValor: { fontFamily: fonts.displayBold, color: colors.indigo, fontSize: 15 },
  hojaCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 2 },
  hojaIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: colors.exitoBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
