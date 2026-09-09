import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { ApoderadoHome } from './home/ApoderadoHome';
import { ProfesorHome } from './home/ProfesorHome';
import { EstudianteHome } from './home/EstudianteHome';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Enruta al Home real de cada rol (ver DESIGN.md / handoff, grupos 3, 7 y 8).
// Los 3 roles navegan de verdad por su flujo completo.
export function HomeScreen({ route, navigation }: Props) {
  const { rol } = route.params;

  const onAbrirPerfil = () => navigation.navigate('Perfil', { rol });

  if (rol === 'profesor') return <ProfesorHome navigation={navigation} onAbrirPerfil={onAbrirPerfil} />;
  if (rol === 'estudiante') return <EstudianteHome navigation={navigation} onAbrirPerfil={onAbrirPerfil} />;
  return <ApoderadoHome navigation={navigation} onAbrirPerfil={onAbrirPerfil} />;
}
