import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { colors, spacing, radii, typeScale } from '../theme';
import { HomeCard } from './HomeCard';

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const DIAS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function formatFechaCorta(date: Date) {
  return `${date.getDate()} ${MESES_CORTOS[date.getMonth()]}`;
}

function inicioDelDia(d: Date) {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
}

type Props = {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
};

// Selector de fecha propio (sin librería nativa) — funciona igual en Expo
// Go sin necesitar un build custom. Bloquea fechas pasadas: para una
// fecha de entrega no tiene sentido elegir un día que ya pasó.
export function DatePickerField({ label, value, onChange, placeholder = 'Elige una fecha' }: Props) {
  const [visible, setVisible] = useState(false);
  const [mesVisible, setMesVisible] = useState(value ?? new Date());

  const hoy = inicioDelDia(new Date());

  const abrir = () => {
    setMesVisible(value ?? new Date());
    setVisible(true);
  };

  const year = mesVisible.getFullYear();
  const month = mesVisible.getMonth();
  const primerDiaSemana = (new Date(year, month, 1).getDay() + 6) % 7; // lunes = 0
  const diasEnMes = new Date(year, month + 1, 0).getDate();
  const celdas: (number | null)[] = [
    ...Array(primerDiaSemana).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
  ];

  const onElegirDia = (dia: number) => {
    onChange(new Date(year, month, dia));
    setVisible(false);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={abrir}>
        <HomeCard style={styles.field}>
          <Calendar size={16} color={colors.indigo} strokeWidth={2} />
          <Text style={[styles.valor, !value && styles.placeholder]}>
            {value ? formatFechaCorta(value) : placeholder}
          </Text>
        </HomeCard>
      </Pressable>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.calHeader}>
              <Pressable hitSlop={8} onPress={() => setMesVisible(new Date(year, month - 1, 1))}>
                <ChevronLeft size={18} color={colors.noche} strokeWidth={2} />
              </Pressable>
              <Text style={styles.calTitulo}>{MESES[month]} {year}</Text>
              <Pressable hitSlop={8} onPress={() => setMesVisible(new Date(year, month + 1, 1))}>
                <ChevronRight size={18} color={colors.noche} strokeWidth={2} />
              </Pressable>
            </View>

            <View style={styles.diasRow}>
              {DIAS.map((d, i) => (
                <Text key={`${d}-${i}`} style={styles.diaLabel}>{d}</Text>
              ))}
            </View>

            <View style={styles.grid}>
              {celdas.map((dia, i) => {
                if (dia === null) return <View key={`vacio-${i}`} style={styles.celda} />;
                const fechaCelda = inicioDelDia(new Date(year, month, dia));
                const pasado = fechaCelda.getTime() < hoy.getTime();
                const seleccionado = Boolean(value) && inicioDelDia(value as Date).getTime() === fechaCelda.getTime();
                return (
                  <Pressable
                    key={dia}
                    disabled={pasado}
                    onPress={() => onElegirDia(dia)}
                    style={styles.celda}
                  >
                    <View style={[styles.celdaCirculo, seleccionado && styles.celdaCirculoActivo]}>
                      <Text style={[styles.celdaTexto, pasado && styles.celdaTextoPasado, seleccionado && styles.celdaTextoActivo]}>
                        {dia}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { ...typeScale.caption, color: '#5A5A5A', marginBottom: 6 },
  field: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  valor: { fontSize: 13, fontWeight: '600', color: colors.noche },
  placeholder: { color: colors.gris400, fontWeight: '400' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15,27,61,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: { backgroundColor: colors.blanco, borderRadius: radii.lg, padding: spacing.md + 2, width: '100%', maxWidth: 340 },
  calHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm + 2 },
  calTitulo: { fontSize: 14, fontWeight: '700', color: colors.noche, textTransform: 'capitalize' },
  diasRow: { flexDirection: 'row' },
  diaLabel: { width: `${100 / 7}%`, textAlign: 'center', fontSize: 11, color: colors.gris400, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  celda: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  celdaCirculo: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  celdaCirculoActivo: { backgroundColor: colors.indigo },
  celdaTexto: { fontSize: 13, color: colors.noche },
  celdaTextoPasado: { color: colors.gris200 },
  celdaTextoActivo: { color: colors.blanco, fontWeight: '700' },
});
