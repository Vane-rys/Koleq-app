import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useFonts as usePlusJakarta,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { useFonts as useDMSans, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View } from 'react-native';
import type { RootStackParamList } from './src/navigation/types';
import { BienvenidaScreen } from './src/screens/BienvenidaScreen';
import { EligeRolScreen } from './src/screens/EligeRolScreen';
import { AccesoApoderadoScreen } from './src/screens/AccesoApoderadoScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegistroScreen } from './src/screens/RegistroScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { PerfilScreen } from './src/screens/PerfilScreen';
import { NotasScreen } from './src/screens/NotasScreen';
import { HojaDeVidaScreen } from './src/screens/HojaDeVidaScreen';
import { MensajesScreen } from './src/screens/MensajesScreen';
import { NuevoMensajeScreen } from './src/screens/NuevoMensajeScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { PagosScreen } from './src/screens/PagosScreen';
import { ConfirmarPagoScreen } from './src/screens/ConfirmarPagoScreen';
import { PagoTarjetaScreen } from './src/screens/PagoTarjetaScreen';
import { DatosTransferenciaScreen } from './src/screens/DatosTransferenciaScreen';
import { LicenciaMedicaScreen } from './src/screens/LicenciaMedicaScreen';
import { CursosScreen } from './src/screens/CursosScreen';
import { CursoDetalleScreen } from './src/screens/CursoDetalleScreen';
import { PasarListaScreen } from './src/screens/PasarListaScreen';
import { FichaAlumnoScreen } from './src/screens/FichaAlumnoScreen';
import { NuevaAnotacionScreen } from './src/screens/NuevaAnotacionScreen';
import { MensajesProfesorScreen } from './src/screens/MensajesProfesorScreen';
import { NuevoComunicadoScreen } from './src/screens/NuevoComunicadoScreen';
import { NuevaTareaScreen } from './src/screens/NuevaTareaScreen';
import { AsignarIntegrantesScreen } from './src/screens/AsignarIntegrantesScreen';
import { SeguimientoEntregasScreen } from './src/screens/SeguimientoEntregasScreen';
import { EntregaDetalleScreen } from './src/screens/EntregaDetalleScreen';
import { MensajesEstudianteScreen } from './src/screens/MensajesEstudianteScreen';
import { NotasEstudianteScreen } from './src/screens/NotasEstudianteScreen';
import { AgendaScreen } from './src/screens/AgendaScreen';
import { TrabajosScreen } from './src/screens/TrabajosScreen';
import { TrabajoDetalleScreen } from './src/screens/TrabajoDetalleScreen';

// Evita que la splash screen se oculte antes de que las fuentes carguen
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // Cargamos las 2 familias tipográficas de la marca (ver DESIGN.md)
  const [jakartaLoaded] = usePlusJakarta({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });
  const [dmSansLoaded] = useDMSans({ DMSans_400Regular });
  const fontsLoaded = jakartaLoaded && dmSansLoaded;

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Mientras cargan las fuentes no mostramos nada (la splash screen sigue visible)
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Bienvenida"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
          <Stack.Screen name="EligeRol" component={EligeRolScreen} />
          <Stack.Screen name="AccesoApoderado" component={AccesoApoderadoScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={RegistroScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="Notas" component={NotasScreen} />
          <Stack.Screen name="HojaDeVida" component={HojaDeVidaScreen} />
          <Stack.Screen name="Mensajes" component={MensajesScreen} />
          <Stack.Screen name="NuevoMensaje" component={NuevoMensajeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Pagos" component={PagosScreen} />
          <Stack.Screen name="ConfirmarPago" component={ConfirmarPagoScreen} />
          <Stack.Screen name="PagoTarjeta" component={PagoTarjetaScreen} />
          <Stack.Screen name="DatosTransferencia" component={DatosTransferenciaScreen} />
          <Stack.Screen name="LicenciaMedica" component={LicenciaMedicaScreen} />
          <Stack.Screen name="Cursos" component={CursosScreen} />
          <Stack.Screen name="CursoDetalle" component={CursoDetalleScreen} />
          <Stack.Screen name="PasarLista" component={PasarListaScreen} />
          <Stack.Screen name="FichaAlumno" component={FichaAlumnoScreen} />
          <Stack.Screen name="NuevaAnotacion" component={NuevaAnotacionScreen} />
          <Stack.Screen name="MensajesProfesor" component={MensajesProfesorScreen} />
          <Stack.Screen name="NuevoComunicado" component={NuevoComunicadoScreen} />
          <Stack.Screen name="NuevaTarea" component={NuevaTareaScreen} />
          <Stack.Screen name="AsignarIntegrantes" component={AsignarIntegrantesScreen} />
          <Stack.Screen name="SeguimientoEntregas" component={SeguimientoEntregasScreen} />
          <Stack.Screen name="EntregaDetalle" component={EntregaDetalleScreen} />
          <Stack.Screen name="MensajesEstudiante" component={MensajesEstudianteScreen} />
          <Stack.Screen name="NotasEstudiante" component={NotasEstudianteScreen} />
          <Stack.Screen name="Agenda" component={AgendaScreen} />
          <Stack.Screen name="Trabajos" component={TrabajosScreen} />
          <Stack.Screen name="TrabajoDetalle" component={TrabajoDetalleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </View>
  );
}
