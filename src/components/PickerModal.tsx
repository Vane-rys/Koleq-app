import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Check, Search, X } from 'lucide-react-native';
import { colors, spacing, radii, typeScale } from '../theme';
import { Avatar } from './Avatar';

export type PickerItem = {
  id: string;
  nombre: string;
  sublabel?: string;
  iniciales: string;
  destacado?: boolean;
  // si viene, el ítem se muestra atenuado y no se puede tocar (ej: alumno
  // que ya está en otro grupo) — el texto explica por qué.
  disabledLabel?: string;
};

type Props = {
  visible: boolean;
  title: string;
  items: PickerItem[];
  multiple?: boolean;
  selectedIds: string[];
  onClose: () => void;
  onConfirm: (ids: string[]) => void;
  confirmLabel?: string;
  searchPlaceholder?: string;
};

// Selector con buscador dentro de un modal de pantalla completa — pensado
// para listas que pueden crecer (contactos del colegio, alumnos de un
// curso) donde una lista siempre desplegada en pantalla no escala bien.
export function PickerModal({
  visible,
  title,
  items,
  multiple = false,
  selectedIds,
  onClose,
  onConfirm,
  confirmLabel = 'Listo',
  searchPlaceholder = 'Buscar…',
}: Props) {
  const [query, setQuery] = useState('');
  const [seleccion, setSeleccion] = useState<string[]>(selectedIds);

  useEffect(() => {
    if (visible) {
      setSeleccion(selectedIds);
      setQuery('');
    }
    // Solo re-sincronizar cuando el modal se abre, no en cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const q = query.trim().toLowerCase();
  const filtrados = q
    ? items.filter(
        (it) => it.nombre.toLowerCase().includes(q) || (it.sublabel ?? '').toLowerCase().includes(q)
      )
    : items;

  const onTocar = (item: PickerItem) => {
    if (item.disabledLabel) return;
    if (multiple) {
      setSeleccion((prev) => (prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]));
    } else {
      onConfirm([item.id]);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>{title}</Text>
          <Pressable onPress={onClose} hitSlop={8} style={styles.closeButton}>
            <X size={18} color={colors.noche} strokeWidth={2} />
          </Pressable>
        </View>

        <View style={styles.searchBox}>
          <Search size={16} color={colors.gris400} strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.gris400}
            autoCorrect={false}
          />
        </View>

        <FlatList
          data={filtrados}
          keyExtractor={(it) => it.id}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<Text style={styles.vacio}>Sin resultados.</Text>}
          renderItem={({ item }) => {
            const activo = multiple ? seleccion.includes(item.id) : selectedIds.includes(item.id);
            const deshabilitado = Boolean(item.disabledLabel);
            return (
              <Pressable
                disabled={deshabilitado}
                onPress={() => onTocar(item)}
                style={[styles.row, deshabilitado && styles.rowDeshabilitada]}
              >
                <Avatar
                  iniciales={item.iniciales}
                  bg={item.destacado ? colors.violeta : colors.cielo}
                  color={item.destacado ? colors.blanco : colors.indigo}
                  size={36}
                />
                <View style={styles.flex}>
                  <Text style={styles.nombre}>{item.nombre}</Text>
                  {(item.sublabel || item.disabledLabel) && (
                    <Text style={styles.sublabel}>{item.disabledLabel ?? item.sublabel}</Text>
                  )}
                </View>
                {activo && !deshabilitado && <Check size={18} color={colors.indigo} strokeWidth={2.5} />}
              </Pressable>
            );
          }}
        />

        {multiple && (
          <View style={styles.footer}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => {
                onConfirm(seleccion);
                onClose();
              }}
            >
              <Text style={styles.primaryButtonText}>
                {confirmLabel}
                {seleccion.length > 0 ? ` (${seleccion.length})` : ''}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.md + 2,
    paddingBottom: spacing.sm,
  },
  titulo: { ...typeScale.h3, fontSize: 18, color: colors.noche },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.niebla,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    marginHorizontal: spacing.md + 2,
    marginBottom: spacing.sm,
    backgroundColor: colors.niebla,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm + 4,
  },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 13, color: colors.noche },
  list: { paddingHorizontal: spacing.md + 2, paddingBottom: spacing.xl, gap: 2 },
  vacio: { fontSize: 13, color: colors.gris400, textAlign: 'center', marginTop: spacing.xl },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
    paddingVertical: 10,
  },
  rowDeshabilitada: { opacity: 0.4 },
  nombre: { fontSize: 14, fontWeight: '600', color: colors.noche },
  sublabel: { fontSize: 12, color: colors.gris400, marginTop: 1 },
  footer: {
    padding: spacing.md + 2,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.gris200,
  },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
