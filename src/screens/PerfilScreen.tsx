import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { ApoderadoPerfil } from './perfil/ApoderadoPerfil';
import { ProfesorPerfil } from './perfil/ProfesorPerfil';
import { EstudiantePerfil } from './perfil/EstudiantePerfil';

type Props = NativeStackScreenProps<RootStackParamList, 'Perfil'>;

// Enruta al perfil real de cada rol — sin diseño explícito en el handoff
// (solo aparecía el ícono "Perfil" en la barra inferior), así que se armó
// reutilizando el lenguaje visual del resto de la app (DarkHeader + cards).
export function PerfilScreen({ route, navigation }: Props) {
  const { rol } = route.params;

  if (rol === 'profesor') return <ProfesorPerfil navigation={navigation} />;
  if (rol === 'estudiante') return <EstudiantePerfil navigation={navigation} />;
  return <ApoderadoPerfil navigation={navigation} />;
}
