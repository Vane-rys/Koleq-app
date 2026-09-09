import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CreditCard, Check, Plus } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { LightField } from '../components/LightField';
import { mockPagos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PagoTarjeta'>;

// Tarjetas guardadas de ejemplo — con backend real vendrán del método de
// pago que el apoderado haya registrado antes en su cuenta.
const TARJETAS_GUARDADAS = [
  { id: 't1', marca: 'Visa', ultimos4: '4242' },
  { id: 't2', marca: 'Mastercard', ultimos4: '8810' },
];
const OTRA = 'otra';

export function PagoTarjetaScreen({ navigation }: Props) {
  const [seleccion, setSeleccion] = useState<string>(TARJETAS_GUARDADAS[0].id);
  const [numero, setNumero] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');

  const usaOtraTarjeta = seleccion === OTRA;
  const puedePagar = usaOtraTarjeta
    ? numero.trim().length > 0 && vencimiento.trim().length > 0 && cvv.trim().length > 0
    : true;

  const onPagar = () => {
    if (!puedePagar) return;
    Alert.alert('Pago realizado', 'Tu mensualidad quedó pagada con la tarjeta seleccionada.');
    navigation.navigate('Pagos', { estado: 'pagado' });
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <BackLink label="Confirmar pago" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Pagar con tarjeta</Text>
        <Text style={styles.subtitle}>
          {mockPagos.pendiente.titulo} · {mockPagos.pendiente.monto}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionLabel}>Elige una tarjeta</Text>

        {TARJETAS_GUARDADAS.map((t) => {
          const activa = seleccion === t.id;
          return (
            <Pressable key={t.id} onPress={() => setSeleccion(t.id)}>
              <HomeCard style={[styles.tarjetaCard, activa && styles.tarjetaCardActiva]}>
                <CreditCard size={18} color={activa ? colors.indigo : colors.gris400} strokeWidth={2} />
                <Text style={styles.tarjetaLabel}>{t.marca} terminada en {t.ultimos4}</Text>
                {activa && <Check size={16} color={colors.indigo} strokeWidth={2.5} />}
              </HomeCard>
            </Pressable>
          );
        })}

        <Pressable onPress={() => setSeleccion(OTRA)}>
          <HomeCard style={[styles.tarjetaCard, usaOtraTarjeta && styles.tarjetaCardActiva]}>
            <Plus size={18} color={usaOtraTarjeta ? colors.indigo : colors.gris400} strokeWidth={2} />
            <Text style={styles.tarjetaLabel}>Usar otra tarjeta</Text>
            {usaOtraTarjeta && <Check size={16} color={colors.indigo} strokeWidth={2.5} />}
          </HomeCard>
        </Pressable>

        {usaOtraTarjeta && (
          <View style={styles.otraTarjetaForm}>
            <LightField label="Número de tarjeta" value={numero} onChangeText={setNumero} placeholder="0000 0000 0000 0000" />
            <View style={styles.row}>
              <View style={styles.flex1}>
                <LightField label="Vencimiento" value={vencimiento} onChangeText={setVencimiento} placeholder="MM/AA" />
              </View>
              <View style={styles.flex1}>
                <LightField label="CVV" value={cvv} onChangeText={setCvv} placeholder="123" />
              </View>
            </View>
          </View>
        )}

        <HomeCard style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total a pagar</Text>
          <Text style={styles.totalValor}>{mockPagos.pendiente.monto}</Text>
        </HomeCard>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.primaryButton, !puedePagar && styles.disabled]} disabled={!puedePagar} onPress={onPagar}>
          <Text style={styles.primaryButtonText}>Pagar ahora</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.blanco },
  flex1: { flex: 1 },
  header: { backgroundColor: colors.noche, paddingTop: 56, paddingBottom: 16, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2 },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#5A5A5A' },
  tarjetaCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  tarjetaCardActiva: { borderWidth: 1.5, borderColor: colors.indigo, backgroundColor: colors.cielo },
  tarjetaLabel: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.noche },
  otraTarjetaForm: { gap: spacing.sm + 2, marginTop: spacing.xs },
  row: { flexDirection: 'row', gap: spacing.sm + 2 },
  totalCard: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xs },
  totalLabel: { fontSize: 13, color: '#5A5A5A' },
  totalValor: { fontFamily: 'PlusJakartaSans_700Bold', color: colors.noche, fontSize: 14 },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  disabled: { opacity: 0.4 },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
